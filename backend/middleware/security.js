const helmet = require('helmet');
const securityMiddleware = (app) => {
    // Helmet sets various HTTP headers to help protect your app
    app.use(helmet());

    app.use((req, res, next) => {
        res.setHeader('X-Content-Type-Options', 'nosniff');
        res.setHeader('X-Frame-Options', 'DENY');
        next();
    });
};
module.exports = securityMiddleware;