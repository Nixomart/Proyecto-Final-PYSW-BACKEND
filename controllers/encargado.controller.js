const Encargado = require('../models/encargado');
const encargadoCtrl = {};
//  faltaria consultarEstadisticas, consutarIncrementoCuotas y realizarBalanze
encargadoCtrl.getEncargado = async (req, res) => {
    var encargados = await Encargado.find();
    res.json(encargados);
};

encargadoCtrl.getEncargadoId = async (req, res) => {
    try {
        const encargado = await Encargado.findById(req.params.id);
        if (!encargado) {
            return res.status(404).json({
                status: '0',
                msg: 'Encargado no encontrado'
            });
        }
        res.json(encargado);
    } catch (error) {
        res.status(400).json({
            status: '0',
            msg: 'Error procesando la operación.'
        });
    }
};


encargadoCtrl.createEncargado = async (req, res) => {
    console.log(req.body);
    var encargado = new Encargado(req.body);
    try {
        await encargado.save();
        res.json({
            'status': '1',
            'msg': 'Encargado guardado'
        });
    } catch (error) {
        res.status(400).json({
            'status': '0',
            'msg': 'Error procesando operación.'
        });
    }
};

encargadoCtrl.deleteEncargado = async (req, res) => {
    try {
        await Encargado.deleteOne({ _id: req.params.id });
        res.json({
            status: '1',
            msg: 'Encargado eliminado'
        });
    } catch (error) {
        res.status(400).json({
            'status': '0',
            'msg': 'Error procesando la operación.'
        });
    }
};

encargadoCtrl.editEncargado = async (req, res) => {
    try {
        const encargado = await Encargado.findByIdAndUpdate(req.params.id, req.body);
        if (!encargado) {
            return res.status(404).json({
                status: '0',
                msg: 'Encargado no encontrado'
            });
        }
        res.json({
            status: '1',
            msg: 'Encargado actualizado'
        });
    } catch (error) {
        res.status(400).json({
            status: '0',
            msg: 'Error procesando la operación.'
        });
    }
};

module.exports = encargadoCtrl;
