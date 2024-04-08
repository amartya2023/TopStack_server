const express = require('express');
const jwt = require('jsonwebtoken');

const verifyAdmin = async (req, res, next) => {

    try {

        const token = req.header('auth-token');

        if (!token) {
            return res.status(401).json({ error: 'Access denied' })
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (!decoded || decoded.email !== process.env.ADMIN_EMAIL || decoded.accessCode !== process.env.ACCESS_CODE) {
            return res.status(401).json({ error: 'Access denied' })
        }

        next();

    } catch (error) {

        console.error(error);
        res.status(500).json({ error: 'Server error' })

    }

}

module.exports = verifyAdmin;