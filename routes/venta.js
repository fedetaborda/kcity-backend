var express = require('express');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

var mdAutenticacion = require('../middlewares/autenticacion');

var app = express();

var venta = require('../models/venta');


// ==========================================
// Crear un nueva Categoria
// ==========================================
app.post('/', (req, res) => {

    var body = req.body;

    var venta = new Categoria({
        nombre: body.nombre,
        estado: body.costo,
        fecha: body.fecha
    });

    venta.save((err, ventaGuardada) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al crear la categoria',
                errors: err
            });
        }

        res.status(201).json({
            ok: true,
            categoria: ventaGuardada
        });


    });

});

// ==========================================
// Obtener todas las categoria
// ==========================================
app.get('/', (req, res, next) => {

    var desde = req.query.desde || 0;
    desde = Number(desde);

    Venta.find({})
        .skip(desde)
        .limit(5)
        .populate()
        .populate('venta')
        .exec(
            (err, categorias) => {

                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error cargando categorias',
                        errors: err
                    });
                }

                Categoria.count({}, (err, conteo) => {
                    res.status(200).json({
                        ok: true,
                        categorias: categorias,
                        total: conteo
                    });

                })

            });

});


module.exports = app;