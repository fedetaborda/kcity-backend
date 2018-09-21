var express = require('express');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

var mdAutenticacion = require('../middlewares/autenticacion');

var app = express();

var Marca = require('../models/marca');


// ==========================================
// Crear un nueva Categoria
// ==========================================
app.post('/', (req, res) => {

    var body = req.body;

    var marca = new Marca({
        nombre: body.nombre,
        estado: body.costo,
        fecha: body.fecha
    });

    marca.save((err, marcaGuardada) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al crear la categoria',
                errors: err
            });
        }

        res.status(201).json({
            ok: true,
            marca: marcaGuardada
        });


    });

});

// ==========================================
// Obtener todas las categoria
// ==========================================
app.get('/', (req, res, next) => {

    var desde = req.query.desde || 0;
    desde = Number(desde);

    Marca.find({})
        .skip(desde)
        .limit(5)
        .populate()
        .populate('categoria')
        .exec(
            (err, marcas) => {

                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error cargando la marca',
                        errors: err
                    });
                }

                Marca.count({}, (err, conteo) => {
                    res.status(200).json({
                        ok: true,
                        marca: marcas,
                        total: conteo
                    });

                })

            });

});


module.exports = app;