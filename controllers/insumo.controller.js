const Insumo = require('../models/insumo');
const insumoCtrl = {};

insumoCtrl.getInsumo = async (req, res) => {
    var insumos = await Insumo.find().populate('categoria');
    res.json(insumos);
};

insumoCtrl.getInsumoId = async (req, res) => {
    try {
        const insumo = await Insumo.findById(req.params.id);
        if (!insumo) {
            return res.status(404).json({
                status: '0',
                msg: 'Insumo no encontrado'
            });
        }
        res.json(insumo);
    } catch (error) {
        res.status(400).json({
            status: '0',
            msg: 'Error procesando la operación.'
        });
    }
};


insumoCtrl.createInsumo = async (req, res) => {
    console.log(req.body);
    var insumo = new Insumo(req.body);
    try {
        await insumo.save();
        res.json({
            'status': '1',
            'msg': 'Insumo guardado'
        });
    } catch (error) {
        res.status(400).json({
            'status': '0',
            'msg': 'Error procesando operación.'
        });
    }
};

insumoCtrl.deleteInsumo = async (req, res) => {
    try {
        await Insumo.deleteOne({ _id: req.params.id });
        res.json({
            status: '1',
            msg: 'Insumo eliminado'
        });
    } catch (error) {
        res.status(400).json({
            'status': '0',
            'msg': 'Error procesando la operación.'
        });
    }
};

insumoCtrl.editInsumo = async (req, res) => {
    try {
        const insumo = await Insumo.findByIdAndUpdate(req.params.id, req.body);
        if (!insumo) {
            return res.status(404).json({
                status: '0',
                msg: 'Insumo no encontrado'
            });
        }
        res.json({
            status: '1',
            msg: 'Insumo actualizado'
        });
    } catch (error) {
        res.status(400).json({
            status: '0',
            msg: 'Error procesando la operación.'
        });
    }
};

module.exports = insumoCtrl;
