const Clase = require('../models/clase');
const claseCtrl = {};

claseCtrl.getClase = async (req, res) => {
    var clases = await Clase.find();
    res.json(clases);
};

claseCtrl.getClaseId = async (req, res) => {
    try {
        const clase = await Clase.findById(req.params.id);
        if (!clase) {
            return res.status(404).json({
                status: '0',
                msg: 'Clase no encontrado'
            });
        }
        res.json(clase);
    } catch (error) {
        res.status(400).json({
            status: '0',
            msg: 'Error procesando la operación.'
        });
    }
};


claseCtrl.createClase = async (req, res) => {
    console.log(req.body);
    var clase = new Clase(req.body);
    try {
        await clase.save();
        res.json({
            'status': '1',
            'msg': 'Clase guardado'
        });
    } catch (error) {
        res.status(400).json({
            'status': '0',
            'msg': 'Error procesando operación.'
        });
    }
};

claseCtrl.deleteClase = async (req, res) => {
    try {
        await Clase.deleteOne({ _id: req.params.id });
        res.json({
            status: '1',
            msg: 'Clase eliminado'
        });
    } catch (error) {
        res.status(400).json({
            'status': '0',
            'msg': 'Error procesando la operación.'
        });
    }
};

claseCtrl.editClase = async (req, res) => {
    try {
        const clase = await Clase.findByIdAndUpdate(req.params.id, req.body);
        if (!clase) {
            return res.status(404).json({
                status: '0',
                msg: 'Clase no encontrado'
            });
        }
        res.json({
            status: '1',
            msg: 'Clase actualizado'
        });
    } catch (error) {
        res.status(400).json({
            status: '0',
            msg: 'Error procesando la operación.'
        });
    }
};

module.exports = claseCtrl;
