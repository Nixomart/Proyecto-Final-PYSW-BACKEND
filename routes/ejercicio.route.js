const ejercicioCtrl = require('./../controllers/ejercicio.controller');
const autCtrl = require('./../controllers/auth.controller');
//manejador de rutas
const express = require('express');
const router = express.Router();
//definimos las rutas para la gestion de ejercicio
router.get('/', autCtrl.verifyTokenEntrenador, ejercicioCtrl.getEjercicios);
router.post('/', autCtrl.verifyTokenEntrenador, ejercicioCtrl.createEjercicio);
router.get('/detalle/:id', ejercicioCtrl.getEjercicioId);
router.post('/asignarRutina/:id', ejercicioCtrl.asignarRutina);
router.put('/:id', autCtrl.verifyTokenEntrenador, ejercicioCtrl.editEjercicio);
router.delete('/:id', autCtrl.verifyTokenEntrenador, ejercicioCtrl.deleteEjercicio);
//exportamos el modulo de rutas
module.exports = router;