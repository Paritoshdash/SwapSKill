import { type NextRequest, NextResponse } from 'next/server'
import { updateSession } from '@/utils/supabase/middleware'
import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

// Initialize Redis only if env vars exist
const redis =
    process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
        ? new Redis({
            url: process.env.UPSTASH_REDIS_REST_URL,
            token: process.env.UPSTASH_REDIS_REST_TOKEN,
        })
        : null

// Create a new ratelimiter, that allows 100 requests per 1 minute
const ratelimit = redis
    ? new Ratelimit({
        redis: redis,
        limiter: Ratelimit.slidingWindow(100, '1 m'),
        analytics: true,
        prefix: '@upstash/ratelimit',
    })
    : null

export async function middleware(request: NextRequest) {
    // 1. Rate Limiting
    if (ratelimit) {
        const ip = request.headers.get('x-forwarded-for') ?? '127.0.0.1'
        const { success, limit, reset, remaining } = await ratelimit.limit(ip)

        if (!success) {
            return new NextResponse('Too Many Requests', {
                status: 429,
                headers: {
                    'X-RateLimit-Limit': limit.toString(),
                    'X-RateLimit-Remaining': remaining.toString(),
                    'X-RateLimit-Reset': reset.toString(),
                    'Retry-After': Math.ceil((reset - Date.now()) / 1000).toString(),
                },
            })
        }
    }

    // 2. Supabase Auth Middleware
    return await updateSession(request)
}
export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * Feel free to modify this pattern to include more paths.
         */
        '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
}
