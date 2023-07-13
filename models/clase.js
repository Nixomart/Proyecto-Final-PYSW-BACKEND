const mongoose = require('mongoose');
const { Schema } = mongoose;
const Alumno = require('./alumno');
const Entrenador = require('./entrenador');

const ClaseSchema = new Schema({
    tipoClase: { type: String, required: true },
    cuposDisponibles: { type: String, required: true },
    alumno: {
        type: Schema.Types.ObjectId,
        ref: Alumno,
        required: true
    },
    entrenador: {
        type: Schema.Types.ObjectId,
        ref: Entrenador,
        required: true
    }
})

module.exports = mongoose.models.Clase || mongoose.model('Clase', ClaseSchema);