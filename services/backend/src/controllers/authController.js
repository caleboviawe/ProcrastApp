const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const register = async (req, res, next) => {
    try {
        // logic to check user, hashpass and create user
        const { username, email, password } = req.body;

        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await User.create({
            username,
            email,
            password: hashedPassword
        });

        res.status(201).json({ message: 'User created successfully', userId: newUser.id });
    } catch (error) {
        next(error);
    }
};

const login = async (req, res, next) => {
    try {
        // find, check and gen tok
        const { email, password } = req.body;

        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign(
            { id: user.id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        res.json({ token, user: { id: user.id, username: user.username, email: user.email, role: user.role } });
    } catch (error) {
        next(error);
    }
};

const getMe = async (req, res, next) => {
    try {
        const user = await User.findByPk(req.user.id, {
            attributes: { exclude: ['password'] }
        });
        res.json(user);
    } catch (error) {
        next(error);
    }
};

const updateUsername = async (req, res, next) => {
    try {
        const { username } = req.body;
        const user = await User.findByPk(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.username = username;
        await user.save();
        
        res.json({ message: 'Username updated successfully', username: user.username });
    }
    catch (error) {
        next(error);
    }
}

const googleLogin = async (req, res, next) => {
    try {
        const { googleId, email, name } = req.body;
        if (!googleId || !email) {
            return res.status(400).json({ message: 'Invalid request' });
        }

        let user = await User.findOne({ where: { googleId } });
        if (!user) {
            user = await User.findOne({ where: { email } });
            if (user) {
                user.googleId = googleId;
                await user.save();
            } else {
                let username = name ? name.replace(/\s+/g, '_').toLowerCase() : email.split('@')[0];
                const existing = await User.findOne({ where: { username } });
                if (existing) username = email.split('@')[0];
                
                user = await User.create({ username, email, googleId, role: 'student' });
            }
        }

        const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.json({ token, user: { id: user.id, username: user.username, email: user.email, role: user.role } });
    } catch (error) {
        next(error);
    }
};

module.exports = { register, login, getMe, updateUsername, googleLogin };
