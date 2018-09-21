var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var ventasSchema = new Schema({
    producto: {
        type: Schema.Types.ObjectId,
        ref: 'Producto',
        required: [true, 'el producto es obligatorio']
    },
    promocion: { type: Boolean, required: true, default: false },
    precio:{ type: Number, required: [true, 'El precio del productos es necesario'] },
    cantidad:{ type: Number, required: [true, 'La cantidad de productos es necesario'] },
    fecha_venta:{ type: Date, required: [true, 'La fecha de venta es necesaria'] }

});

module.exports = mongoose.model('Venta', ventasSchema);