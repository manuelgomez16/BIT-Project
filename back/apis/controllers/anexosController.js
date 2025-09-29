var multer = require("multer")

var anexosController = {}

anexosController.AnexosProductos = function(request, response){

    var nombre = request.params.nombre

    var upload = multer({
        storage: multer.diskStorage({
            destination:(req, file, cb) => {
                cb(null, appRoot + '/imagenes/')
            },
            filename:(req, file, cb) => {
                cb(null,nombre + '.png')
            }
        }),
        fileFilter:(req, file, cb) => {
            var ext = path.extname(file.originalname)
            var extensiones = ['.png', '.jpg', '.tif', '.jpeg', '.jfif',]
            if(extensiones.indexOf(ext) == -1){
                cb('Solo Aceptamos formatos de imagen ' + '[' + extensiones.join("],[") + ']', null)
            }
            else{
                cb(null, true)
            }

            // if(ext !== '.png' && ext !== '.jpg' && ext !== '.tif' && ext !== '.jpeg' && ext !== '.jfif'){
            //     cb('Solo Aceptamos formatos de imagen', null)
            // }
        }

    }).single("file")

    upload(request, response, function(err){
        if(err){
            console.log(err)
            response.json({state:false, error:err})
        }
        else{
            response.json({state:true, mensaje:"Archivo Cargado"})
        }
    })
}

module.exports.anexosController = anexosController