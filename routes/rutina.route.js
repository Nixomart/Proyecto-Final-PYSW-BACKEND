const rutinaCtrl = require('./../controllers/rutina.controller');
const autCtrl = require('./../controllers/auth.controller');

//manejador de rutas
const express = require('express');
const router = express.Router();
//definimos las rutas para la gestion de rutina
router.get('/', rutinaCtrl.getRutinas);
router.post('/', autCtrl.verifyTokenEntrenador, rutinaCtrl.createRutina);
router.get('/detalle/:id', rutinaCtrl.getRutinaId);
router.put('/:id', autCtrl.verifyTokenEntrenador, rutinaCtrl.editRutina);
router.delete('/:id', autCtrl.verifyTokenEntrenador, rutinaCtrl.deleteRutina);
//exportamos el modulo de rutas
module.exports = router;