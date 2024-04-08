const express = require('express');
const service = require('../models/service');
const verifyAdmin = require('../middlewares/verifyAdmin');
const router = express.Router();

router.get('/', verifyAdmin, async (req, res) => {

    try {

        const data = await service.find().sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            data
        })
        
    } catch (error) {

        console.error(error);
        res.status(500).json({
            message: 'server Error'
        })
        
    }
})

router.post('/create', verifyAdmin, async (req, res) => {
    try {

        const { title, description } = req.body;

        if(!title || !description) {
            return res.status(400).json({
                error: 'Please enter all fields'
            });
        }

        await service.create({
            title,
            description
        });

        res.status(201).json({
            success: true,
            message: "Service added"
        });
        
    } catch (error) {

        console.error(error);
        res.status(500).json({
            message: 'server Error'
        })
        
    }
})

router.put('/update/:id', verifyAdmin, async (req, res) => {

    try {

        const { title, description } = req.body;

        let data = {};

        const validateService = await service.findById(req.params.id);

        if(!validateService) {
            return res.status(404).json({
                error: 'Service not found'
            });
        }

        if(title) data.title = title;
        if (description) data.description = description;

        const Service = await service.findByIdAndUpdate(req.params.id, data, { new: true });

        res.status(200).json({
            success: true,
            message: "Service updated",
            data: Service
        })
        
    } catch (error) {
        
        console.error(error);
        res.status(500).json({
            message: 'Server Error'
        })
    }

})

router.delete('/delete/:id', verifyAdmin, async (req, res) => {

    try {

        const validateService = await service.findById(req.params.id);

        if(!validateService) {
            return res.status(404).json({
                error: 'Service not found'
            });
        }

        await service.findOneAndDelete(req.params.id);

        res.status(200).json({
            success: true,
            message: "Service deleted"
        });
        
    } catch (error) {

        console.error(error);
        res.status(500).json({
            message: 'Server Error'
        });
        
    }
})

module.exports = router;