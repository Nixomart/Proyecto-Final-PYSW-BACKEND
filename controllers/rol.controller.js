const Rol = require('../models/rol')

const rolCtrl = {};

rolCtrl.getRoles = async (req, res) => {
    var rol = await Rol.find();
    res.json(rol);
}

rolCtrl.getRolId = async (req, res) => {
    try {
        const rol = await Rol.findById(req.params.id);
        if (!rol) {
            return res.status(404).json({
                status: '0',
                msg: 'Rol no encontrado'
            });
        }
        res.json(rol);
    } catch (error) {
        res.status(400).json({
            status: '0',
            msg: 'Error procesando la operación.'
        });
    }
};

rolCtrl.createRol = async (req, res) => {

    var rol = new Rol(req.body);
    try {
        await rol.save();
        res.status(200).json({
            'status': '1',
            'msg': 'Rol guardado.'
        })
    } catch (error) {
        res.status(400).json({
            'status': '0',
            'msg': 'Error procesando operacion.'
        })
    }
}

rolCtrl.deleteRol = async (req, res) => {
    try {
        await Rol.deleteOne({ _id: req.params.id });
        res.json({
            status: '1',
            msg: 'Rol removed'
        })
    } catch (error) {
        res.status(400).json({
            'status': '0',
            'msg': 'Error procesando la operacion'
        })
    }
}

module.exports = rolCtrl;