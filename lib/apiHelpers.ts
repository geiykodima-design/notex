import { NextRequest, NextResponse } from 'next/server'

export async function withErrorHandler(
  handler: (req: NextRequest) => Promise<NextResponse>,
  req: NextRequest,
) {
  try {
    return await handler(req)
  } catch (error) {
    console.error('API error:', error)

    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 },
      )
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    )
  }
}

export async function withRateLimit(
  handler: (req: NextRequest) => Promise<NextResponse>,
  req: NextRequest,
) {
  // Simple rate limiting - in production use Redis or similar
  const ip = req.headers.get('x-forwarded-for') || 'unknown'
  const key = `ratelimit:${ip}`
  
  // This is a placeholder - implement proper rate limiting in production
  return handler(req)
}
