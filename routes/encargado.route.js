const encargadoCtrl = require('./../controllers/encargado.controller');
const autCtrl = require('./../controllers/auth.controller');

const express = require('express');
const router = express.Router();

router.get('/', encargadoCtrl.getEncargado);
router.post('/', autCtrl.verifyTokenAdmins, encargadoCtrl.createEncargado);
router.get('/detalle/:id', encargadoCtrl.getEncargadoId)
router.put('/:id', encargadoCtrl.editEncargado);
router.delete('/:id', autCtrl.verifyTokenAdmins, encargadoCtrl.deleteEncargado);

module.exports = router;
