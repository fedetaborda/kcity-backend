var express = require('express');

var app = express();

var Producto = require('../models/producto');

// ==============================
// Busqueda por colección
// ==============================
/*app.get('/coleccion/:tabla/:busqueda', (req, res) => {

    var busqueda = req.params.busqueda;
    var tabla = req.params.tabla;
    var regex = new RegExp(busqueda, 'i');

    var promesa;

    switch (tabla) {

        case 'usuarios':
            promesa = buscarUsuarios(busqueda, regex);
            break;

        case 'medicos':
            promesa = buscarMedicos(busqueda, regex);
            break;

        case 'hospitales':
            promesa = buscarHospitales(busqueda, regex);
            break;

        default:
            return res.status(400).json({
                ok: false,
                mensaje: 'Los tipos de busqueda sólo son: usuarios, medicos y hospitales',
                error: { message: 'Tipo de tabla/coleccion no válido' }
            });

    }

    promesa.then(data => {

        res.status(200).json({
            ok: true,
            [tabla]: data
        });

    })

});*/


// ==============================
// Busqueda nombre del producto
// ==============================
app.get('/producto/:busqueda', (req, res, next) => {

    var busqueda = req.params.busqueda;
    var regex = new RegExp(busqueda, 'i');

    console.log(regex);

    Promise.race([
            buscarNombre(regex)
        ])
        .then(respuesta => {

            res.status(200).json({
                ok: true,
                producto: respuesta
            });
        });
});

function buscarNombre(regex) {

    return new Promise((resolve, reject) => {

        Producto.find( { nombre: regex } )
            .populate('productos')
            .exec((err, productos) => {

                if (err) {
                    reject('Error al cargar productos', err);
                } else {
                    resolve(productos);
                }
            });
    });
}


app.get('/categoria/:busqueda', (req, res, next) => {

    var busqueda = req.params.busqueda;

    Promise.race([
        buscarCategoria(busqueda)
        ])
        .then(respuesta => {

            res.status(200).json({
                ok: true,
                producto: respuesta
            });
        });
});


function buscarCategoria(busqueda) {

    return new Promise((resolve, reject) => {

        Producto.find( { categoria: busqueda } )
            .populate('productos')
            .populate('categoria')
            .exec((err, productos) => {

                if (err) {
                    reject('Error al cargar productos', err);
                } else {
                    resolve(productos);
                }
            });
    });
}







module.exports = app;