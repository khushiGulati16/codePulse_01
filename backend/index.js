const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const http = require('http');
const { Server } = require('socket.io');
const { sequelize } = require('./models');

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
        methods: ['GET', 'POST']
    }
});

app.use(cors());
app.use(express.json());

const jwt = require('jsonwebtoken');

// Make io accessible to our router
app.use((req, res, next) => {
    req.io = io;
    next();
});

// Authentication middleware for Socket.io
io.use((socket, next) => {
    const token = socket.handshake.auth.token;
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (!err) socket.user = decoded;
            next();
        });
    } else {
        next(); // Continue as unauthenticated (guest)
    }
});

// Socket logic
io.on('connection', (socket) => {
    const updateCount = () => {
        // Only count unique authenticated user IDs
        const sockets = Array.from(io.sockets.sockets.values());
        const uniqueUserIds = new Set(
            sockets.filter(s => s.user).map(s => s.user.id)
        );
        const count = uniqueUserIds.size;
        console.log('Online unique users count:', count);
        io.emit('online_count', count);
    };

    updateCount();
    
    // If authenticated, join user-specific room
    if (socket.user) {
        socket.join(`user_${socket.user.id}`);
        console.log(`Socket ${socket.id} joined room user_${socket.user.id}`);
    }

    socket.on('disconnect', () => {
        updateCount();
    });
});

// Main Root
app.get('/', (req, res) => {
    res.send('CodePulse API is running with Sequelize and WebSockets...');
});

// Import Routes
const authRoutes = require('./routes/auth');
const problemRoutes = require('./routes/problems');
const submissionRoutes = require('./routes/submissions');
const adminRoutes = require('./routes/admin');

app.use('/api', authRoutes);
app.use('/api/problems', problemRoutes);
app.use('/api/submissions', submissionRoutes);
app.use('/api/admin', adminRoutes);

const PORT = process.env.PORT || 5000;

sequelize.sync({ alter: false }).then(() => {
    console.log('Database synced via Sequelize.');
    server.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}).catch(err => {
    console.error('Unable to connect to the database:', err);
});
