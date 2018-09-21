var express = require('express');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

var mdAutenticacion = require('../middlewares/autenticacion');

var app = express();

var moment = require('moment');

var Categoria = require('../models/categoria');

moment.locale('es');


// ==========================================
// Crear un nueva Categoria
// ==========================================
app.post('/', mdAutenticacion.verificaToken, (req, res) => {

    var body = req.body;


    var categoria = new Categoria({
        nombre: body.nombre,
        fecha: moment().format('DD-MM-YYYY')
    });

    categoria.save((err, categoriaGuardada) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al crear la categoria',
                errors: err
            });
        }

        res.status(201).json({
            ok: true,
            categoria: categoriaGuardada
        });


    });

});


// ==========================================
// Actualizar Categoria
// ==========================================
app.put('/:id', mdAutenticacion.verificaToken, (req, res) => {

    var id = req.params.id;
    var body = req.body;

    Categoria.findById(id, (err, categoria) => {


        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar categoria',
                errors: err
            });
        }

        if (!categoria) {
            return res.status(400).json({
                ok: false,
                mensaje: 'La categoria con el id ' + id + ' no existe',
                errors: { message: 'No existe la categoria con ese ID' }
            });
        }


        categoria.nombre = body.nombre;
        categoria.estado = body.estado;


        categoria.save((err, categoriaGuardada) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error al actualizar la categoria',
                    errors: err
                });
            }

            res.status(200).json({
                ok: true,
                categoria: categoriaGuardada
            });

        });

    });

});

// ==========================================
// Obtener categoria
// ==========================================
app.get('/:id', (req, res) => {

    var id = req.params.id;

    Categoria.findById(id)
        .populate('categoria')
        .exec((err, categoria) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error al buscar categoria',
                    errors: err
                });
            }

            if (!categoria) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'La categoria con el id ' + id + ' no existe',
                    errors: { message: 'No existe un categoria con ese ID' }
                });
            }

            res.status(200).json({
                ok: true,
                categoria: categoria
            });

        })


});

// ==========================================
// Obtener todas las categoria
// ==========================================
app.get('/', (req, res, next) => {

    var desde = req.query.desde || 0;
    desde = Number(desde);

    Categoria.find({})
        .skip(desde)
        .limit(5)
        .populate('categoria')
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