var express = require('express');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

var mdAutenticacion = require('../middlewares/autenticacion');

var app = express();

var moment = require('moment');


var Producto = require('../models/producto');

moment.locale('es');


// ==========================================
// Crear un nuevo producto
// ==========================================
app.post('/', mdAutenticacion.verificaToken, (req, res) => {

    var body = req.body;


    var producto = new Producto({
        nombre: body.nombre,
        costo: body.costo,
        cantidad: 1,
        precio: body.precio,
        precio_desc: body.precio_desc,
        descuento: body.descuento,
        rango: body.rango,
        usuario: req.usuario._id,
        categoria: body.categoria,
        estado: body.estado,
        descripcion: body.descripcion,
        promocion: body.promocion,
        interes: body.interes,
        destacado: body.destacado,
        imagen: body.imagen,
        fecha: moment().format('DD-MM-YYYY')
    });


    producto.save((err, productoGuardado) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al crear producto',
                errors: err
            });
        }

        res.status(200).json({
            ok: true,
            producto: productoGuardado
        });


    });

});

// ==========================================
//  Obtener Producto por ID
// ==========================================
app.get('/id/:id', (req, res) => {

    var id = req.params.id;

    Producto.findById(id)
        .populate('usuario', 'nombre img email')
        .exec((err, producto) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error al buscar el Producto',
                    errors: err
                });
            }

            if (!producto) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'El producto con el id ' + id + 'no existe',
                    errors: { message: 'No existe un producto con ese ID' }
                });
            }
            res.status(200).json({
                ok: true,
                producto: producto
            });
        });
});


// ==========================================
// Obtener todos los productos
// ==========================================
app.get('/', (req, res, next) => {

    var desde = req.query.desde || 0;
    desde = Number(desde);

    Producto.find({})
        .skip(desde)
        .limit(100)
        .sort({ nombre: 1 })
        .populate('categoria')
        .exec(
            (err, productos) => {

                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error cargando productos',
                        errors: err
                    });
                }

                Producto.count({}, (err, conteo) => {

                    res.status(200).json({
                        ok: true,
                        productos: productos,
                        total: conteo,
                    });

                })


            });

});

// ==========================================
// Obtener productos por categorias
// ==========================================

app.get('/findcat/:cat', (req, res) => {

    var cat = req.params.cat;

    Producto.find({ categoria: cat })
        .exec((err, producto) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error al buscar el Producto',
                    errors: err
                });
            }

            res.status(200).json({
                ok: true,
                productos: producto
            });
        });
});



// ==========================================
// Obtener Productos en Promocion
// ==========================================
app.get('/promociones', (req, res, next) => {

    Producto.find({ promocion: true, pageprincipal: true })
        .limit(3)
        .exec(
            (err, productos) => {

                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error cargando productos',
                        errors: err
                    });
                }

                res.status(200).json({
                    ok: true,
                    productos: productos
                });


            });

});

// ==========================================
// Obtener Productos Destacados
// ==========================================
app.get('/destacado', (req, res, next) => {

    Producto.find({ destacado: true })
        .populate('')
        .exec(
            (err, productos) => {

                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error cargando productos',
                        errors: err
                    });
                }

                res.status(200).json({
                    ok: true,
                    productos: productos
                });


            });

});

// ==========================================
// Obtener Productos de interes
// ==========================================
app.get('/interes', (req, res, next) => {

    Producto.find({ interes: true })
        .populate('')
        .exec(
            (err, productos) => {

                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error cargando productos',
                        errors: err
                    });
                }

                res.status(200).json({
                    ok: true,
                    productos: productos
                });


            });

});




module.exports = app;