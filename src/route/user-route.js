const express = require('express');
const { login, register } = require('../controller/user-controller');
const router = express.Router();
const { z } = require('zod');

router.get('/login', async (req, res) => {
    login(req, res);
})

router.post('/register', async (req, res) => {
    register(req, res);
})

module.exports = router;