const insumoCtrl = require('./../controllers/insumo.controller');
const autCtrl = require('./../controllers/auth.controller');

const express = require('express');
const router = express.Router();


router.get('/', /* autCtrl.verifyTokenAdmins, */ insumoCtrl.getInsumo);
router.post('/', /* autCtrl.verifyTokenAdmins, */ insumoCtrl.createInsumo);
router.get('/detalle/:id', autCtrl.verifyTokenAdmins, insumoCtrl.getInsumoId)
router.put('/:id', autCtrl.verifyTokenAdmins, insumoCtrl.editInsumo);
router.delete('/:id', autCtrl.verifyTokenAdmins, insumoCtrl.deleteInsumo);

module.exports = router;