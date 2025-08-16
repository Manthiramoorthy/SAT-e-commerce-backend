const user = require('../model/user-model');

const login = async (req, res) => {
    try {
        const userData = await user.findOne({ username: req.body.username, password: req.body.password });
        if (!userData) {
            return res.status(401).json({ message: "Invalid username or password" });
        }
        res.status(200).json({ message: "Login successful", user: userData });
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
        const newUser = await user.insertOne({
            username: req.body.username,
            password: req.body.password,
            email: req.body.email
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