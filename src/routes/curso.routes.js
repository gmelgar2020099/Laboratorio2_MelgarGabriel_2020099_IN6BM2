
const express = require('express');
const cursoController = require('../controller/curso.controller');
const md_autenticacion =require('../middlewares/aut')



var api = express.Router();

api.post('/encontrarCurso',md_autenticacion.Auth, cursoController.encontrarCursos)

api.get('/agregarCurso',md_autenticacion.Auth, cursoController.agregarCurso)

api.put('/editarCurso/:idCurso', md_autenticacion.Auth,cursoController.editarCurso)


api.delete('/eliminarCurso/:idCurso',md_autenticacion.Auth,cursoController.eliminarCurso)


module.exports = api;