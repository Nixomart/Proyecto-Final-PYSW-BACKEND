const asistenciaCtrl = require('./../controllers/asistencia.controller');
//manejador de rutas
const express = require('express');
const router = express.Router();
//definimos las rutas para la gestion de asistencia
router.get('/', asistenciaCtrl.getAsistencias);
router.get('/fecha/:fechaAsistencia', asistenciaCtrl.gerAsistenciaFecha);
router.post('/', asistenciaCtrl.createAsistencia);
router.put('/:id', asistenciaCtrl.editAsistencia);
router.delete('/:id', asistenciaCtrl.deleteAsistencia);
//exportamos el modulo de rutas
module.exports = router;