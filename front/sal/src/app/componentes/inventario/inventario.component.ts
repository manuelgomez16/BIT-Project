import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { CommonModule } from '@angular/common';
import { PeticionService } from '../../servicios/peticion.service';
import { FormsModule } from '@angular/forms';
declare var $:any
declare var  Swal:any


@Component({
  selector: 'app-inventario',
  imports: [HeaderComponent,CommonModule,FormsModule],
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.css']
})
export class InventarioComponent implements OnInit {

constructor( public peticion:PeticionService){}
datos:any[] =[] 
nombre:string =""
codigo:string =""
descripcion:string=""
cantidad:string="0"
precio:string= ""
IdSeleccionado: string = ""
respuestaapi:any = {}

  ngOnInit(): void {
    this.CargarTodas()
  }
  CargarTodas(){
    let post = {
    host:this.peticion.urlreal,
    path:"/inventario/CargarTodas",
    payload:{}
   }

   this.peticion.get(post.host + post.path).then((res:any) => {
    this.datos = res
   })
  }
  Nuevo(){
  this.limpiar()
  this.IdSeleccionado = "" 
  $('#exampleModal').modal('show')
  }
  limpiar(){
    this.codigo=""
    this.nombre=""
    this.descripcion=""
    this.cantidad="0"
    this.precio=""
  }
  Guardar(){
    let post = {
    host:this.peticion.urlreal,
    path:"/inventario/Guardar",
    payload:{
    nombre:this.nombre,
    codigo:this.codigo,
    descripcion:this.descripcion,
    cantidad:this.cantidad,
    precio:this.precio
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
  Cargarid(identificador:string){

  this.IdSeleccionado = identificador

   let post = {
    host:this.peticion.urlreal,
    path:"/inventario/Cargarid/" + identificador,
    payload:{
      _id:identificador
    }
   }

   this.peticion.get(post.host + post.path).then((res:any) => {
    this.respuestaapi = res 
    
    this.codigo = res[0].codigo
    this.nombre = res[0].nombre
    this.descripcion = res[0].descripcion
    this.precio = res[0].precio
    this.cantidad = res[0].cantidad
     $('#exampleModal').modal('show')


   })
}
  Actualizar(){
    let post = {
    host:this.peticion.urlreal,
    path:"/inventario/Actualizar",
    payload:{
    cantidad:this.cantidad,
    descripcion:this.descripcion,
    precio:this.precio,
    _id:this.IdSeleccionado
    }
   }

   this.peticion.put(post.host + post.path,post.payload).then((res:any) => {
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

  Eliminar(){
   let post = {
    host:this.peticion.urlreal,
    path:"/inventario/Eliminar",
    payload:{
    _id:this.IdSeleccionado
    }
}
    this.peticion.Delete(post.host + post.path,post.payload).then((res:any) => {
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

}
