const mongoose = require('mongoose');
const { Schema } = mongoose;
const Categoria = require('./categoria');

const InsumoSchema = new Schema({
    nombre: { type: String, required: true },
    descripcion: { type: String, required: true },
    precio: { type: String, required: true },
    stock: { type: Number, required: true },
    imagen: { type: String },
    categoria: {
        type: Schema.Types.ObjectId,
        ref: Categoria,
        required: true
    }
})

module.exports = mongoose.models.Insumo || mongoose.model('Insumo', InsumoSchema);