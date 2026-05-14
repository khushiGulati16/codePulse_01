const helmet = require('helmet');

/**
 * Basic Security Middleware
 * Covers Lecture 45-49 syllabus requirements:
 * - Prevents Clickjacking
 * - Prevents XSS Attacks
 * - Hides 'X-Powered-By' header (Prevents tech stack identification)
 */
const securityMiddleware = (app) => {
    // Helmet sets various HTTP headers to help protect your app
    app.use(helmet());

    // Custom security headers
    app.use((req, res, next) => {
        res.setHeader('X-Content-Type-Options', 'nosniff');
        res.setHeader('X-Frame-Options', 'DENY');
        next();
    });
};

module.exports = securityMiddleware;
