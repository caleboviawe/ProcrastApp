const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();
const { connectDB, sequelize } = require('./config/db');
const authRoutes = require('./routes/authRoutes');

const app = express();
const port = process.env.PORT || 5000;

// middleware setup
app.use(cors());
app.use(helmet());
app.use(express.json());

// routes
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
    res.json({ message: 'backend is up and running' });
});

// start server and sync db
const startServer = async () => {
    await connectDB();
    try {
        await sequelize.sync({ alter: true });
        console.log('db synced');
    } catch (err) {
        console.error('failed to sync db:', err);
    }

    app.listen(port, () => {
        console.log(`server listening on port ${port}`);
    });
};

startServer();
