var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var marcaSchema = new Schema({
    nombre: { type: String, required: [true, 'La marca del producto es necesario'] },
    estado: { type: Boolean, required: true, default: true },
    fecha: {type: Date, required: false } 
});

module.exports = mongoose.model('Marca', marcaSchema);