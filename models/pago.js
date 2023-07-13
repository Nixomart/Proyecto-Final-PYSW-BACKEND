const mongoose = require('mongoose');
const { Schema } = mongoose;

const PagoSchema = new Schema({
    precio: { type: Number},
    descripcion: {type: String},
    categoria: {type: String},
    fecha: {type: Date}
})

module.exports = mongoose.models.Pago || mongoose.model('Pago', PagoSchema);