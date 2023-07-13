const mongoose = require('mongoose');
const { Schema } = mongoose;

const PlanSchema = new Schema({
    nombrePlan: { type: String, requiered: true },
    cantDias: { type: Number, required: true }
})

module.exports = mongoose.models.Plan || mongoose.model('Plan', PlanSchema);