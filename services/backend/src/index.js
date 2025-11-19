const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();
const { connectDB, sequelize } = require('./config/db');
const authRoutes = require('./routes/authRoutes');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(helmet());
app.use(express.json());

app.use('/api/auth', authRoutes);

const errorHandler = require('./middleware/errorMiddleware');
app.use(errorHandler);

app.get('/', (req, res) => {
    res.json({ message: 'backend is up and running' });
});

const startServer = async () => {
    if (!process.env.JWT_SECRET) {
        console.error('ERROR: JWT_SECRET is not defined.');
        process.exit(1);
    }

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
