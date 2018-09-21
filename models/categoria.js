var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var categoriaSchema = new Schema({
    nombre: { type: String, required: [true, 'La categoria del producto es necesaria'] },
    estado: { type: Boolean, required: true, default: true },
    fecha: { type: String, required: false }
});

module.exports = mongoose.model('Categoria', categoriaSchema);