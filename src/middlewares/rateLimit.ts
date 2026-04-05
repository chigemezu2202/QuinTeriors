import rateLimit from 'express-rate-limit';

export const loginRateLimiter = rateLimit({
    windowMs: 60 * 1000,
    max: 5,
    standardHeaders: true,
    legacyHeaders: false,
    message: { success: false, error: 'Too many login attempts. Please try again later.' },
});

export const leadsRateLimiter = rateLimit({
    windowMs: 60 * 1000,
    max: 15,
    standardHeaders: true,
    legacyHeaders: false,
    message: { success: false, error: 'Too many lead requests. Please try again later.' },
});
