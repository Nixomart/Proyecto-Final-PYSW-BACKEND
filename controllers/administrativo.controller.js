const Administrativo = require('../models/administrativo');
const administrativoCtrl = {};

administrativoCtrl.getAdmin = async (req, res) => {
    var administrativos = await Administrativo.find();
    res.json(administrativos);
};

administrativoCtrl.getAdminId = async (req, res) => {
    try {
        const administrativo = await Administrativo.findById(req.params.id);
        if (!administrativo) {
            return res.status(404).json({
                status: '0',
                msg: 'Admin no encontrado'
            });
        }
        res.json(administrativo);
    } catch (error) {
        res.status(400).json({
            status: '0',
            msg: 'Error procesando la operación.'
        });
    }
};


administrativoCtrl.createAdmin = async (req, res) => {
    console.log(req.body);
    var administrativo = new Administrativo(req.body);
    try {
        await administrativo.save();
        res.json({
            'status': '1',
            'msg': 'Admin guardado'
        });
    } catch (error) {
        res.status(400).json({
            'status': '0',
            'msg': 'Error procesando operación.'
        });
    }
};

administrativoCtrl.deleteAdmin = async (req, res) => {
    try {
        await Administrativo.deleteOne({ _id: req.params.id });
        res.json({
            status: '1',
            msg: 'Admin eliminado'
        });
    } catch (error) {
        res.status(400).json({
            'status': '0',
            'msg': 'Error procesando la operación.'
        });
    }
};

administrativoCtrl.editAdmin = async (req, res) => {
    try {
        const administrativo = await Administrativo.findByIdAndUpdate(req.params.id, req.body);
        if (!administrativo) {
            return res.status(404).json({
                status: '0',
                msg: 'Administrativo no encontrado'
            });
        }
        res.json({
            status: '1',
            msg: 'Administrativo actualizado'
        });
    } catch (error) {
        res.status(400).json({
            status: '0',
            msg: 'Error procesando la operación.'
        });
    }
};

module.exports = administrativoCtrl;
