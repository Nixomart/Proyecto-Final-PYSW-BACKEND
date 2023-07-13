const mongoose = require('mongoose');
const Entrenador = require('./entrenador')
const Alumno = require('./alumno')
const Ejercicio = require('./ejercicio')
const { Schema } = mongoose;

const RutinaSchema = new Schema({
    entrenador: { 
        type: Schema.Types.ObjectId, 
        ref: Entrenador, 
        required: true
    },
    alumno: { 
        type: Schema.Types.ObjectId, 
        ref: Alumno, 
        required: true
    },
    ejercicios: [{ 
        type: Schema.Types.ObjectId, 
        ref: Ejercicio, 
        required: true}],
    series: { type: Number, required: true },
    repeticiones: { type: Number, required: true },
    descanso: { type: Number, required: true },
    fechaInicio: { type: Date, required: true }
})
module.exports = mongoose.models.Rutina || mongoose.model('Rutina', RutinaSchema)