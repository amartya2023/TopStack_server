const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

router.post('/login', (req, res) => {

    try {

        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: 'Please fill all the fields' })
        }

        if (email !== process.env.ADMIN_EMAIL || password !== process.env.ADMIN_PASSWORD) {
            return res.status(401).json({ error: 'Invalid credentials' })
        }

        const payload = {
            email: process.env.ADMIN_EMAIL,
            accessCode: process.env.ACCESS_CODE
        }

        const token = jwt.sign(payload, process.env.JWT_SECRET)

        res.status(200).json({
            success: true,
            message: 'Login successful',
            token: token
        })

    } catch (error) {

        console.error(error);
        res.status(500).json({ error: 'Server error' })
    }

})

module.exports = router;