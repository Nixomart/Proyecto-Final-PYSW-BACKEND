const categoriaCtrl = require('./../controllers/categoria.controller');

const express = require('express');
const router = express.Router();

router.get('/', categoriaCtrl.getCategoria);
router.post('/', categoriaCtrl.createCategoria);
router.get('/detalle/:id', categoriaCtrl.getCategoriaId)
router.put('/:id', categoriaCtrl.editCategoria);
router.delete('/:id', categoriaCtrl.deleteCategoria);

module.exports = router;
