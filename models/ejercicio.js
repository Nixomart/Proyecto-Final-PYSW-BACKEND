const mongoose = require('mongoose');
const { Schema } = mongoose;

const EjercicioSchema = new Schema({
    nombreEjercicio: { type: String, required: true },
    repeticiones: {type: Number},
    dia: {type: Date},
    variacion: {type: String},
    demostracion: {type: String}
})
module.exports = mongoose.models.Ejercicio || mongoose.model('Ejercicio', EjercicioSchema)