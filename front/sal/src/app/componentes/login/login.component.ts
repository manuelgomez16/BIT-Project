import { Component } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { FooterComponent } from '../footer/footer.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PeticionService } from '../../servicios/peticion.service';
import { ActivatedRoute, Route, Router, Routes } from '@angular/router';

declare var Swal:any

@Component({
  selector: 'app-login',
  imports: [SidebarComponent,FooterComponent, CommonModule , FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})


export class LoginComponent  {

constructor(private actroute:ActivatedRoute,private peticion:PeticionService, private routes : Router){}


email:string = ""
password:string = ""
respuestaapi:any = {}

iniciar(){
let post = {
  host:this.peticion.urlreal,
  path:"/usuarios/Login",
  payload:{
    email:this.email,
    password:this.password
  }

}
  
this.peticion.post(post.host + post.path,post.payload).then((res:any) => {
  this.respuestaapi = res
  
       Swal.fire({
          title: res.state == true? "Que bien":"Ouch",
          text: res.mensaje,
          icon: res.state == true? "success":"error",
          });
      
        if(res.state == true){
        this.routes.navigate(["/dashboard"])
        }

})


}
}

