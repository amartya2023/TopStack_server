const express = require('express');
const ContactForm = require('../models/ContactForm');
const verifyAdmin = require('../middlewares/verifyAdmin');
const router = express.Router();

router.get('/', async (req, res) => {

    try {

        const data = await ContactForm.find().sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            data
        })
        
    } catch (error) {

        console.error(error);
        res.status(500).json({
            message: 'Server Error'
        });
        
    }

})

router.post('/create', verifyAdmin, async (req, res) => {

    try {

        const { name, email, query, contactNo, status } = req.body;

        if(!name || !email || !query || !contactNo || !status) {
            return res.status(400).json({
                error: 'Please fill all fields'
            });
        }

        await ContactForm.create({
            name,
            email,
            query,
            contactNo,
            status
        });

        res.status(201).json({
            success: true,
            message: "contact added"
        });
        
    } catch (error) {

        console.error(error);
        res.status(500).json({
            message: 'Server Error'
        });
        
    }

})

router.put('/update/:id', verifyAdmin, async (res, req) => {

    try {

        const { name, email, query, contactNo, status } = req.body;

        let data = {};

        const validateContact = await ContactForm.findById(req.params.id);

        if(!validateContact) {
            return res.status(404).json({
                error: 'ContactForm not found'
            });
        }

        if(name) data.name = name;
        if(email) data.email = email;
        if(query) data.query = query;
        if(contactNo) data.contactNo = contactNo;
        if(status) data.status = status;

        const contact = await ContactForm.findByIdAndUpdate(req.params.id, data, { new: true });

        res.status(200).json({
            success: true,
            message: "ContactForm update successfully",
            data: contact
        });
        
    } catch (error) {

        console.error(error);
        res.status(500).json({
            message: 'Server Error'
        });
        
    }

})

router.delete('/delete/:id', verifyAdmin, async (req, res) => {

    try {

        const validateContact = await ContactForm.findById(req.params.id);

        if(!validateContact) {
            return res.status(404).json({
                error: 'ContactForm not found'
            });
        }

        await ContactForm.findByIdAndDelete(req.params.id);

        res.status(200).json({
            success: true,
            message: "ContactForm deleted successfully"
        });
        
    } catch (error) {

        console.error(error);
        res.status(500).json({
            message: 'Server Error'
        });
        
    }

})

module.exports = router;