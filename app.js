//IMPORTACIONES
var express = require('express');
const cors = require('cors');
const PdfImpression = require("pdfmake")
const fs = require('fs')
var app = express();
/*
const fonts = require("./src/pdfData/fonts");
const Styles = require("./src/pdfData/styles");
const {content} = require("./src/pdfData/pdfcontent");



let docDefinition ={
    content: content,
    Styles: Styles 
};


const printer = new PdfImpression(fonts);

let pdfDoc = printer.createPdfKitDocument(docDefinition);
pdfDoc.pipe(fs.createWriteStream("./src/pdfGenerate/pruebaPdf.pdf"));
pdfDoc.end();*/

//IMPORTACIONES RUTAS
const rutasUsuario = require('./src/routes/usuario.routes');
//const RutasUsuarios = require('./src/routes/usuario.routes')
const rutasCurso = require('./src/routes/curso.routes')
const rutasAsignacion = require('./src/routes/asignaciones.routes')
//const styles = require('./src/pdfData/styles');

//MIDDLEWARES
app.use(express.urlencoded({extended: false}));
app.use(express.json());


//CABECERAS
app.use(cors());

//CARGA DE RUTAS se realizaba como localhost:3000/obtenerProductos
app.use('/api', rutasUsuario, rutasCurso, rutasAsignacion);


module.exports = app;
