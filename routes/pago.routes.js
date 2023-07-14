//manejador de rutas
const express = require('express');
const router = express.Router();
const Pago = require('../models/pago')

//definimos las rutas para la gestion de rutina
router.get('/', async (req, res) =>{
    try {
        const pagos = await Pago.find()
        res.status(200).json(pagos)
    } catch (error) {
        console.log("*********erroro get pagoss************", error);
        res.status(500).json({message: 'no se pudo', status: '0'})
    }
} );
router.post('/', async (req, res) =>{
    try {
        const {precio, descripcion, categoria, fecha} =req.body
        await Pago.create({precio, descripcion, categoria, fecha})
        res.status(200).json({message: 'creado con plan exito'})
    } catch (error) {
        console.log("erroro get pagoss", error);
        res.status(500).json({message: '*****************no se pudo crear pago**************', status: '0'})
    }
} );
//exportamos el modulo de rutas
module.exports = router;