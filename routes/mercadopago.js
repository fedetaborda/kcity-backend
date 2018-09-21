var express = require('express');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

var mdAutenticacion = require('../middlewares/autenticacion');

// var Mercadopago = require('../models/mercadopago');

var app = express();

var mercadopago = require('mercadopago');




// ==========================================
// Crear preference
// ==========================================

app.post('/', (req, res) => {

    var body = req.body;

    // Create a preference structure
    console.log(body);
    preference = {
        items: [
            item = {
                id: body.id,
                title: 'Compra en Kcity',
                quantity: 1,
                currency_id: 'ARS',
                unit_price: parseFloat(body.total)
            }
        ],
        payer: {
            email: body.email
        }
    };

    mercadopago.configure({
        client_id: '3640873518284384',
        client_secret: 'rCZUFGASCQgdT4faYuyMJdq5ClFGDnsB'
    });


    mercadopago.preferences.create(preference)
        .then(function(preference) {
            // Do something if preference has been created successfully

            res.status(201).json({
                ok: true,
                preference: preference
            });


        }).catch(function(error) {
            // If an error has occurred
            res.status(500).json({
                ok: false,
                mensaje: 'Error al generar Mercado Pago',
                error: error
            });
        });

});



module.exports = app;