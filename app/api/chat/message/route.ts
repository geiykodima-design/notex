import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

const GEMINI_API_KEY = process.env.GEMINI_API_KEY
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent'

export async function POST(request: NextRequest) {
  try {
    const cookieStore = cookies()
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore })
    const { data: { session } } = await supabase.auth.getSession()

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { summaryId, message } = await request.json()

    if (!summaryId || !message) {
      return NextResponse.json({ error: 'summaryId and message required' }, { status: 400 })
    }

    if (!GEMINI_API_KEY) {
      return NextResponse.json({ error: 'API key not configured' }, { status: 500 })
    }

    // Get or create chat session
    let { data: chatSession, error: sessionError } = await supabase
      .from('chat_sessions')
      .select('*')
      .eq('summary_id', summaryId)
      .eq('user_id', session.user.id)
      .single()

    if (sessionError && sessionError.code !== 'PGRST116') {
      throw sessionError
    }

    if (!chatSession) {
      const { data: newSession, error: createError } = await supabase
        .from('chat_sessions')
        .insert([{ summary_id: summaryId, user_id: session.user.id }])
        .select()
        .single()

      if (createError) throw createError
      chatSession = newSession
    }

    // Get summary content
    const { data: summary, error: summaryError } = await supabase
      .from('summaries')
      .select('*')
      .eq('id', summaryId)
      .eq('user_id', session.user.id)
      .single()

    if (summaryError || !summary) {
      return NextResponse.json({ error: 'Summary not found' }, { status: 404 })
    }

    // Get chat history
    const { data: messages } = await supabase
      .from('chat_messages')
      .select('*')
      .eq('session_id', chatSession.id)
      .order('created_at', { ascending: true })
      .limit(20)

    // Build conversation context
    const conversationHistory = messages
      ?.map((m: any) => ({
        role: m.role === 'user' ? 'user' : 'model',
        parts: [{ text: m.content }],
      }))
      .concat([{ role: 'user', parts: [{ text: message }] }]) || [{ role: 'user', parts: [{ text: message }] }]

    const systemPrompt = `Ти - допоміжний репетитор, спеціаліст з цього матеріалу:

${summary.content}

Відповідай на українській мові, будь дружелюбним та допоміжним. Якщо питання стосується матеріалу, дай детальну відповідь. Якщо питання не стосується матеріалу, м'яко спрямуй до теми.
`

    // Call Gemini API
    const geminiResponse = await fetch(GEMINI_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        system: [
          {
            text: systemPrompt,
          },
        ],
        contents: conversationHistory,
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        },
      }),
    })

    if (!geminiResponse.ok) {
      throw new Error('Gemini API error')
    }

    const geminiData = await geminiResponse.json()
    const assistantMessage = geminiData.candidates?.[0]?.content?.parts?.[0]?.text

    if (!assistantMessage) {
      throw new Error('No content generated')
    }

    // Save messages to database
    await supabase.from('chat_messages').insert([
      {
        session_id: chatSession.id,
        role: 'user',
        content: message,
      },
      {
        session_id: chatSession.id,
        role: 'assistant',
        content: assistantMessage,
      },
    ])

    return NextResponse.json({ message: assistantMessage }, { status: 200 })
  } catch (error) {
    console.error('API route error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
