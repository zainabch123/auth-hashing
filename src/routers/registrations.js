const express = require('express');
const router = express.Router();

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const prisma = require('../utils/prisma.js')

router.post('/', async (req, res) => {
    const { username, password } = req.body;

    const createdUser = await prisma.user.create({
        data: {
            username,
            password
        }
    });

    res.json({ data: createdUser });
});

module.exports = router;
