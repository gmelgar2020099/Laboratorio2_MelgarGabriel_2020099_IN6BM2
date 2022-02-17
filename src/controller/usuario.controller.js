const Usuarios = require('../models/usuario.model');
const brycpt = require('bcrypt-nodejs');
const jwt = require('../services/jwt')


function login(req, res) {
    var parametros = req.body;
    console.log(parametros)
    Usuarios.findOne({ email: parametros.email }, (err, usuarioEncontrado) => {
        if (err) return res.status(500).send({ message: "error en la peticion" });
        if (usuarioEncontrado) {
            brycpt.compare(parametros.password, usuarioEncontrado.password,
                (err, verficiacionPassword) => {
                    if (verficiacionPassword) {
                        if (parametros.obtenerToken === 'true') {
                            return res.status(200).send({ token: jwt.crearToken(usuarioEncontrado) });
                        } else {
                            usuarioEncontrado.password = undefined;
                            return res.status(200).send({ usuario: usuarioEncontrado });
                        }

                    } else {
                        return res.status(500).send({ message: "contrasena no coincide" });
                    }
                })
        } else {
            return res.status(500).send({ message: "Error, datos erroneos" });
        }
    })
}

function ObtenerUsuarios(req, res) {
    Usuarios.find((err, usuariosObtenidos) => {
        if (err) return res.send({ mensaje: "Error: " + err })
        for (let i = 0; i < usuariosObtenidos.length; i++) {
            console.log(usuariosObtenidos[i].nombres, usuariosObtenidos[i].email)
        }
        return res.send({ usuarios: usuariosObtenidos })
    })
}

function agregarMaestro(req, res) {
    var parametros = req.body;
    var usuarioModelo = new Usuarios();
    if (parametros.email) {
        usuarioModelo.nombres = 'MAESTRO';
        usuarioModelo.email = parametros.email;
        usuarioModelo.rol = 'ROL_MAESTRO';
    }
    Usuarios.find({ email: parametros.email }, (err, usuarioGuardado) => {
        if (usuarioGuardado.length == 0) {
            brycpt.hash("123456", null, null, (err, passswordEncypt) => {
                usuarioModelo.password = passswordEncypt
                usuarioModelo.save((err, usuarioGuardado) => {
                    console.log(err)
                    if (err) return res.status(500)
                        .send({ message: "error en la peticion" });
                    if (!usuarioGuardado) return res.status(404)
                        .send({ message: "Error, no se agrego el usuario" });
                    return res.status(201)
                        .send({ usuario: usuarioGuardado });
                })
            })

        } else {
            return res.status(500).
                send({ message: "esta usando el mismo correo" });
        }
    })
}


function agregarAlumnos(req, res) {
    var parametros = req.body;
    var usuarioModelo = new Usuarios();
    if (parametros.nombres && parametros.email && parametros.password) {
        usuarioModelo.nombres = parametros.nombres;
        usuarioModelo.email = parametros.email;
        usuarioModelo.rol = 'ROL_ALUMNO';
    }
    Usuarios.find({ email: parametros.email }, (err, usuarioGuardado) => {
        if (usuarioGuardado.length == 0) {
            brycpt.hash(parametros.password, null, null, (err, passswordEncypt) => {
                usuarioModelo.password = passswordEncypt
                usuarioModelo.save((err, usuarioGuardado) => {
                    console.log(err)
                    if (err) return res.status(500)
                        .send({ message: "error en la peticion" });
                    if (!usuarioGuardado) return res.status(404)
                        .send({ message: "Error, no se agrego el usuario" });
                    return res.status(201)
                        .send({ usuario: usuarioGuardado });
                })
            })

        } else {
            return res.status(500).
                send({ message: "esta usando el mismo correo" });
        }
    })
}

function editarAlumno(req, res) {
    var idUsuario = req.params.idUser
    var parameters = req.body
    if (idUsuario == req.user.sub) {
        Usuarios.findByIdAndUpdate(req.user.sub, parameters, { new: true }, (err, usuarioNuevo) => {
            if (err) return res.status(500).send({ message: "error en la peticion" });
            if (!usuarioNuevo) return res.status(404).send({ message: "Error, al editar el Usuario" });
            return res.status(200).send({ Usuario: usuarioNuevo });
        })

    } else {
        return res.status(500).send({ message: "id no valido, no puede editar usuarios que no haya creado usted" })
    }
}


function eliminarAlumno(req, res) {
    var idUsuario = req.params.idUser
    var parameters = req.body
    if (idUsuario == req.user.sub) {
        Usuarios.findByIdAndDelete(req.user.sub, parameters, (err, usuarioEliminar) => {
            if (err) return res.status(500).send({ message: "error en la peticion" });
            if (!usuarioEliminar) return res.status(404).send({ message: "Error, al eliminar  el Usuario" });
            return res.status(200).send({ usuario: usuarioEliminar })
        })
    } else{
        return res.status(500).send({ message: "id no valido, no puede eliminar usuarios que no haya creado usted" })
    }
}


module.exports = {
    login,
    agregarMaestro,
    agregarAlumnos,
    ObtenerUsuarios,
    editarAlumno,
    eliminarAlumno

}
