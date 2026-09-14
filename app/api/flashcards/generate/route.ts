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

    const { summaryId, count = 10 } = await request.json()

    if (!summaryId) {
      return NextResponse.json({ error: 'summaryId required' }, { status: 400 })
    }

    if (!GEMINI_API_KEY) {
      return NextResponse.json({ error: 'API key not configured' }, { status: 500 })
    }

    // Fetch summary
    const { data: summary, error: summaryError } = await supabase
      .from('summaries')
      .select('*, sources(*)')
      .eq('id', summaryId)
      .eq('user_id', session.user.id)
      .single()

    if (summaryError || !summary) {
      return NextResponse.json({ error: 'Summary not found' }, { status: 404 })
    }

    // Generate flashcards with Gemini
    const prompt = `
На основі наступного конспекту створи ${count} флеш-карток у форматі JSON.
Кожна карточка повинна мати поле "question" та "answer".
Отримані карточки повинні охоплювати ключові концепції та визначення.

Конспект:
${summary.content}

Відповідь (JSON array):
[
  { "question": "?", "answer": "?" }
]

Тільки JSON, без додаткового тексту:`;

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
          maxOutputTokens: 4096,
        },
      }),
    })

    if (!geminiResponse.ok) {
      throw new Error('Gemini API error')
    }

    const geminiData = await geminiResponse.json()
    const responseText = geminiData.candidates?.[0]?.content?.parts?.[0]?.text

    if (!responseText) {
      throw new Error('No content generated')
    }

    // Parse JSON response
    let flashcards
    try {
      flashcards = JSON.parse(responseText.replace(/```json\n|```/g, '').trim())
    } catch (e) {
      console.error('Failed to parse Gemini response:', responseText)
      return NextResponse.json({ error: 'Failed to parse generated flashcards' }, { status: 500 })
    }

    // Save flashcards to database
    const flashcardsToInsert = flashcards.map((card: any, index: number) => ({
      summary_id: summaryId,
      question: card.question,
      answer: card.answer,
      order_index: index,
    }))

    const { data: savedFlashcards, error: insertError } = await supabase
      .from('flashcards')
      .insert(flashcardsToInsert)
      .select()

    if (insertError) {
      console.error('Database error:', insertError)
      return NextResponse.json({ error: 'Failed to save flashcards' }, { status: 500 })
    }

    return NextResponse.json({ flashcards: savedFlashcards }, { status: 200 })
  } catch (error) {
    console.error('API route error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
