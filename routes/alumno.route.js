const alumnoCtrl = require('./../controllers/alumno.controller');
const autCtrl = require('./../controllers/auth.controller');
//manejador de rutas
const express = require('express');
const router = express.Router();
//definimos las rutas para la gestion de alumno
router.get('/',/*  autCtrl.verifyTokenAdmins, */ alumnoCtrl.getAlumnos);
router.post('/', autCtrl.verifyTokenAdmins, alumnoCtrl.createAlumno);
router.post('/plan/:id',  alumnoCtrl.generarPlan);
router.post('/asistencia/:id',  alumnoCtrl.setearAsistencia);
router.get('/detalle/:id', alumnoCtrl.getAlumnoId);

router.put('/:id', alumnoCtrl.editAlumno);
router.delete('/:id', autCtrl.verifyTokenAdmins, alumnoCtrl.deleteAlumno);
//exportamos el modulo de rutas
module.exports = router;