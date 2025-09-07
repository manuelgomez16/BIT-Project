var security = {}

security.Soloadmin = function(request, response, next){
    var rol = request.session.rol
    if(rol == undefined || rol == null || rol == ""){
        response.json({state:false,menaje:"debe iniciar session"})
        return false
    }
    else{
        if(rol == "Administrador"){
       next()
        }
        else{
            response.json({state:false,menaje:"esta api esta solo paraa administradores"})
            return false
        }
    }
}


module.exports.security = security