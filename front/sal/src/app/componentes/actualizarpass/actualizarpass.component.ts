import { Component } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { PeticionService } from '../../servicios/peticion.service';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-actualizarpass',
  imports: [HeaderComponent, FormsModule],
  templateUrl: './actualizarpass.component.html',
  styleUrl: './actualizarpass.component.css'
})
export class ActualizarpassComponent {

  password:string = ""
  constructor(private peticion:PeticionService){

  }

  CambiarPass(){
      let post = {
        host:this.peticion.urlreal,
        path:"/usuarios/ActualizarPass",
        payload:{
          password:this.password
        }
      }
    
      this.peticion.post(post.host + post.path,post.payload).then((res:any) => {

        Swal.fire({
          title: res.state == true? "Que bien":"Ouch",
          text: res.mensaje,
          icon: res.state == true? "success":"error",
          });
      })
 }

}
