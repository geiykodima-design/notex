import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

const GEMINI_API_KEY = process.env.GEMINI_API_KEY
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent'

export async function POST(request: NextRequest) {
  try {
    // Auth check
    const cookieStore = cookies()
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore })
    const { data: { session } } = await supabase.auth.getSession()

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { sourceId } = await request.json()

    if (!sourceId) {
      return NextResponse.json({ error: 'sourceId required' }, { status: 400 })
    }

    if (!GEMINI_API_KEY) {
      return NextResponse.json({ error: 'API key not configured' }, { status: 500 })
    }

    // Fetch source
    const { data: source, error: sourceError } = await supabase
      .from('sources')
      .select('*')
      .eq('id', sourceId)
      .eq('user_id', session.user.id)
      .single()

    if (sourceError || !source) {
      return NextResponse.json({ error: 'Source not found' }, { status: 404 })
    }

    // Call Gemini API
    const prompt = `
Переведи наступний матеріал на українську мову та створи структурований конспект:

Матеріал:
${source.raw_text}

Вимоги:
1. Створи структурований конспект з основними секціями
2. Кожна секція повинна мати заголовок та 2-3 ключові пункти
3. Напиши українською мовою
4. Додай визначення ключових термінів
5. Формат: Markdown

Відповідь:`;  
    
    const geminiResponse = await fetch(GEMINI_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: prompt,
              },
            ],
          },
        ],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 2048,
        },
        safetySettings: [
          {
            category: 'HARM_CATEGORY_HARASSMENT',
            threshold: 'BLOCK_NONE',
          },
          {
            category: 'HARM_CATEGORY_HATE_SPEECH',
            threshold: 'BLOCK_NONE',
          },
          {
            category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
            threshold: 'BLOCK_NONE',
          },
          {
            category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
            threshold: 'BLOCK_NONE',
          },
        ],
      }),
    })

    if (!geminiResponse.ok) {
      const error = await geminiResponse.text()
      console.error('Gemini API error:', error)
      return NextResponse.json({ error: 'Failed to generate summary' }, { status: 500 })
    }

    const geminiData = await geminiResponse.json()
    const summaryContent = geminiData.candidates?.[0]?.content?.parts?.[0]?.text

    if (!summaryContent) {
      return NextResponse.json({ error: 'No content generated' }, { status: 500 })
    }

    // Save summary to database
    const { data: summary, error: summaryError } = await supabase
      .from('summaries')
      .insert([
        {
          user_id: session.user.id,
          source_id: sourceId,
          title: source.filename.replace(/\.[^/.]+$/, ''),
          content: summaryContent,
        },
      ])
      .select()
      .single()

    if (summaryError) {
      console.error('Database error:', summaryError)
      return NextResponse.json({ error: 'Failed to save summary' }, { status: 500 })
    }

    return NextResponse.json({ summary }, { status: 200 })
  } catch (error) {
    console.error('API route error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
