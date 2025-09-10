import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PeticionService } from '../../servicios/peticion.service';
import { FooterComponent } from '../footer/footer.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../sidebar/sidebar.component';
declare var Swal:any



@Component({
  selector: 'app-activar',
  imports: [SidebarComponent,FooterComponent,FormsModule, CommonModule],
  templateUrl: './activar.component.html',
  styleUrl: './activar.component.css'
})
export class ActivarComponent {


constructor(private actroute: ActivatedRoute,private peticion: PeticionService , private routes : Router){}
email:string = ""
codigo:string = ""
respuestaapi:any = {}


ngOnInit(): void {
  this.email = this.actroute.snapshot.params["email"]
  this.codigo = this.actroute.snapshot.params["codigo"]
}




Activar(){
  let post = {
    host:this.peticion.urlreal,
    path:"/usuarios/Activar",
    payload:{
      email:this.email,
      codigo:this.codigo
    }
  
  }
    console.log(post)
  this.peticion.post(post.host + post.path,post.payload).then((res:any) => {
    this.respuestaapi = res

       Swal.fire({
          title: res.state == true? "Que bien":"Ouch",
          text: res.mensaje,
          icon: res.state == true? "success":"error",
          });
      
        if(res.state == true){
        this.routes.navigate(["/login"])
        }

  })
  
  
}

}
