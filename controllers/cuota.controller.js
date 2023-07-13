const Cuota = require('../models/cuota');
const cuotaCtrl = {};

cuotaCtrl.getCuota = async (req, res) => {
    var cuotas = await Cuota.find().populate('alumno').populate('clase');
    res.json(cuotas);
};

cuotaCtrl.getCuotaId = async (req, res) => {
    try {
        const cuota = await Cuota.findById(req.params.id).populate('alumno').populate('clase');
        if (!cuota) {
            return res.status(404).json({
                status: '0',
                msg: 'Cuota no encontrada'
            });
        }
        res.json(cuota);
    } catch (error) {
        res.status(400).json({
            status: '0',
            msg: 'Error procesando la operación.'
        });
    }
};


cuotaCtrl.createCuota = async (req, res) => {
    console.log(req.body);
    var cuota = new Cuota(req.body);
    try {
        await cuota.save();
        res.json({
            'status': '1',
            'msg': 'Cuota guardado'
        });
    } catch (error) {
        res.status(400).json({
            'status': '0',
            'msg': 'Error procesando operación.'
        });
    }
};

cuotaCtrl.deleteCuota = async (req, res) => {
    try {
        await Cuota.deleteOne({ _id: req.params.id });
        res.json({
            status: '1',
            msg: 'Cuota eliminado'
        });
    } catch (error) {
        res.status(400).json({
            'status': '0',
            'msg': 'Error procesando la operación.'
        });
    }
};

cuotaCtrl.editCuota = async (req, res) => {
    try {
        const cuota = await Cuota.findByIdAndUpdate(req.params.id, req.body);
        if (!cuota) {
            return res.status(404).json({
                status: '0',
                msg: 'Cuota no encontrado'
            });
        }
        res.json({
            status: '1',
            msg: 'Cuota actualizado'
        });
    } catch (error) {
        res.status(400).json({
            status: '0',
            msg: 'Error procesando la operación.'
        });
    }
};

module.exports = cuotaCtrl;
