const express = require("express")
const router = express.Router()

var usuariosController = require("./apis/controllers/usuariosController.js").usuariosController

var security = require("./midleware/security.js").security

app.post("/usuarios/Guardar", security.Soloadmin, function(request, response){
    usuariosController.Guardar(request, response)
})

app.get("/usuarios/CargarTodas" , security.Soloadmin, function(request, response){
    usuariosController.CargarTodas(request, response)
})

app.get("/usuarios/Cargarid/:_id", security.Soloadmin, function(request, response){
    usuariosController.Cargarid(request, response)
})

app.put("/usuarios/Actualizar", security.Soloadmin, function(request, response){
    usuariosController.Actualizar(request, response)
})

app.delete("/usuarios/Eliminar", security.Soloadmin, function(request, response){
    usuariosController.Eliminar(request, response)
})





app.post("/usuarios/Registrar", function(request, response){
    usuariosController.Registrar(request, response)
})

app.post("/usuarios/Login", function(request, response){
    usuariosController.Login(request, response)
})

app.post("/usuarios/Activar/", function(request, response){
    usuariosController.Activar(request, response)
})

app.post("/usuarios/SolicitudRecuperarPass", function(request, response){
    usuariosController.SolicitudRecuperarPass(request, response)
})

app.post("/usuarios/RecuperarPass", function(request, response){
    usuariosController.RecuperarPass(request, response)
})

app.post("/usuarios/estado", function(request,response){
    response.json(request.session)
})

app.post("/usuarios/logout", function(request,response){
    request.session.destroy()
    response.json({state:true, mensaje:"sesion cerrada"})
})

app.post("/usuarios/ActualizarPass", function(request, response){
    usuariosController.ActualizarPass(request, response)
})




var inventarioController = require("./apis/controllers/inventarioController.js").inventarioController

app.post("/inventario/Guardar", security.Soloadmin, function(request, response){
    inventarioController.Guardar(request, response)
})

app.get("/inventario/CargarTodas" ,function(request, response){
    inventarioController.CargarTodas(request, response)
})

app.get("/inventario/Cargarid/:_id", function(request, response){
    inventarioController.Cargarid(request, response)
})

app.put("/inventario/Actualizar", security.Soloadmin, function(request, response){
    inventarioController.Actualizar(request, response)
})

app.delete("/inventario/Eliminar", security.Soloadmin, function(request, response){
    inventarioController.Eliminar(request, response)
})