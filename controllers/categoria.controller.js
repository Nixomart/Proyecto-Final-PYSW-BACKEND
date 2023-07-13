const Categoria = require('../models/categoria');
const categoriaCtrl = {};

categoriaCtrl.getCategoria = async (req, res) => {
    var categorias = await Categoria.find();
    res.json(categorias);
};

categoriaCtrl.getCategoriaId = async (req, res) => {
    try {
        const categoria = await Categoria.findById(req.params.id);
        if (!categoria) {
            return res.status(404).json({
                status: '0',
                msg: 'Categoria no encontrado'
            });
        }
        res.json(categoria);
    } catch (error) {
        res.status(400).json({
            status: '0',
            msg: 'Error procesando la operación.'
        });
    }
};


categoriaCtrl.createCategoria = async (req, res) => {
    var categoria = new Categoria(req.body);
    try {
        await categoria.save();
        res.json({
            'status': '1',
            'msg': 'Categoria guardado'
        });
    } catch (error) {
        res.status(400).json({
            'status': '0',
            'msg': 'Error procesando operación.'
        });
    }
};

categoriaCtrl.deleteCategoria = async (req, res) => {
    
    console.log(req.body);
    try {
        await Categoria.deleteOne({ _id: req.params.id });
        res.json({
            status: '1',
            msg: 'Categoria eliminado'
        });
    } catch (error) {
        res.status(400).json({
            'status': '0',
            'msg': 'Error procesando la operación.'
        });
    }
};

categoriaCtrl.editCategoria = async (req, res) => {
    try {
        const categoria = await Categoria.findByIdAndUpdate(req.params.id, req.body);
        if (!categoria) {
            return res.status(404).json({
                status: '0',
                msg: 'Categoria no encontrado'
            });
        }
        res.json({
            status: '1',
            msg: 'Categoria actualizado'
        });
    } catch (error) {
        res.status(400).json({
            status: '0',
            msg: 'Error procesando la operación.'
        });
    }
};

module.exports = categoriaCtrl;
