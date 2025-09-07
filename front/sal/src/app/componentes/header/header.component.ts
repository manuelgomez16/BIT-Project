import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { PeticionService } from '../../servicios/peticion.service';
import { NgIf } from '@angular/common';

declare var Swal:any

@Component({
  selector: 'app-header',
  imports: [RouterLink, NgIf],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {

  constructor(private peticion: PeticionService, private router: Router){}
 nombre:string ="cargando..."
 rol:string = "cargando..."
  ngOnInit(): void {
    this.cargarEstado()
  }

cargarEstado(){
  let post = {
  host:this.peticion.urlreal,
  path:"/usuarios/estado",
  payload:{
    
  }

}
  
this.peticion.post(post.host + post.path,post.payload).then((res:any) => {
  console.log(res)
  this.nombre = res.nombre
  this.rol = res.rol
  if (this.nombre == undefined || this.nombre == "") {
    this.router.navigate(["/login"])
  }
})

}
}
