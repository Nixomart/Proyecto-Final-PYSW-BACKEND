const cuotaCtrl = require('./../controllers/cuota.controller');

const express = require('express');
const router = express.Router();

router.get('/', cuotaCtrl.getCuota);
router.post('/', cuotaCtrl.createCuota);
router.get('/detalle/:id', cuotaCtrl.getCuotaId)
router.put('/:id', cuotaCtrl.editCuota);
router.delete('/:id', cuotaCtrl.deleteCuota);

module.exports = router;