const express = require('express');
const { login, register } = require('../controller/user-controller');
const router = express.Router();
const { z } = require('zod');

router.get('/login', async (req, res) => {
    login(req, res);
})

const registerationInput = z.object({
    username: z.string().min(2, "Username must be at least 2 characters long").max(10, "Username must not exceed 50 characters"),
    password: z.string().min(6, "Password must be at least 6 characters long").max(20, "Password must not exceed 20 characters"),
    email: z.string().email("Invalid email format") 
});

const validateRegistration = (req, res, next) => {
    const result = registerationInput.safeParse(req.body);
    if (!result.success) {
        console.error("Validation errors:", result.error.message);
        return res.status(400).json({ errors: result.error.message });
    }
    next();
}

router.post('/register', validateRegistration, async (req, res) => {
    register(req, res);
})

module.exports = router;