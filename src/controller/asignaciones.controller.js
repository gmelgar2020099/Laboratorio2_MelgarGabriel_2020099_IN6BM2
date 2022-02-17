const Asignacion = require('../models/asignaciones.model');
const jwt = require('../services/jwt')



function asignacion(req, res) {
    var parameters = req.body
    var asignacionModel = new Asignacion()

    Asignacion.find({ idAlumno: req.user.sub }, (err, asignacion1) => {
        if (asignacion1.length ==3) {
            return res.status(500).send({ message: "Solo puede agregarse a 3 cursos, no mas" });
        } else {
            Asignacion.find({ idCurso: parameters.idCurso, idAlumno: req.user.sub }, (err, asignacion2) => {
                if (asignacion2.length == 0) {
                    if (parameters.idCurso) {
                        asignacionModel.idAlumno = req.user.sub
                        asignacionModel.idCurso = parameters.idCurso

                        asignacionModel.save((err, asignacionNueva) => {
                            if (err) return res.status(500).send({ message: "error en la peticion" });
                            if (!asignacionNueva) return res.status(404).send({ message: "Error no se asigno a ningun curso" });
                            return res.status(200).send({ asignacion: asignacionNueva})
                        })
                    }
                } else{
                    return res.status(500).send({ message: "ya se encuentra agregado a este curso" });
                }
            })
        }

    })
}

function encontrarAsignacionAlumno(req, res) {
    Asignacion.find({idAlumno:req.user.sub}, (err, asignacionEncontrada) => {
        if (err) return res.status(500).send({ message: "error en la peticion" });
        if (!asignacionEncontrada) return res.status(404).send({ message: "Error, al obtener las asignaciones "})
        return res.status(200).send({ respuesta: asignacionEncontrada })
    }).populate('idAlumno','nombres email').populate('idCurso','nombre')
}
module.exports ={
    asignacion,
    encontrarAsignacionAlumno
}



