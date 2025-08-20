const user = require('../model/user-model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const login = async (req, res) => {
    try {
        const userData = await user.findOne({ username: req.body.username });
        if (!userData) {
            return res.status(401).json({ message: "Invalid username" });
        }
        const isPasswordValid = await bcrypt.compare(req.body.password, userData.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid password" });
        }

        const token = jwt.sign({ id: userData._id, role: userData.role}, process.env.JWT_SECRET, { expiresIn: '1m' });

        res.status(200).json({ message: "Login successful", token: token});
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ message: error.message });
    }
}

const register = async (req, res) => {
    if (!req.body.username || !req.body.password || !req.body.email) {
        return res.status(400).json({ message: "All fields are required" });
    }
    try {
        const existingUser = await user.findOne({ username: req.body.username });
        if (existingUser) {
            return res.status(400).json({ message: "Username already exists" });
        }

        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const newUser = await user.insertOne({
            username: req.body.username,
            password: hashedPassword,
            email: req.body.email,
            role: req.body.role || 'user'
        })
        if (!newUser) {
            return res.status(500).json({ message: "Error creating user" });
        } else {
            res.status(201).json({ message: "User registered successfully", user: newUser });
        }

    } catch (error) {
        console.error("Error during registration:", error);
        res.status(500).json({ message: error.message });
    }
}

module.exports = { login, register };