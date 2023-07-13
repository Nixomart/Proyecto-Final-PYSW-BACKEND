const mongoose = require('mongoose');
const Alumno = require('./alumno')
const Clase = require('./clase')
const { Schema } = mongoose;

const AsistenciaSchema = new Schema({
    alumno: { type: Schema.Types.ObjectId, ref: Alumno },
    clase: { 
        type: Schema.Types.ObjectId, 
        ref: Clase, 
        required: true},
    fechaAsistencia: { type: Date, required: true },
    horarioAsistencia: { type: Date, required: true },
    asistio: { type: Boolean, required: true }
})
module.exports = mongoose.models.Asistencia || mongoose.model('Asistencia', AsistenciaSchema)