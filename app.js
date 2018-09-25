// Requires
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

// Inicializar variables
var app = express();


// CORS
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
    next();
});


// Body Parser
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// Importar rutas
var appRoutes = require('./routes/app');
var usuarioRoutes = require('./routes/usuario');
var loginRoutes = require('./routes/login');
var uploadRoutes = require('./routes/upload');
var imagenesRoutes = require('./routes/imagenes');
var productoRoutes = require('./routes/producto');
var categoriaRoutes = require('./routes/categoria');
var marcaRoutes = require('./routes/marca');
var busquedaRoutes = require('./routes/busqueda');
var cartRoutes = require('./routes/cart');
var ubicacionRoutes = require('./routes/ubicacion');
var mercadopagoRoutes = require('./routes/mercadopago');


// Conexión a la base de datos

// mongodb://localhost:27017/VentasKcity

// mongodb://user-kcity:fede4303@ds215822.mlab.com:15822/kcity

const port = process.env.PORT || 3000;

mongoose.connection.openUri('mongodb://user-kcity:fede4303@ds215822.mlab.com:15822/kcity', (err, res) => {

    if (err) throw err;

    console.log('Base de datos: \x1b[32m%s\x1b[0m', 'online');

});


// Rutas
app.use('/usuario', usuarioRoutes);
app.use('/login', loginRoutes);
app.use('/upload', uploadRoutes);
app.use('/img', imagenesRoutes);
app.use('/producto', productoRoutes);
app.use('/categoria', categoriaRoutes);
app.use('/marca', marcaRoutes);
app.use('/busqueda', busquedaRoutes);
app.use('/cart', cartRoutes);
app.use('/ubicacion', ubicacionRoutes);
app.use('/mercadopago', mercadopagoRoutes);

app.use('/', appRoutes);


// Escuchar peticiones
app.listen(port, () => {
    console.log(`Express server puerto  ${ port } `);
    /*: \x1b[32m%s\x1b[0m', 'online');*/
});