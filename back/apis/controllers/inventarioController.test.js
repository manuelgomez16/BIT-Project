const mongoose = require("mongoose")
global.config = require("../../config.js").config
const inventarioController = require("./inventarioController").inventarioController
global.sha256 = require("sha256")
const inventarioModel = require("../models/inventariomodel.js").inventarioModel
global.nodemailer = require("nodemailer")

describe("POST: /inventario/Guardar", () => {
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

    test("Al guardar, el campo codigo es obligatorio", (done) => {
        request.body.codigo = ""
        request.body.nombre = ""
        request.body.precio = ""
        request.body.cantidad = ""
        
        inventarioController.Guardar(request, response)

        expect(response.json).toHaveBeenCalledWith({state:false,mensaje:"el campo codigo es obligatorio"})
        done()

    })

    test("Al guardar, el campo nombre es obligatorio", (done) => {
        request.body.codigo = "1234"
        request.body.nombre = ""
        request.body.precio = ""
        request.body.cantidad = ""
        
        inventarioController.Guardar(request, response)

        expect(response.json).toHaveBeenCalledWith({state:false,mensaje:"el campo nombre es obligatorio"})
        done()

    })

    test("Al guardar, el campo nombre es obligatorio", (done) => {
        request.body.codigo = "1234"
        request.body.nombre = "PC"
        request.body.precio = ""
        request.body.cantidad = ""
        
        inventarioController.Guardar(request, response)

        expect(response.json).toHaveBeenCalledWith({state:false,mensaje:"el campo precio es obligatorio"})
        done()

    })

    test("Al guardar, el campo nombre es obligatorio", (done) => {
        request.body.codigo = "1234"
        request.body.nombre = "PC"
        request.body.precio = "10000"
        request.body.cantidad = ""
        
        inventarioController.Guardar(request, response)

        expect(response.json).toHaveBeenCalledWith({state:false,mensaje:"el campo cantidad es obligatorio"})
        done()

    })

    test("Al guardar, debe registrar un producto", (done) => {
        request.body.codigo = "1234"
        request.body.nombre = "PC"
        request.body.precio = "10000"
        request.body.cantidad = "1"
        

        inventarioModel.Mymodel.deleteMany({codigo:"1234"}).then((respuesta) => {

            inventarioController.Guardar(request, response)

            setTimeout(() => {
                expect(response.json).toHaveBeenCalledWith({state:true,mensaje:"item almacenado"})
                done()
            }, 70);

        })

    })

    test("Al guardar, debe reportar que el producto ya existe", (done) => {
        request.body.codigo = "1234"
        request.body.nombre = "PC"
        request.body.precio = "10000"
        request.body.cantidad = "1"

        inventarioController.Guardar(request, response)

        setTimeout(() => {
            expect(response.json).toHaveBeenCalledWith({state:false,mensaje:"el codigo ya existe intente con otro"})
            done()
        }, 70);

    })

    test("Borrado de Colleccion", (done) => {        

        inventarioModel.Mymodel.deleteMany({codigo:"1234"}).then((respuesta) => {

                expect(true).toBe(true)
                done()

        })

    })

})

describe("GET: /inventario/CargarTodas", () => {
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

    test("Al guardar, debe registrar un producto", (done) => {
        request.body.codigo = "1234"
        request.body.nombre = "PC"
        request.body.precio = "10000"
        request.body.cantidad = "1"
        

        inventarioModel.Mymodel.deleteMany({codigo:"1234"}).then((respuesta) => {

            inventarioController.Guardar(request, response)

            setTimeout(() => {
                expect(response.json).toHaveBeenCalledWith({state:true,mensaje:"item almacenado"})
                done()
            }, 70);

        })

    })

    test("Debe existir almenos un producto creado", (done) => {

        inventarioController.CargarTodas(request, response)
        setTimeout(() => {

                expect(response.json.mock.calls[0][0].length).toBeGreaterThan(0)
                done()
        }, 60);
    })

    test("Borrado de Colleccion", (done) => {        

        inventarioModel.Mymodel.deleteMany({codigo:"1234"}).then((respuesta) => {

                expect(true).toBe(true)
                done()

        })

    })

})

describe("GET: /inventario/Cargarid", () => {
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
        request = { body:{}, session:{}, params:{}}
        response = {
            json:jest.fn(),
            status:jest.fn().mockReturnThis()
        }
    })

    test("Al guardar, debe registrar un producto", (done) => {
        request.body.codigo = "1234"
        request.body.nombre = "PC"
        request.body.precio = "10000"
        request.body.cantidad = "1"

            inventarioController.Guardar(request, response)

            setTimeout(() => {
                expect(response.json).toHaveBeenCalledWith({state:true,mensaje:"item almacenado"})
                done()
            }, 70);

    })

    test("Al cargar, el campo Id es obligatorio", (done) => {
        inventarioController.Cargarid(request, response)
        setTimeout(() => {
            expect(response.json).toHaveBeenCalledWith({state:false,mensaje:"el campo _id es obligatorio"})
            done()
        }, 60);
    })

    test("Al cargar, se carga el elemento", (done) => {
        inventarioModel.Mymodel.find({codigo:"1234"}).then((respuesta) => {
            request.params._id = respuesta[0]._id.toString()
            inventarioController.Cargarid(request, response)
            setTimeout(() => {
                expect(response.json.mock.calls[0][0][0]._id.toString()).toBe(respuesta[0]._id.toString())
                done()
            }, 60);
        })
    })

    test("Borrado de Colleccion", (done) => {        
        inventarioModel.Mymodel.deleteMany({codigo:"1234"}).then((respuesta) => {
                expect(true).toBe(true)
                done()
        })
    })

})

describe("POST: /inventario/Actualizar", () => {
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

    test("Al actualizar, el campo id es obligatorio", (done) => {

        request.body._id = ""
        request.body.precio = ""
        request.body.cantidad = ""
        
        inventarioController.Actualizar(request, response)

        expect(response.json).toHaveBeenCalledWith({state:false,mensaje:"el campo _id es obligatorio"})
        done()

    })

    test("Al actualizar, el campo precio es obligatorio", (done) => {

        request.body._id = "1234"
        request.body.precio = ""
        request.body.cantidad = ""
        
        inventarioController.Actualizar(request, response)

        expect(response.json).toHaveBeenCalledWith({state:false,mensaje:"el campo precio es obligatorio"})
        done()

    })

    test("Al actualizar, el campo cantidad es obligatorio", (done) => {

        request.body._id = "1234"
        request.body.precio = "10000"
        request.body.cantidad = ""
        
        inventarioController.Actualizar(request, response)

        expect(response.json).toHaveBeenCalledWith({state:false,mensaje:"el campo cantidad es obligatorio"})
        done()

    })

    test("Al guardar, debe registrar un producto", (done) => {
        request.body.codigo = "1234"
        request.body.nombre = "PC"
        request.body.precio = "10000"
        request.body.cantidad = "1"

            inventarioController.Guardar(request, response)

            setTimeout(() => {
                expect(response.json).toHaveBeenCalledWith({state:true,mensaje:"item almacenado"})
                done()
            }, 70);

    })

    test("Al actualizar, se actualizo la contraseña", (done) => {

        inventarioModel.Mymodel.find({codigo:"1234"}).then((respuesta) => {
        request.body._id = respuesta[0]._id.toString()
        request.body.precio = "20000"
        request.body.cantidad = "2"

            inventarioController.Actualizar(request, response)

            setTimeout(() => {
                expect(response.json).toHaveBeenCalledWith({state:true,mensaje:"se ha Actualizado el elemento"})
                done()
            }, 70)
        })
    })

    test("Borrado de Colleccion", (done) => {        
        inventarioModel.Mymodel.deleteMany({codigo:"1234"}).then((respuesta) => {
                expect(true).toBe(true)
                done()
        })
    })

})

describe("DELETE: /inventario/Eliminar", () => {
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

        inventarioController.Eliminar(request, response)

        expect(response.json).toHaveBeenCalledWith({state:false,mensaje:"el campo _id es obligatorio"})
        done()

    })

    test("Al guardar, debe registrar un producto", (done) => {
        request.body.codigo = "1234"
        request.body.nombre = "PC"
        request.body.precio = "10000"
        request.body.cantidad = "1"

            inventarioController.Guardar(request, response)

            setTimeout(() => {
                expect(response.json).toHaveBeenCalledWith({state:true,mensaje:"item almacenado"})
                done()
            }, 70);

    })

    test("Con un Id invalido debe reportarme que no existe", (done) => {
        request.body._id = "68ba2aca55ca86fb5437c1cb"

        inventarioController.Eliminar(request, response)
        setTimeout(() => {
            expect(response.json).toHaveBeenCalledWith({state:false,mensaje:"el id que intenta actualizar no existe"})
            done()
        }, 200);

    })

    test("Debe Elimminar por medio del Id", (done) => {        
        inventarioModel.Mymodel.find({codigo:"1234"}).then((respuesta) => {
                request.body._id = respuesta[0]._id.toString()
                
                inventarioController.Eliminar(request, response)
                setTimeout(() => {

                    expect(true).toBe(true)
                    done()
                }, 60);

        })

    })

    test("Verificar que no existen datos y fue eliminado", (done) => {        
        inventarioModel.Mymodel.find({codigo:"1234"}).then((respuesta) => {
                
                inventarioController.Eliminar(request, response)
                setTimeout(() => {
                    
                    expect(respuesta.length).toBe(0)
                    done()
                }, 60);

        })

    })

})