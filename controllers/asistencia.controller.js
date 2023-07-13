const Asistencia = require('../models/asistencia')

const asistenciaCtrl = {};

asistenciaCtrl.getAsistencias = async (req, res) => {
    var asistencia = await asistencia.find().populate('alumno').populate('clase');
    res.json(asistencia);
}

asistenciaCtrl.gerAsistenciaFecha = async (req, res) => {
    try {
        const Asistencia = await Asistencia.find(req.params.fechaAsistencia).populate('alumno').populate('clase');
        if (!alumno) {
            return res.status(404).json({
                status: '0',
                msg: 'Alumno no encontrado'
            });
        }
        res.json(alumno);
    } catch (error) {
        res.status(400).json({
            status: '0',
            msg: 'Error procesando la operación.'
        });
    }
};

asistenciaCtrl.createAsistencia= async (req, res) => {

    var asistencia = new Asistencia(req.body);
    try {
        await asistencia.save();
        res.status(200).json({
            'status': '1',
            'msg': 'Asistencia guardada.'
        })
    } catch (error) {
        res.status(400).json({
            'status': '0',
            'msg': 'Error procesando operacion.'
        })
    }
}

asistenciaCtrl.editAsistencia= async (req, res) => {
    const vasistencia = new asistencia(req.body);
    try {
        await asistencia.updateOne({ _id: req.body._id }, vasistencia);
        res.json({
            'status': '1',
            'msg': 'Asistencia updated'
        })
    } catch (error) {
        res.status(400).json({
            'status': '0',
            'msg': 'Error procesando la operacion'
        })
    }
}

asistenciaCtrl.deleteAsistencia= async (req, res) => {
    try {
        await asistencia.deleteOne({ _id: req.params.id });
        res.json({
            status: '1',
            msg: 'Asistencia removed'
        })
    } catch (error) {
        res.status(400).json({
            'status': '0',
            'msg': 'Error procesando la operacion'
        })
    }
}

module.exports = asistenciaCtrl;