const mongoose = require('mongoose');
const { Schema } = mongoose;
const Decimal = require('decimal.js'); // Importar la biblioteca decimal.js
const Clase = require('./clase');
const Alumno = require('./alumno');

const CuotaSchema = new Schema({
    fechaDePago: { type: Date, required: true },
    fechaCaducidad: { type: Date, required: true },
    pagado: { type: Boolean, required: true },
    importe: {
        type: Schema.Types.Decimal128, // Utilizar Decimal128 para almacenar números decimales
        required: true,
        get: (value) => new Decimal(value), // Convertir el valor a Decimal al obtenerlo de la base de datos
        set: (value) => new Decimal(value).toDecimalPlaces(2).toString() // Convertir el valor a Decimal y redondearlo a 2 decimales antes de guardarlo en la base de datos
    },
    clase: {
        type: Schema.Types.ObjectId,
        ref: Clase,
        required: true
    },
    alumno: {
        type: Schema.Types.ObjectId,
        ref: Alumno,
        required: true
    }
})

module.exports = mongoose.models.Cuota || mongoose.model('Cuota', CuotaSchema);