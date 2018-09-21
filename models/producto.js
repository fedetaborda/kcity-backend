var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var productoSchema = new Schema({
    nombre: { type: String, required: [true, 'El nombre del producto es necesario'] },
    cantidad: { type: Number },
    costo: { type: Number, required: [true, 'El precio de costo es necesario'] },
    precio: { type: Number, required: [true, 'El precio es necesario'] },
    rango: { type: String, required: [true, 'El valor de rango de precio es requerido'] },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: [true, 'falta el usuario de carga']
    },
    categoria: {
        type: Schema.Types.ObjectId,
        ref: 'Categoria',
        required: [true, 'La categoria es obligatorio']
    },
    imagen: { type: String, required: false },
    precio_desc: { type: Number, required: false },
    descuento: { type: Number, required: false },
    promocion: { type: Boolean, required: true, default: false },
    pageprincipal: { type: Boolean, required: true, default: false },
    interes: { type: Boolean, required: true, default: false },
    destacado: { type: Boolean, required: true, default: false },
    descripcion: { type: String, required: false },
    fecha: { type: String, required: true },
    estado: { type: Boolean, required: true, default: true },
});


module.exports = mongoose.model('Producto', productoSchema);