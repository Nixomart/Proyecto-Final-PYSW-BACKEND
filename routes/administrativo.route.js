const administrativoCtrl = require('./../controllers/administrativo.controller');
const autCtrl = require('./../controllers/auth.controller');

const express = require('express');
const router = express.Router();

router.get('/', administrativoCtrl.getAdmin);
router.post('/', autCtrl.verifyTokenAdmins, administrativoCtrl.createAdmin);
router.get('/detalle/:id', administrativoCtrl.getAdminId);
router.put('/:id', administrativoCtrl.editAdmin);
router.delete('/:id', autCtrl.verifyTokenAdmins, administrativoCtrl.deleteAdmin);

module.exports = router;
