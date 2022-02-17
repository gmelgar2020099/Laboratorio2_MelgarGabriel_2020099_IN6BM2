const express = require('express')
const asignacionControlador = require('../controller/asignaciones.controller')
const md_autenticacion = require('../middlewares/aut')

    var api = express.Router();

    api.post('/asignacion', md_autenticacion.Auth,asignacionControlador.asignacion)

    
    api.get('/encontrarAsignaciones', md_autenticacion.Auth,asignacionControlador.encontrarAsignacionAlumno)


    module.exports = api;