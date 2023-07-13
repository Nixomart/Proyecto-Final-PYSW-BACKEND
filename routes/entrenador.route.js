const entrenadorCtrl = require('./../controllers/entrenador.controller');
const autCtrl = require('./../controllers/auth.controller');
//manejador de rutas
const express = require('express');
const router = express.Router();
//definimos las rutas para la gestion de entrenador
router.get('/', entrenadorCtrl.getEntrenadores);
router.post('/', autCtrl.verifyTokenAdmins, entrenadorCtrl.createEntrenador);
router.get('/', entrenadorCtrl.getEntrenadorId);
router.put('/:id', entrenadorCtrl.editEntrenador);
router.delete('/:id', autCtrl.verifyTokenAdmins, entrenadorCtrl.deleteEntrenador);
//exportamos el modulo de rutas
module.exports = router;