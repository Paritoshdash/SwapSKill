// Basic In-Memory Rate Limiter for Next.js API Routes (Serverless environments)
// Note: In a true multi-instance serverless setup like Vercel, memory is not shared across instances.
// For enterprise SaaS, use Redis (e.g., Upstash) for distributed rate limiting.

export interface RateLimitStatus {
    success: boolean;
    limit: number;
    remaining: number;
    reset: number;
}

const LRU_CACHE = new Map<string, { count: number; expiresAt: number }>();

export function checkRateLimit(
    identifier: string,
    limit: number = 10, // Max requests
    windowMs: number = 60000 // Time window in ms (1 minute)
): RateLimitStatus {
    const now = Date.now();
    let record = LRU_CACHE.get(identifier);

    // Clean up expired records occasionally
    if (LRU_CACHE.size > 1000) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        for (const [key, value] of LRU_CACHE.entries()) {
            if (value.expiresAt < now) LRU_CACHE.delete(key);
        }
    }

    if (!record || record.expiresAt < now) {
        // New record or expired
        record = { count: 1, expiresAt: now + windowMs };
        LRU_CACHE.set(identifier, record);
        return { success: true, limit, remaining: limit - 1, reset: record.expiresAt };
    }

    // Existing record
    if (record.count >= limit) {
        return { success: false, limit, remaining: 0, reset: record.expiresAt };
    }

    record.count += 1;
    LRU_CACHE.set(identifier, record);

    return { success: true, limit, remaining: limit - record.count, reset: record.expiresAt };
}
