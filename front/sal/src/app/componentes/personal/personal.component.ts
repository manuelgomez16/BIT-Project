import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PeticionService } from '../../servicios/peticion.service';
declare var $:any
declare var  Swal:any
@Component({
  selector: 'app-personal',
  imports: [HeaderComponent,CommonModule,FormsModule],
  templateUrl: './personal.component.html',
  styleUrl: './personal.component.css'
})
export class PersonalComponent implements  OnInit{
  datos:any[] = []
  nombre:string = ""
  email:string = ""
  rol:string = "cliente"
  estado:string ="Activo"
  password:string = ""
  celular:string = ""
  IdSeleccionado: string = ""
  respuestaapi:any = {}

constructor (private peticion:PeticionService){}

ngOnInit(): void {
  this.CargarTodas()
}

Nuevo(){
  this.limpiar()
  $('#exampleModal').modal('show')
}

CargarTodas() {
  let url = this.peticion.urlreal + "/usuarios/CargarTodas";

  this.peticion.get(url).then((res: any) => { 
    console.log("Respuesta del backend:", res);
    this.datos = res.datos.datos;
    console.log("usuarios cargados:", this.datos)
  });
}

Guardar(){
   let post = {
    host:this.peticion.urlreal,
    path:"/usuarios/Guardar",
    payload:{
    nombre:this.nombre,
    email:this.email,
    rol:this.rol,
    estado:this.estado,
    password:this.password,
    celular:this.celular
    
    }
   }

   this.peticion.post(post.host + post.path,post.payload).then((res:any) => {
    this.respuestaapi = res    
    
        Swal.fire({
      title: res.state == true? "Que bien":"Ouch",
      text: res.mensaje,
      icon: res.state == true?"success":"error"
      });
      if(res.state == true){
        $('#exampleModal').modal('hide')
        this.CargarTodas()
      }
   })


}

limpiar(){
  this.email= ""
  this.rol= "cliente"
  this.estado= "Activo"
  this.celular= ""
  this.password = ""
  this.nombre= ""
  this.IdSeleccionado = ""
}

Cargarid(identificador:string){
  console.log(identificador)
  this.IdSeleccionado = identificador

   let post = {
    host:this.peticion.urlreal,
    path:"/usuarios/Cargarid/" + identificador,
    payload:{
      _id:identificador
    }
   }

   this.peticion.get(post.host + post.path).then((res:any) => {
    console.log(res)
    this.nombre = res.datos.datos[0].nombre
    this.email = res.datos.datos[0].email
    this.rol = res.datos.datos[0].rol
    this.estado = res.datos.datos[0].estado
    this.celular = res.datos.datos[0].celular
     $('#exampleModal').modal('show')


   })


}

Actualizar(){
 let post = {
    host:this.peticion.urlreal,
    path:"/usuarios/Actualizar",
    payload:{
    nombre:this.nombre,
    rol:this.rol,
    estado:this.estado,
    celular:this.celular,
    _id:this.IdSeleccionado
    }
   }

   this.peticion.put(post.host + post.path,post.payload).then((res:any) => {
    
    
        Swal.fire({
      title: res.state == true? "Que bien":"Ouch",
      text: res.mensaje,
      icon: res.state == true?"success":"error"
      });
      if(res.state == true){
        $('#exampleModal').modal('hide')
        this.CargarTodas()
      }
   })


}

Eliminar(){
   let post = {
    host:this.peticion.urlreal,
    path:"/usuarios/Eliminar",
    payload:{
    _id:this.IdSeleccionado
    }
}
this.peticion.Delete(post.host + post.path,post.payload).then((res:any) => {
          Swal.fire({
      title: res.state == true? "Que bien":"Ouch",
      text: res.mensaje,
      icon: res.state == true?"success":"error"
      });
      if(res.state == true){
        $('#exampleModal').modal('hide')
        this.CargarTodas()
      }
})
}

}