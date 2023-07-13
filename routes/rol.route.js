const rolCtrl = require('./../controllers/rol.controller');
//manejador de rutas
const express = require('express');
const router = express.Router();

//definimos las rutas para la gestion de rutina
router.get('/', rolCtrl.getRoles);
router.get('/detalle/:id', rolCtrl.getRolId)
router.post('/', rolCtrl.createRol);
router.delete('/:id', rolCtrl.deleteRol);

//exportamos el modulo de rutas
module.exports = router;