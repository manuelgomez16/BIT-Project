import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PeticionService } from '../../servicios/peticion.service';
import { FormsModule } from '@angular/forms';
import { FooterComponent } from "../footer/footer.component";
import { SidebarComponent } from "../sidebar/sidebar.component";
declare var $:any
declare var  Swal:any


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, FooterComponent, SidebarComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent {

  ngOnInit(): void {
    this.CargarTodasCliente()
  }

  constructor(public peticion:PeticionService){}
  datos:any [] = []

  CargarTodasCliente(){
    let post = {
      host:this.peticion.urlreal,
      path:"/inventario/CargarTodas",
      payload:{
      }
    }

    this.peticion.get(post.host + post.path).then((res:any) => {
      this.datos = res
    })
  }

}