const mongoose = require('mongoose');
const Usuario = require('./usuario');
const { Schema } = mongoose;

const AdministrativoSchema = new Schema({
    apellido: { type: String, required: true },
    nombre: { type: String, required: true },
    fechaNacimiento: { type: Date, required: true },
    dni: { type: Number, required: true },
    email: { type: String, required: true },
    nroCelular: { type: String, required: true },
    domicilio: { type: String, required: true },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: Usuario
    }
})

module.exports = mongoose.models.Administrativo || mongoose.model('Administrativo', AdministrativoSchema);