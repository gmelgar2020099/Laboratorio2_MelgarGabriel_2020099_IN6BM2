const Cursos = require('../models/curso.model');
const jwt = require('../services/jwt')



function encontrarCursos(req, res) {
    Cursos.find((err, cursoEncontrado) => {
        if (err) return res.status(500).send({ message: "error en la peticion" });
        if (!cursoEncontrado) return res.status(404).send({ message: "Error, no se encontro la encuesta" });
        return res.status(200).send({ cursos: cursoEncontrado })
    }).populate('idMaestro', 'nombres email')
}


function agregarCurso(req, res) {
    var parametros = req.body;
    var cursoModelo = new Cursos();
    if (parametros.nombre) {
        cursoModelo.nombre = parametros.nombre;
        cursoModelo.idMaestro= req.user.sub;
    } else {

    }
    if (req.user.rol == "ROL_MAESTRO") {
        Cursos.find({ nombre: parametros.nombre }, (err, usuarioGuardado) => {
            if (usuarioGuardado.length == 0) {
                cursoModelo.save((err, usuarioGuardado) => {
                    console.log(err)
                    if (err) return res.status(500)
                        .send({ message: "error en la peticion" });
                    if (!usuarioGuardado) return res.status(404)
                        .send({ message: "Error, no se agrego el usuario" });
                    return res.status(201)
                        .send({ usuario: usuarioGuardado });
                })
            } else {
                return res.status(500).
                    send({ message: "esta creando el mismo curso" });
            }
        }).populate('idMaestro', 'nombre')

    } else {
        return res.status(500).send({ message: "no es maestro" });
    }
}

function editarCurso(req, res) {
    var idCursos = req.params.idCurso
    var parameters = req.body
    if (req.user.rol == "ROL_MAESTRO") {
        Cursos.findOneAndUpdate({ _id: idCursos, idMaestro:req.user.sub }, parameters, { new: true }, (err, cursoEditar) => {
            if (err) return res.status(500).send({ message: "error al editar curso" });
            if (!cursoEditar) return res.status(404).send({ message: "No tiene permisos" });
            return res.status(200).send({ cursos: cursoEditar });
        })
    } else{
        return res.status(500).send({ message: "no es maestro" });
    }
}


function eliminarCurso(req, res) {
    var idCursos = req.params.idCurso
    var parameters = req.body
    if (req.user.rol == "ROL_MAESTRO") {
        Cursos.findOneAndDelete({ _id: idCursos, idMaestro:req.user.sub }, (err, cursoEliminado) => {
            if (err) return res.status(500).send({ message: "error al eliminar curso" });
            if (!cursoEliminado) return res.status(404).send({ message: "No tiene permisos" });
            return res.status(200).send({ cursos: cursoEliminado });
        })
    } else{
        return res.status(500).send({ message: "no es maestro" });
    }
}


module.exports = {
    encontrarCursos,
    agregarCurso,
    editarCurso,
    eliminarCurso
}