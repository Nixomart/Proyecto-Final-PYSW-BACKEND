const claseCtrl = require('./../controllers/clase.controller');
const autCtrl = require('./../controllers/auth.controller');

const express = require('express');
const router = express.Router();

router.get('/', autCtrl.verifyTokenEntrenador, claseCtrl.getClase);
router.post('/', autCtrl.verifyTokenEntrenador, claseCtrl.createClase);
router.get('/detalle/:id', autCtrl.verifyTokenEntrenador, claseCtrl.getClaseId)
router.put('/:id', autCtrl.verifyTokenEntrenador, claseCtrl.editClase);
router.delete('/:id', autCtrl.verifyTokenEntrenador, claseCtrl.deleteClase);

module.exports = router;