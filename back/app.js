var express = require('express')//tralelero tralala
global.app = express()
const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
const mongoose = require("mongoose")
global.config = require("./config.js").config
global.sha256 = require("sha256")
global.nodemailer = require("nodemailer")
const cors = require("cors") 
const { config } = require('./config.js')
const session = require("express-session")
const mongostore = require("connect-mongo")




app.use((req, res, next) => {
  const origin = req.headers.origin;

  if (config.listablanca.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Access-Control-Allow-Credentials', 'true');
  }

  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

  // Opcional: responder a preflight directamente
  if (req.method === 'OPTIONS') {
    return res.sendStatus(204);
  }

  next();
});

mongoose.connect("mongodb://localhost:27017/" + config.bd).then((respuesta) =>{
    console.log("Conexion correcta a Mongo")
}).catch((error) => {
    console.log(error)
})


app.use(session({
    secret:config.clavesecreta,
    resave:true,
    saveUninitialized:true,
    store:mongostore.create({
        client:mongoose.connection.getClient(),
    dbname:config.bd + "Sesione",
    collectionName:"sessions",
    ttl:config.expiracion
}),
    cookie:{
        maxAge:config.expiracion, httpOnly:true
    },
    name:"cookieapp",
    rolling:true
}))










require("./rutas.js")



app.use(cors({
    origin: function(origin, callback){
        console.log(origin)
        if(!origin) return callback(null, true)
            if(config.listablanca.indexOf(origin) === -1){
                return callback("error de cors no hay permisos",false)
            }
            else{
                return callback(null,true)
            }
    }
}))

app.listen(config.puerto, function(){
    console.log("Servidor funcionando por el puerto" + config.puerto)
})


