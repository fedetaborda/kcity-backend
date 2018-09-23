var express = require('express');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

var mdAutenticacion = require('../middlewares/autenticacion');

var app = express();

var moment = require('moment');

var Cart = require('../models/cart');

var Usuario = require('../models/usuario');

moment.locale('es');

// ==========================================
// Obtener compras idVenta
// ==========================================
app.post('/num-compra/', mdAutenticacion.verificaToken, (req, res) => {

    var body = req.body;

    /* filtra por id de compra y usuario logueado */
    Cart.find({ idCompra: body.id, usuario: req.usuario._id })

    .exec((err, cart) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar la compra',
                errors: err
            });
        }

        if (!cart) {
            return res.status(400).json({
                ok: false,
                mensaje: 'La compra con el id ' + id + ' no existe'
            });
        }

        res.status(200).json({
            ok: true,
            cart: cart

        });
    })


});


// ==========================================
// Obtener cantidad de copras realizadas
// ==========================================
app.get('/cant-compras', mdAutenticacion.verificaToken, (req, res) => {


    var id = req.usuario._id;

    Cart.count({ usuario: id }, (err, conteo) => {

        res.status(200).json({
            ok: true,
            total_ventas: conteo,
        });

    })
});


// ==========================================
// Obtener compras por usuario (todos los estados)
// ==========================================
app.get('/:id', (req, res) => {

    var id = req.params.id;

    Cart.find({ usuario: id })
        .populate('usuario')
        .exec((err, cart) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error al buscar el pedido',
                    errors: err
                });
            }

            if (!cart) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'La compra con el id ' + id + ' no existe'
                });
            }

            res.status(200).json({
                ok: true,
                cart: cart
            });

        })


});

// ==========================================
// Add Producto Carrito
// ==========================================
app.post('/', mdAutenticacion.verificaToken, (req, res) => {


    var body = req.body;

    var cart = new Cart({
        usuario: req.usuario._id,
        direccion: body.direccion,
        pago: body.pago,
        idCompra: body.idCompra,
        productos: body.productos,
        subTotal: body.subTotal,
        estado: body.estado,
        fecha: moment().format('DD-MM-YYYY'),
        hora: moment().format('HH:mm')
    });

    cart.save((err, cartGuardado) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al crear compra',
                errors: err
            });
        }

        res.status(200).json({
            ok: true,
            cart: cartGuardado
        });


    });

});


module.exports = app;