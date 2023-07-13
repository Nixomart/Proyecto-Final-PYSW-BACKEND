const Entrenador = require('../models/entrenador')

const entrenadorCtrl = {};

entrenadorCtrl.getEntrenadores = async (req, res) => {
    var entrenador = await Entrenador.find().populate('rol');
    res.json(entrenador);
}

entrenadorCtrl.getEntrenadorId = async (req, res) => {
    try {
        const entrenador = await Entrenador.findById(req.params.id);
        if (!entrenador) {
            return res.status(404).json({
                status: '0',
                msg: 'Entrenador no encontrado'
            });
        }
        res.json(entrenador);
    } catch (error) {
        res.status(400).json({
            status: '0',
            msg: 'Error procesando la operación.'
        });
    }
};

entrenadorCtrl.createEntrenador = async (req, res) => {

    var entrenador = new Entrenador(req.body);
    try {
        await entrenador.save();
        res.status(200).json({
            'status': '1',
            'msg': 'Entrenador guardado.'
        })
    } catch (error) {
        res.status(400).json({
            'status': '0',
            'msg': 'Error procesando operacion.'
        })
    }
}

entrenadorCtrl.editEntrenador = async (req, res) => {
    const ventrenador = new Entrenador(req.body);
    try {
        await Entrenador.updateOne({ _id: req.body._id }, ventrenador);
        res.json({
            'status': '1',
            'msg': 'Entrenador updated'
        })
    } catch (error) {
        res.status(400).json({
            'status': '0',
            'msg': 'Error procesando la operacion'
        })
    }
}

entrenadorCtrl.deleteEntrenador = async (req, res) => {
    try {
        await Entrenador.deleteOne({ _id: req.params.id });
        res.json({
            status: '1',
            msg: 'Entrenador removed'
        })
    } catch (error) {
        res.status(400).json({
            'status': '0',
            'msg': 'Error procesando la operacion'
        })
    }
}

module.exports = entrenadorCtrl;