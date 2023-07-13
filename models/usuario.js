const mongoose = require('mongoose');
const Rol = require('./rol')

const { Schema } = mongoose;

const UsuarioSchema = new Schema({
    nombreUsuario: { type: String, required: true },
    password: { type: String, required: true },
    rol: {
        type: Schema.Types.ObjectId,
        ref: Rol,
        required: true
    },
})

module.exports = mongoose.models.Usuario || mongoose.model('Usuario', UsuarioSchema);