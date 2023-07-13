const planCtrl = require('./../controllers/plan.controller');
//manejador de rutas
const express = require('express');
const router = express.Router();

//definimos las rutas para la gestion de rutina
router.get('/', planCtrl.getPlanes);
router.get('/detalle/:id', planCtrl.getPlanId);
router.post('/', planCtrl.createPlan);
router.put('/:id', planCtrl.editPlan);
router.delete('/:id', planCtrl.deletePlan);
//exportamos el modulo de rutas
module.exports = router;