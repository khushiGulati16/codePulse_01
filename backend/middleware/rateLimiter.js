const rateLimit = require('express-rate-limit');

/**
 * Auth Rate Limiter
 * Specifically for Login and Register to prevent Brute Force attacks.
 */
const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 20, // Limit each IP to 20 requests per windowMs
    message: {
        message: "Too many attempts from this IP, please try again after 15 minutes"
    },
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

/**
 * General API Limiter
 * Slightly more relaxed for general browsing.
 */
const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: {
        message: "Too many requests, slow down!"
    }
});

module.exports = { authLimiter, apiLimiter };
