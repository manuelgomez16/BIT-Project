import { Component } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { FooterComponent } from '../footer/footer.component';
import { FormsModule } from '@angular/forms';
import { PeticionService } from '../../servicios/peticion.service';
declare var Swal:any

@Component({
  selector: 'app-registro',
  imports: [SidebarComponent,FooterComponent,FormsModule],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent {

  
  constructor(public peticion:PeticionService){}

    nombre:string = ""
    email:string = ""
    password:string = ""
    respuestaapi:any = {}

    registrar(){
  
   let post = {
    host:this.peticion.urlreal,
    path:"/usuarios/Registrar",
    payload:{
    nombre:this.nombre,
    email:this.email,
    password:this.password
    }
   }

   this.peticion.post(post.host + post.path,post.payload).then((res:any) => {
    console.log(res)
    this.respuestaapi = res
    if(res.state == false){
      Swal.fire({
      title: "Ouch",
      text: res.mensaje,
      icon: "error"
      });
     }
     else{
        Swal.fire({
      title: "Que bien",
      text: res.mensaje,
      icon: "success"
      });
     }
   })


  }

  
}
