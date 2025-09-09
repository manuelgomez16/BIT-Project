var config = {
    email:{}
}

config.name = "Backend"
config.dominio = "http://localhost:4200"

config.bd = "BackEnd"
config.bdtest = "BackEndTest"
config.puerto = 3000
config.clavesecreta = "0u9y87u90i0ui0u0ii0i08iuiuy0y87ghug97tvyuibog89f7tivyg879fygoft7yg87o8th76yti"
config.expiracion =60000*5


config.email.host = "smtp.gmail.com"
config.email.port = 587
config.email.user = "mnuelg27@gmail.com"
config.email.pass = "qnbfuaznukcmqlmz"


config.listablanca = [
    "http://localhost:4200",
    "http://localhost:3000",
    "http://192.168.80.26.3000",
    "http://localhost:9876"
]


module.exports.config = config 