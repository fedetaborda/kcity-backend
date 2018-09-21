var express = require('express');

var app = express();


app.get('/', (req, res, next) => {

    res.status(200).json({
        ok: true,
        mensaje: 'Peticion realizada correctamente desde API HEROKU y Db Mlab'
    });

});

module.exports = app;