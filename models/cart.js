var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var estadosPermitidos = {
    values: ['Pendiente de Entrega', 'Entregado / Finalizado'],
    message: '{VALUE} no es un estado de venta permitido'
};

var cartSchema = new Schema({
    usuario: { type: Schema.Types.ObjectId, ref: 'Usuario' },
    productos: { type: Array, required: true },
    direccion: { type: String, required: true },
    pago: { type: String, required: true },
    idCompra: { type: String, required: true },
    estado: { type: String, default: 'Pendiente de Entrega', enum: estadosPermitidos },
    subTotal: { type: String, required: true },
    fecha: { type: String, required: true },
    hora: { type: String, required: true }
});

module.exports = mongoose.model('Cart', cartSchema);