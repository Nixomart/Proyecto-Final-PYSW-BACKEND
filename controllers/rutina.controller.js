const Rutina = require('../models/rutina')

const rutinaCtrl = {};

rutinaCtrl.getRutinas = async (req, res) => {
    var rutina = await Rutina.find().populate('entrenador').populate('alumno').populate('ejercicios');
    res.json(rutina);
}

rutinaCtrl.getRutinaId = async (req, res) => {
    try {
        const rutina = await Rutina.findById(req.params.id);
        if (!rutina) {
            return res.status(404).json({
                status: '0',
                msg: 'Rutina no encontrada'
            });
        }
        res.json(rutina);
    } catch (error) {
        res.status(400).json({
            status: '0',
            msg: 'Error procesando la operación.'
        });
    }
};

rutinaCtrl.createRutina = async (req, res) => {

    var rutina = new Rutina(req.body);
    try {
        await rutina.save();
        res.status(200).json({
            'status': '1',
            'msg': 'Rutina guardado.'
        })
    } catch (error) {
        res.status(400).json({
            'status': '0',
            'msg': 'Error procesando operacion.'
        })
    }
}

rutinaCtrl.editRutina = async (req, res) => {
    const vrutina = new Rutina(req.body);
    try {
        await Rutina.updateOne({ _id: req.body._id }, vrutina);
        res.json({
            'status': '1',
            'msg': 'Rutina updated'
        })
    } catch (error) {
        res.status(400).json({
            'status': '0',
            'msg': 'Error procesando la operacion'
        })
    }
}

rutinaCtrl.deleteRutina = async (req, res) => {
    try {
        await Rutina.deleteOne({ _id: req.params.id });
        res.json({
            status: '1',
            msg: 'Rutina removed'
        })
    } catch (error) {
        res.status(400).json({
            'status': '0',
            'msg': 'Error procesando la operacion'
        })
    }
}

module.exports = rutinaCtrl;