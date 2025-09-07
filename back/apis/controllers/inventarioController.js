const inventarioModel = require("../models/inventariomodel.js").inventarioModel
var inventarioController = {}

inventarioController.Guardar = function (request,response) {
    var post ={

        codigo:request.body.codigo,
         nombre:request.body.nombre,
          descripcion:request.body.descripcion,
           precio:request.body.precio,
            cantidad:request.body.cantidad,
    }

if (post.codigo == undefined || post.codigo == null || post.codigo == "") {
    response.json({state:false,mensaje:"el campo codigo es obligatorio"})
    return false
}
if (post.nombre == undefined || post.nombre == null || post.nombre == "") {
    response.json({state:false,mensaje:"el campo nombre es obligatorio"})
    return false
}
if (post.precio == undefined || post.precio == null || post.precio == "") {
    response.json({state:false,mensaje:"el campo precio es obligatorio"})
    return false
}
if (post.cantidad == undefined || post.cantidad == null || post.cantidad == "") {
    response.json({state:false,mensaje:"el campo cantidad es obligatorio"})
    return false
}

inventarioModel.existecodigo(post,function(existe){
   if(existe.length == 0){
    inventarioModel.Guardar(post,function(respuesta){
        if(respuesta.state == true){
            response.json({state:true,mensaje:"item almacenado"})
        }else{
            response.json({state:false,mensaje:"error al almacenar el item"})
        }
    })
   }else{
    response.json({state:false,mensaje:"el codigo ya existe intente con otro"})
   }
})


}
inventarioController.CargarTodas = function (request,response) {
    inventarioModel.CargarTodas(null,function(respuesta){
        response.json(respuesta)
    })
}
inventarioController.Cargarid = function (request,response) {
   var post = {
    _id:request.params._id
   } 

if (post._id == undefined || post._id == null || post._id == "") {
    response.json({state:false,mensaje:"el campo _id es obligatorio"})
    return false
}

inventarioModel.Cargarid(post,function(respuesta){
    response.json(respuesta)
})
}
inventarioController.Actualizar = function (request,response) {
   var post = {
        _id:request.body._id,
          descripcion:request.body.descripcion,
           precio:request.body.precio,
            cantidad:request.body.cantidad,
   }
   
   
 if (post._id == undefined || post._id == null || post._id == "") {
    response.json({state:false,mensaje:"el campo _id es obligatorio"})
    return false
}

 if (post.precio == undefined || post.precio == null || post.precio == "") {
    response.json({state:false,mensaje:"el campo precio es obligatorio"})
    return false
}
if (post.cantidad == undefined || post.cantidad == null || post.cantidad == "") {
    response.json({state:false,mensaje:"el campo cantidad es obligatorio"})
    return false
}
   
inventarioModel.existeid(post,function(existe){
    if (existe.length == 0) {
          response.json({state:false,mensaje:"el id que intenta actualizar no existe"})
        
    }else{
        inventarioModel.Actualizar(post,function(respuesta){
            if(respuesta.state == true){
                response.json({state:true,mensaje:"se ha Actualizado el elemento"})
            }else{
                 response.json({state:false,mensaje:"error al Actualizar el elemento"})
            }
        })

    }
})




}
inventarioController.Eliminar = function (request,response) {
      var post = {
        _id:request.body._id,

   }
   
   
 if (post._id == undefined || post._id == null || post._id == "") {
    response.json({state:false,mensaje:"el campo _id es obligatorio"})
    return false
}

   
inventarioModel.existeid(post,function(existe){
    if (existe.length == 0) {
          response.json({state:false,mensaje:"el id que intenta actualizar no existe"})
        
    }else{
        inventarioModel.Eliminar(post,function(respuesta){
            if(respuesta.state == true){
                response.json({state:true,mensaje:"se ha Eliminado el elemento"})
            }else{
                 response.json({state:false,mensaje:"error al Eliminado el elemento"})
            }
        })

    }
})



 
}

module.exports.inventarioController = inventarioController