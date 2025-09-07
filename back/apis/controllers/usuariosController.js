const usuariosModel = require("../models/usuariosmodel.js").usuariosModel
var usuariosController = {}


usuariosController.Guardar = function(request, response){
var post = {
        nombre:request.body.nombre,
        email:request.body.email,
        password:request.body.password,
        rol:request.body.rol,
        celular:request.body.celular
    }

    if(post.nombre == undefined || post.nombre == null || post.nombre == ""){
        response.status(200).json({state:false, mensaje:"El campo nombre es obligatorio"})
        return false
    }

    if(post.email == undefined || post.email == null || post.email == ""){
        response.status(200).json({state:false, mensaje:"El campo email es obligatorio"})
        return false
    }

    if(post.password == undefined || post.password == null || post.password == ""){
        response.json({state:false, mensaje:"El campo password es obligatorio"})
        return false
    }

    
    if(post.rol == undefined || post.rol == null || post.rol == ""){
        response.json({state:false, mensaje:"El campo rol es obligatorio"})
        return false
    }

    // if(post.celular == undefined || post.celular == null || post.celular == ""){
    //     response.status(200).json({state:false, mensaje:"El campo celular es obligatorio"})
    //     return false
    // }

    post.password = sha256(post.password + config.clavesecreta)

    usuariosModel.ExisteCorreo(post, function(existe){

        if(existe.length == 0){

            usuariosModel.Guardar(post, function(respuesta){
                if(respuesta.state == true){
                    response.json({state:true, mensaje:"Item Almacenado",data:[] })
                }
                else{
                    response.json({state:false, mensaje:"Error al Guardar"})
                }
            })
        }
        else{
            response.json({state:false, mensaje:"La email Ya Existe Intente con otro" })
        }
    })
    
}

usuariosController.CargarTodas = function(request, response){
    usuariosModel.CargarTodas({}, function(respuesta){
        response.json({state:true,datos:respuesta})
    })

}

usuariosController.Cargarid = function(request, response){
    var post = {
        _id:request.params._id,
    }

    if ([undefined, null, ""].indexOf(post._id) >= 0){
        response.status(200).json({state:false, mensaje:"El campo _id es Obligatorio"})
        return false
    }

    usuariosModel.Cargarid(post, function(respuesta){
        response.json({state:true,datos:respuesta})
    })

}

usuariosController.Actualizar = function(request, response){
var post = {
        _id: request.body._id,
        nombre: request.body.nombre,
        estado: request.body.estado,
        rol:request.body.rol,
        celular:request.body.celular
    }
    console.log(post)

    if([undefined, null, ""].indexOf(post._id) >= 0){
        response.status(200).json({state:false, mensaje:"El campo _id es obligatorio"})
        return false
    }

    if(post.nombre == undefined || post.nombre == null || post.nombre == ""){
        response.status(200).json({state:false, mensaje:"El campo nombre es obligatorio"})
        return false
    }

    if(post.estado == undefined || post.estado == null || post.estado == ""){
        response.json({state:false, mensaje:"El campo estado es obligatorio"})
        return false
    }

     if(post.rol == undefined || post.rol == null || post.rol == ""){
        response.json({state:false, mensaje:"El campo rol es obligatorio"})
        return false
    }

    usuariosModel.Existeid(post, function(Existe){
        if(Existe.length == 0){
            response.json({state:false, mensaje:"La id no existe en la bd"})
            return false
        }
        else{

            usuariosModel.Actualizar(post, function(respuesta){
                if(respuesta.state == true){
                    response.json({state:true, mensaje:"Se actualizo el registro"})
                    return false
                }
            })
        }
    })

}

usuariosController.Eliminar = function(request, response){
    var post = {
        _id: request.body._id,
    }


    if([undefined, null, ""].indexOf(post._id) >= 0){
        response.status(200).json({state:false, mensaje:"El campo _id es obligatorio"})
        return false
    }

    usuariosModel.Existeid(post, function(Existe){

        if(Existe.length == 0){
            response.json({state:false, mensaje:"La email no existe en la bd"})
            return false
        }
        else{

            usuariosModel.Eliminar(post, function(respuesta){
                if(respuesta.state == true){
                    response.json({state:true, mensaje:"Se Elimino el registro"})
                    return false
                }
            })
        }
    })

}



usuariosController.Registrar = function(request, response){

    var post = {
        nombre:request.body.nombre,
        email:request.body.email,
        password:request.body.password
    }

    if(post.nombre == undefined || post.nombre == null || post.nombre.trim() == ""){
        response.json({state:false, mensaje:"El campo nombre es Obligatorio"})
        return false
    }

    if(post.email == undefined || post.email == null || post.email.trim() == ""){
        response.json({state:false, mensaje:"El campo email es Obligatorio"})
        return false
    }

    if(post.password == undefined || post.password == null || post.password.trim() == ""){
        response.json({state:false, mensaje:"El campo password es Obligatorio"})
        return false
    }

    post.password = sha256(post.password + config.clavesecreta)

    var azar = "A-" + Math.floor(Math.random() * (9999 - 1000) + 1000);
    post.codigo = azar

    usuariosModel.ExisteCorreo(post, function(Existe){
        if(Existe.length == 0){
            usuariosModel.Registrar(post, function(respuesta){
                if(respuesta.state == true){

                    const transporter = nodemailer.createTransport({
                        host:config.email.host,
                        port:config.email.port,
                        secure:false,
                        requireTLS:true,
                        auth:{
                            user:config.email.user,
                            pass:config.email.pass
                        }
                    })

                    var mailOptions = {
                        from:config.email.user,
                        to:post.email,
                        subject:"Verifica tu cuenta con el codigo: " + azar,
                        html: `
                            <div style="font-family: Arial, sans-serif; background-color: #f2f2f2; padding: 20px; text-align: center;">

                                <div style="background-color: #ffffff; padding: 30px; border-radius: 10px; max-width: 400px; margin: auto; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
                                    <h2 style="color: #333333; margin-bottom: 20px;">Bienvenido a <span style="color: #4CAF50;">${config.name}</span></h2>
                                    <p style="font-size: 16px; margin-bottom: 20px;">Tu código de activación es:</p>

                                    <input type="text" value="${azar}" readonly 
                                    style="padding: 10px; font-size: 18px; text-align: center; border: 1px solid #cccccc; border-radius: 5px; margin-bottom: 20px; width: 100%;">

                                    <a target="_blank" href="${config.dominio}/activar/${post.email}/${azar}" 
                                    style="display: inline-block; background-color: #4CAF50; color: white; padding: 10px 20px; font-size: 16px; border-radius: 5px; text-decoration: none;">
                                        Activar Cuenta
                                    </a>
                                </div>

                            </div>
                            `
                    }

                    transporter.sendMail(mailOptions, (error, info) => {
                        if(error){
                            console.log(error)
                            response.json({state:false, mensaje:"Error enviando el correo"})
                        }
                        else{
                            console.log(info)
                            response.json({state:true, mensaje:"Usuario Registrado Correctamente verifique su bandeja"})
                        }
                    })

                }
                else{
                    response.json({state:false, mensaje:"Se presento un error al registrar"})
                }
            })
        }
        else{
            response.json({state:false, mensaje:"El correo electronico ya esta en uso intente con otro"})
        }
    })
}

usuariosController.Login = function(request, response){

    var post = {
        email:request.body.email,
        password:request.body.password
    }

    if(post.email == undefined || post.email == null || post.email.trim() == ""){
        response.json({state:false, mensaje:"El campo email es Obligatorio"})
        return false
    }

    if(post.password == undefined || post.password == null || post.password.trim() == ""){
        response.json({state:false, mensaje:"El campo password es Obligatorio"})
        return false
    }

    post.password = sha256(post.password + config.clavesecreta)

    usuariosModel.Login(post,function(respuesta){
        console.log(respuesta)
        if(respuesta.length == 0){
            response.json({state:false, mensaje:"credenciales invalidas"})
        }
        else{
            if(respuesta[0].estado == "Inactivo"){
            response.json({state:false,mensaje:"debe activar su cuenta verificano su correo"})
            }
            else{
                request.session.nombre = respuesta[0].nombre    
                request.session.email = respuesta[0].email  
                request.session.rol = respuesta[0].rol  
                request.session._id = respuesta[0]._id
                
                 response.json({state:true,mensaje:"Bienvenido "+ respuesta[0].nombre })
            }

        }
    })
}

usuariosController.Activar = function(request, response){
    var post = {
        email:request.body.email,
        codigo:request.body.codigo
    }
   if(post.email == undefined || post.email == null || post.email.trim() == ""){
        response.json({state:false, mensaje:"El campo email es Obligatorio"})
        return false
    }
       if(post.codigo == undefined || post.codigo == null || post.codigo.trim() == ""){
        response.json({state:false, mensaje:"El campo codigo es Obligatorio"})
        return false
    }

    usuariosModel.Activar(post, function(respuesta){
        if(respuesta == null){
            response.json({state:false, mensaje:"El codigo de activacion es invalido"})
        }
        else{
            response.json({state:true, mensaje:"Cuenta activada correctamente"})
        }
        
    })
}

usuariosController.SolicitudRecuperarPass = function(request, response){
    var post = {
        email: request.body.email
    }

    if(post.email == undefined || post.email == null || post.email.trim() == ""){
        response.json({state:false, mensaje:"El campo email es Obligatorio"})
        return false
    }

    post.codigo = "R-" + Math.floor(Math.random() * (9999 - 1000) + 1000);

    usuariosModel.SolicitudRecuperarPass(post, function(respuesta){

        const transporter = nodemailer.createTransport({
                        host:config.email.host,
                        port:config.email.port,
                        secure:false,
                        requireTLS:true,
                        auth:{
                            user:config.email.user,
                            pass:config.email.pass
                        }
                    })

                    var mailOptions = {
                        from:config.email.user,
                        to:post.email,
                        subject:"Con este codigo recupera tu contraseña: " + post.codigo,
                        html: `
                            <div style="font-family: Arial, sans-serif; background-color: #f2f2f2; padding: 20px; text-align: center;">

                                <div style="background-color: #ffffff; padding: 30px; border-radius: 10px; max-width: 400px; margin: auto; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
                                    <h2 style="color: #333333; margin-bottom: 20px;">Bienvenido a <span style="color: #4CAF50;">${config.name}</span></h2>
                                    <p style="font-size: 16px; margin-bottom: 20px;">Tu código de recuperación es:</p>

                                    <input type="text" value="${post.codigo}" readonly 
                                    style="padding: 10px; font-size: 18px; text-align: center; border: 1px solid #cccccc; border-radius: 5px; margin-bottom: 20px; width: 100%;">

                                </div>

                            </div>
                            `
                    }

                    transporter.sendMail(mailOptions, (error, info) => {
                        if(error){
                            console.log(error)
                            response.json({state:false, mensaje:"Error enviando el correo"})
                        }
                        else{
                            console.log(info)
                            response.json({state:true, mensaje:"Hemos enviado el codigo de recuperación a su bandeja"})
                        }
                    })

    })

}

usuariosController.RecuperarPass = function(request, response){
    var post = {
        email: request.body.email,
        codigorec: request.body.codigorec,
        password: request.body.password
    }

    if(post.email == undefined || post.email == null || post.email.trim() == ""){
        response.json({state:false, mensaje:"El campo email es Obligatorio"})
        return false
    }

    if(post.codigorec == undefined || post.codigorec == null || post.codigorec.trim() == ""){
        response.json({state:false, mensaje:"El campo codigorec es Obligatorio"})
        return false
    }

    if(post.password == undefined || post.password == null || post.password.trim() == ""){
        response.json({state:false, mensaje:"El campo password es Obligatorio"})
        return false
    }

    post.password = sha256(post.password + config.clavesecreta)

    usuariosModel.RecuperarPass(post, function(respuesta){
        if(respuesta == null){
            response.json({state:false, mensaje:"El Codigo de Recuperación o el Emial es Invalido"})
            return false
        }
        else {
            response.json({state:true, mensaje:"Se cambio la contraseña"})
            return true
        }
    })
}

usuariosController.ActualizarPass = function(request,response){
    var post = {
        password: request.body.password,
        _id: request.session._id
    }

    if(post.password == undefined || post.password == null || post.password == ''){
        response.json({state:false, mensaje:"El campo password es obligatorio"})
        return false
    }

    if(post._id == undefined || post._id == null || post._id == ''){
        response.json({state:false, mensaje:"Debe Iniciar Sesion Para Cambiar El Password"})
        return false
    }

    post.password = sha256(post.password + config.clavesecreta)

    usuariosModel.ActualizarPass(post,function(respuesta){
        // request.session.destroy()
        response.json({state:true, mensaje:"Su contraseña se ha actualizado"})
    })
}

module.exports.usuariosController = usuariosController