//IMPORTACIONES
const express = require('express');
const usuarioController = require('../controller/usuario.controller');
const md_autenticacion =require('../middlewares/aut')



var api = express.Router();


api.post('/login',usuarioController.login)
api.get('/agregarMaestro', usuarioController.agregarMaestro)
api.get('/agregarAlumno', usuarioController.agregarAlumnos)
api.put('/editarAlumno/:idUser', md_autenticacion.Auth, usuarioController.editarAlumno)
api.delete('/eliminarAlumno/:idUser', md_autenticacion.Auth, usuarioController.eliminarAlumno)
api.get('/usuarios', usuarioController.ObtenerUsuarios);

module.exports = api;