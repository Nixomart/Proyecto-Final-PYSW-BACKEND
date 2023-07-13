const Plan = require('../models/plan')

const planCtrl = {};

planCtrl.getPlanes = async (req, res) => {
    var plan = await Plan.find();
    res.json(plan);
}

planCtrl.getPlanId = async (req, res) => {
    try {
        const plan = await Plan.findById(req.params.id);
        if (!plan) {
            return res.status(404).json({
                status: '0',
                msg: 'Plan no encontrada'
            });
        }
        res.json(plan);
    } catch (error) {
        res.status(400).json({
            status: '0',
            msg: 'Error procesando la operación.'
        });
    }
};

planCtrl.createPlan = async (req, res) => {

    var plan = new Plan(req.body);
    try {
        await plan.save();
        res.status(200).json({
            'status': '1',
            'msg': 'Plan guardado.'
        })
    } catch (error) {
        res.status(400).json({
            'status': '0',
            'msg': 'Error procesando operacion.'
        })
    }
}

planCtrl.editPlan = async (req, res) => {
    const vplan = new Plan(req.body);
    try {
        await Plan.updateOne({ _id: req.body._id }, vplan);
        res.json({
            'status': '1',
            'msg': 'Plan updated'
        })
    } catch (error) {
        res.status(400).json({
            'status': '0',
            'msg': 'Error procesando la operacion'
        })
    }
}

planCtrl.deletePlan = async (req, res) => {
    try {
        await Plan.deleteOne({ _id: req.params.id });
        res.json({
            status: '1',
            msg: 'Plan removed'
        })
    } catch (error) {
        res.status(400).json({
            'status': '0',
            'msg': 'Error procesando la operacion'
        })
    }
}

module.exports = planCtrl;