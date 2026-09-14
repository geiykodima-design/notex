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

    const { summaryId, questionCount = 5 } = await request.json()

    if (!summaryId) {
      return NextResponse.json({ error: 'summaryId required' }, { status: 400 })
    }

    if (!GEMINI_API_KEY) {
      return NextResponse.json({ error: 'API key not configured' }, { status: 500 })
    }

    // Fetch summary
    const { data: summary, error: summaryError } = await supabase
      .from('summaries')
      .select('*')
      .eq('id', summaryId)
      .eq('user_id', session.user.id)
      .single()

    if (summaryError || !summary) {
      return NextResponse.json({ error: 'Summary not found' }, { status: 404 })
    }

    // Generate quiz with Gemini
    const prompt = `
На основі наступного конспекту створи ${questionCount} тестових питань у форматі JSON.
Кожне питання повинно мати:
- question: текст питання
- correct_answer: правильна відповідь
- options: масив з 4 варіантами відповідей (правильна повинна бути першою)
- explanation: пояснення правильної відповіді

Конспект:
${summary.content}

Відповідь (JSON array, тільки JSON без додаткового тексту):
[
  {
    "question": "?",
    "correct_answer": "?",
    "options": ["?", "?", "?", "?"],
    "explanation": "?"
  }
]`;

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
    let questions
    try {
      questions = JSON.parse(responseText.replace(/```json\n|```/g, '').trim())
    } catch (e) {
      console.error('Failed to parse Gemini response:', responseText)
      return NextResponse.json({ error: 'Failed to parse generated questions' }, { status: 500 })
    }

    // Create quiz and save questions
    const { data: quiz, error: quizError } = await supabase
      .from('quizzes')
      .insert([{ summary_id: summaryId }])
      .select()
      .single()

    if (quizError) {
      throw new Error('Failed to create quiz')
    }

    const questionsToInsert = questions.map((q: any, index: number) => ({
      quiz_id: quiz.id,
      question: q.question,
      correct_answer: q.correct_answer,
      options: q.options,
      explanation: q.explanation,
      order_index: index,
    }))

    const { data: savedQuestions, error: questionsError } = await supabase
      .from('quiz_questions')
      .insert(questionsToInsert)
      .select()

    if (questionsError) {
      console.error('Database error:', questionsError)
      return NextResponse.json({ error: 'Failed to save quiz questions' }, { status: 500 })
    }

    return NextResponse.json({ quiz: { ...quiz, questions: savedQuestions } }, { status: 200 })
  } catch (error) {
    console.error('API route error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
