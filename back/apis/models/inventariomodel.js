const mongoose = require("mongoose")
var Schema = mongoose.Schema
var inventarioModel = {}

var inventarioSchema = new Schema({
    codigo:String,
    nombre:String,
    descripcion:String,
    cantidad:String,
    precio:String
})

const Mymodel = mongoose.model("inventario",inventarioSchema)


inventarioModel.existecodigo = function (post,callback) {
    Mymodel.find({codigo:post.codigo}).then((respuesta)=>{
        return callback(respuesta)
    }).catch((error) => {
        console.log(error)
    })
 }

 inventarioModel.existeid = function (post,callback) {
    Mymodel.find({_id:post._id}).then((respuesta)=>{
        return callback(respuesta)
    }).catch((error) => {
        console.log(error)
    })
 }

inventarioModel.Guardar = function (post,callback) {
    const instancia = new Mymodel
    instancia.codigo = post.codigo
    instancia.nombre = post.nombre
    instancia.descripcion = post.descripcion
    instancia.precio = post.precio
    instancia.cantidad = post.cantidad

    instancia.save().then((respuesta)=>{
        return callback({state:true})
    }).catch((error) => {
        console.log(error)
        return callback({state:false})
    })
}
inventarioModel.CargarTodas = function (post,callback) {
    Mymodel.find({},{}).then((respuesta) => {
        return callback(respuesta)
    })
}
inventarioModel.Cargarid = function (post,callback) {
        Mymodel.find({_id:post._id},{}).then((respuesta) => {
        return callback(respuesta)
    })
}
inventarioModel.Actualizar = function (post,callback) {
    Mymodel.findByIdAndUpdate(
        post._id, // puedes pasar el id directamente
        {
            descripcion: post.descripcion,
            cantidad: post.cantidad,
            precio: post.precio
        },
        { new: true } // para que devuelva el doc actualizado
    )
    .then((respuesta) => {
        if (respuesta) {
            return callback({ state: true, data: respuesta })
        } else {
            return callback({ state: false, mensaje: "No se encontró el registro" })
        }
    })
    .catch((error) => {
        console.log("Error en Actualizar:", error)
        return callback({ state: false, error })
    })
}
inventarioModel.Eliminar = function (post,callback) {
    Mymodel.findByIdAndDelete(post._id)  // <-- pasar solo el ID
    .then((respuesta) => {
        if (respuesta) {
            return callback({ state: true, mensaje: "Elemento eliminado" })
        } else {
            return callback({ state: false, mensaje: "No se encontró el registro" })
        }
    })
    .catch((error) => {
        console.log("Error en Eliminar:", error)
        return callback({ state: false, error })
    })
}




inventarioModel.Mymodel = Mymodel
module.exports.inventarioModel = inventarioModel