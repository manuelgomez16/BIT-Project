const mongoose = require("mongoose")
global.config = require("../../config.js").config
const usuariosController = require("./usuariosController").usuariosController
global.sha256 = require("sha256")
const usuariosModel = require("../models/usuariosmodel.js").usuariosModel
global.nodemailer = require("nodemailer")

describe("POST: /usuarios/Guardar", () => {
    let request
    let response

    beforeAll((done) => {
        //conexion a la bd
        mongoose.connect("mongodb://localhost:27017/" + config.bdtest).then((respuesta) =>{
            // console.log("Conexion correcta a Mongo")
            done()
        }).catch((error) => {
            console.log(error)
        })

    })

    beforeEach(() => {
        request = { body:{}}
        response = {
            json:jest.fn(),
            status:jest.fn().mockReturnThis()
        }
    })

    test("Al guardar, el campo nombre es obligatorio", (done) => {
        request.body.nombre = ""
        request.body.email = ""
        request.body.password = ""
        
        usuariosController.Guardar(request, response)

        expect(response.json).toHaveBeenCalledWith({state:false, mensaje:"El campo nombre es obligatorio"})
        done()

    })

    test("Al guardar, el campo email es obligatorio", (done) => {
        request.body.nombre = "Manuel"
        request.body.email = ""
        request.body.password = ""
        
        usuariosController.Guardar(request, response)

        expect(response.json).toHaveBeenCalledWith({state:false, mensaje:"El campo email es obligatorio"})
        done()

    })

    test("Al guardar, el campo password es obligatorio", (done) => {
        request.body.nombre = "Manuel"
        request.body.email = "correotest@gmail.com"
        request.body.password = ""
        
        usuariosController.Guardar(request, response)

        expect(response.json).toHaveBeenCalledWith({state:false, mensaje:"El campo password es obligatorio"})
        done()

    })

    test("Al guardar, el campo rol es obligatorio", (done) => {
        request.body.nombre = "Manuel"
        request.body.email = "correotest@gmail.com"
        request.body.password = "1234"
        
        usuariosController.Guardar(request, response)

        expect(response.json).toHaveBeenCalledWith({state:false, mensaje:"El campo rol es obligatorio"})
        done()

    })

    test("Al guardar, debe registrar el usuario", (done) => {
        request.body.nombre = "Manuel"
        request.body.email = "correotest@gmail.com"
        request.body.password = "1234"
        request.body.rol = "Administrador"
        

        usuariosModel.Mymodel.deleteMany({email:"correotest@gmail.com"}).then((respuesta) => {

            usuariosController.Guardar(request, response)

            setTimeout(() => {
                expect(response.json).toHaveBeenCalledWith({state:true, mensaje:"Item Almacenado",data:[] })
                done()
            }, 70);

        })

    })

    test("Al guardar, debe reportar que el usuario ya existe", (done) => {
        request.body.nombre = "Manuel"
        request.body.email = "correotest@gmail.com"
        request.body.password = "1234"
        request.body.rol = "Administrador"

        usuariosController.Guardar(request, response)

        setTimeout(() => {
            expect(response.json).toHaveBeenCalledWith({state:false, mensaje:"La email Ya Existe Intente con otro" })
            done()
        }, 70);

    })

    test("Borrado de Colleccion", (done) => {        

        usuariosModel.Mymodel.deleteMany({email:"correotest@gmail.com"}).then((respuesta) => {

                expect(true).toBe(true)
                done()

        })

    })

})

describe("GET: /usuarios/CargarTodas", () => {
    let request
    let response

    beforeAll((done) => {
        //conexion a la bd
        mongoose.connect("mongodb://localhost:27017/" + config.bdtest).then((respuesta) =>{
            // console.log("Conexion correcta a Mongo")
            done()
        }).catch((error) => {
            console.log(error)
        })

    })

    beforeEach(() => {
        request = { body:{}}
        response = {
            json:jest.fn(),
            status:jest.fn().mockReturnThis()
        }
    })

    test("Al registrar, debe registrar el usuario", (done) => {
        request.body.nombre = "Manuel"
        request.body.email = "correotest@gmail.com"
        request.body.password = "1234"
        request.body.rol = "Administrador"
        

        usuariosModel.Mymodel.deleteMany({email:"correotest@gmail.com"}).then((respuesta) => {

            usuariosController.Guardar(request, response)

            setTimeout(() => {
                expect(response.json).toHaveBeenCalledWith({state:true, mensaje:"Item Almacenado",data:[] })
                done()
            }, 70);

        })

    })

    test("Debe existir almenos un usuario creado", (done) => {

        usuariosController.CargarTodas(request, response)
        setTimeout(() => {

                expect(response.json.mock.calls[0][0].datos.datos.length).toBeGreaterThan(0)
                done()
        }, 60);
    })

    test("Borrado de Colleccion", (done) => {        

        usuariosModel.Mymodel.deleteMany({email:"correotest@gmail.com"}).then((respuesta) => {

                expect(true).toBe(true)
                done()

        })

    })

})

describe("DELETE: /usuarios/Eliminar", () => {
    let request
    let response

    beforeAll((done) => {
        //conexion a la bd
        mongoose.connect("mongodb://localhost:27017/" + config.bdtest).then((respuesta) =>{
            // console.log("Conexion correcta a Mongo")
            done()
        }).catch((error) => {
            console.log(error)
        })

    })

    beforeEach(() => {
        request = { body:{}}
        response = {
            json:jest.fn(),
            status:jest.fn().mockReturnThis()
        }
    })

    test("Al Eliminar, el campo Id es obligatorio", (done) => {
        request.body._id = ""

        usuariosController.Eliminar(request, response)

        expect(response.json).toHaveBeenCalledWith({state:false, mensaje:"El campo _id es obligatorio"})
        done()

    })

    test("Al guardar, debe registrar el usuario", (done) => {
        request.body.nombre = "Manuel"
        request.body.email = "correotest@gmail.com"
        request.body.password = "1234"
        request.body.rol = "Administrador"
        

        usuariosModel.Mymodel.deleteMany({email:"correotest@gmail.com"}).then((respuesta) => {

            usuariosController.Guardar(request, response)

            setTimeout(() => {
                expect(response.json).toHaveBeenCalledWith({state:true, mensaje:"Item Almacenado",data:[] })
                done()
            }, 70);

        })

    })

    test("Con un Id invalido debe reportarme que no existe", (done) => {
        request.body._id = "68ba2aca55ca86fb5437c1cb"

        usuariosController.Eliminar(request, response)
        setTimeout(() => {
            expect(response.json).toHaveBeenCalledWith({state:false, mensaje:"La email no existe en la bd"})
            done()
        }, 200);

    })

    test("Debe Elimminar por medio del Id", (done) => {        
        usuariosModel.Mymodel.find({email:"correotest@gmail.com"}).then((respuesta) => {
                request.body._id = respuesta[0]._id.toString()
                
                usuariosController.Eliminar(request, response)
                setTimeout(() => {

                    expect(true).toBe(true)
                    done()
                }, 60);

        })

    })

    test("Verificar que no existen datos y fue eliminado", (done) => {        
        usuariosModel.Mymodel.find({email:"correotest@gmail.com"}).then((respuesta) => {
                
                usuariosController.Eliminar(request, response)
                setTimeout(() => {
                    
                    expect(respuesta.length).toBe(0)
                    done()
                }, 60);

        })

    })

})

describe("POST: /usuarios/Registrar", () => {
    let request
    let response

    beforeAll((done) => {
        //conexion a la bd
        mongoose.connect("mongodb://localhost:27017/" + config.bdtest).then((respuesta) =>{
            // console.log("Conexion correcta a Mongo")
            done()
        }).catch((error) => {
            console.log(error)
        })

    })

    beforeEach(() => {
        request = { body:{}}
        response = {
            json:jest.fn(),
            status:jest.fn().mockReturnThis()
        }
    })

    test("Al registrar, el campo nombre es obligatorio", (done) => {
        request.body.nombre = ""
        request.body.email = ""
        request.body.password = ""
        
        usuariosController.Registrar(request, response)

        expect(response.json).toHaveBeenCalledWith({state:false, mensaje:"El campo nombre es Obligatorio"})
        done()

    })

    test("Al registrar, el campo email es obligatorio", (done) => {
        request.body.nombre = "Manuel"
        request.body.email = ""
        request.body.password = ""
        
        usuariosController.Registrar(request, response)

        expect(response.json).toHaveBeenCalledWith({state:false, mensaje:"El campo email es Obligatorio"})
        done()

    })

    test("Al registrar, el campo password es obligatorio", (done) => {
        request.body.nombre = "Manuel"
        request.body.email = "mnuelg27@gmail.com"
        request.body.password = ""
        
        usuariosController.Registrar(request, response)

        expect(response.json).toHaveBeenCalledWith({state:false, mensaje:"El campo password es Obligatorio"})
        done()

    })

    test("Al registrar, debe registrar el usuario", (done) => {
        request.body.nombre = "Manuel"
        request.body.email = "mnuelg27@gmail.com"
        request.body.password = "1234"        

        usuariosModel.Mymodel.deleteMany({email:"mnuelg27@gmail.com"}).then((respuesta) => {

            usuariosController.Registrar(request, response)

            setTimeout(() => {
                expect(response.json).toHaveBeenCalledWith({state:true, mensaje:"Usuario Registrado Correctamente verifique su bandeja"})
                done()
            }, 2000);

        })

    })

    test("Borrado de Colleccion", (done) => {        

        usuariosModel.Mymodel.deleteMany({email:"mnuelg27@gmail.com"}).then((respuesta) => {

                expect(true).toBe(true)
                done()

        })

    })

})

describe("POST: /usuarios/Activar", () => {
    let request
    let response

    beforeAll((done) => {
        //conexion a la bd
        mongoose.connect("mongodb://localhost:27017/" + config.bdtest).then((respuesta) =>{
            // console.log("Conexion correcta a Mongo")
            done()
        }).catch((error) => {
            console.log(error)
        })

    })

    beforeEach(() => {
        request = { body:{}}
        response = {
            json:jest.fn(),
            status:jest.fn().mockReturnThis()
        }
    })

    test("Al activar, el campo email es obligatorio", (done) => {

        request.body.email = ""
        request.body.codigo = ""
        
        usuariosController.Activar(request, response)

        expect(response.json).toHaveBeenCalledWith({state:false, mensaje:"El campo email es Obligatorio"})
        done()

    })

    test("Al activar, el campo codigo es obligatorio", (done) => {

        request.body.email = "mnuelg27@gmail.com"
        request.body.codigo = ""        

        usuariosController.Activar(request, response)
        expect(response.json).toHaveBeenCalledWith({state:false, mensaje:"El campo codigo es Obligatorio"})
        done()

    })
    
    test("Al registrar, debe registrar el usuario", (done) => {
        request.body.nombre = "Manuel"
        request.body.email = "mnuelg27@gmail.com"
        request.body.password = "1234"        

        usuariosModel.Mymodel.deleteMany({email:"mnuelg27@gmail.com"}).then((respuesta) => {

            usuariosController.Registrar(request, response)

            setTimeout(() => {
                expect(response.json).toHaveBeenCalledWith({state:true, mensaje:"Usuario Registrado Correctamente verifique su bandeja"})
                done()
            }, 2000);

        })

    })

    test("Al activar, el codigo de activación es invalido", (done) => {
        request.body.email = "mnuelg27@gmail.com"
        request.body.codigo = "fake"        

            usuariosController.Activar(request, response)

            setTimeout(() => {
                expect(response.json).toHaveBeenCalledWith({state:false, mensaje:"El codigo de activacion es invalido"})
                done()
            }, 80);

    })

    test("Al activar, la cuenta queda activa", (done) => {

        request.body.email = "mnuelg27@gmail.com"
        usuariosModel.Mymodel.find({email:"mnuelg27@gmail.com"}).then((respuesta) => {
            request.body.codigo = respuesta[0].codigoact

            usuariosController.Activar(request, response)
            setTimeout(() => {

                expect(response.json).toHaveBeenCalledWith({state:true, mensaje:"Cuenta activada correctamente"})
                done()
            }, 80);
        })


    })

    test("Borrado de Colleccion", (done) => {        

        usuariosModel.Mymodel.deleteMany({email:"mnuelg27@gmail.com"}).then((respuesta) => {

                expect(true).toBe(true)
                done()

        })

    })

})

describe("POST: /usuarios/Login", () => {
    let request
    let response

    beforeAll((done) => {
        //conexion a la bd
        mongoose.connect("mongodb://localhost:27017/" + config.bdtest).then((respuesta) =>{
            // console.log("Conexion correcta a Mongo")
            done()
        }).catch((error) => {
            console.log(error)
        })

    })

    beforeEach(() => {
        request = { body:{}, session:{}}
        response = {
            json:jest.fn(),
            status:jest.fn().mockReturnThis()
        }
    })

    test("Al activar, el campo email es obligatorio", (done) => {

        request.body.email = ""
        request.body.password = ""
        
        usuariosController.Login(request, response)

        expect(response.json).toHaveBeenCalledWith({state:false, mensaje:"El campo email es Obligatorio"})
        done()

    })

    test("Al activar, el campo password es obligatorio", (done) => {

        request.body.email = "mnuelg27@gmail.com"
        request.body.password = ""
        
        usuariosController.Login(request, response)

        expect(response.json).toHaveBeenCalledWith({state:false, mensaje:"El campo password es Obligatorio"})
        done()

    })
    
    test("Al guardar, debe crear un usuario", (done) => {
        request.body.nombre = "Manuel"
        request.body.email = "mnuelg27@gmail.com"
        request.body.password = "1234"
        request.body.rol = "Administrador"

        usuariosModel.Mymodel.deleteMany({email:"mnuelg27@gmail.com"}).then((respuesta) => {

            usuariosController.Guardar(request, response)
            setTimeout(() => {

                expect(response.json).toHaveBeenCalledWith({state:true, mensaje:"Item Almacenado",data:[] })
                done()
            }, 70); 
        })

    })

    test("Al loguearse, debe iniciar sesion", (done) => {

        request.body.email = "mnuelg27@gmail.com"
        request.body.password = "1234"
        
        usuariosController.Login(request, response)
        setTimeout(() => {
            expect(response.json).toHaveBeenCalledWith({state:true,mensaje:"Bienvenido "+ "Manuel" })
            done()
        }, 70);

    })

})

describe("POST: /usuarios/ActualizarPass", () => {
    let request
    let response

    beforeAll((done) => {
        //conexion a la bd
        mongoose.connect("mongodb://localhost:27017/" + config.bdtest).then((respuesta) =>{
            // console.log("Conexion correcta a Mongo")
            done()
        }).catch((error) => {
            console.log(error)
        })

    })

    beforeEach(() => {
        request = { body:{}, session:{}}
        response = {
            json:jest.fn(),
            status:jest.fn().mockReturnThis()
        }
    })

    test("Al actualizar el password, el campo password es obligatorio", (done) => {

        request.body.password = ""
        request.session._id = ""
        
        usuariosController.ActualizarPass(request, response)

        expect(response.json).toHaveBeenCalledWith({state:false, mensaje:"El campo password es obligatorio"})
        done()

    })

    test("Al actualizar el password, debe iniciar sesion", (done) => {

        request.body.password = "1234"
        request.session._id = ""
        
        usuariosController.ActualizarPass(request, response)

        expect(response.json).toHaveBeenCalledWith({state:false, mensaje:"Debe Iniciar Sesion Para Cambiar El Password"})
        done()

    })

    test("Al actualizar el password, se actualizo la contraseña", (done) => {

        request.body.password = "1234"

        usuariosModel.Mymodel.find({email:"mnuelg27@gmail.com"}).then((respuesta) => {
            request.session._id = respuesta[0]._id.toString()

            usuariosController.ActualizarPass(request, response)
            setTimeout(() => {
                expect(response.json).toHaveBeenCalledWith({state:true, mensaje:"Su contraseña se ha actualizado"})
                done()
            }, 60);
            
        })

    })

})