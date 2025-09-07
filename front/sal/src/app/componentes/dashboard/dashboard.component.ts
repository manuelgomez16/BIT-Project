import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { PeticionService } from '../../servicios/peticion.service';
import { Router } from '@angular/router';

declare var Swal: any;

import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  imports: [HeaderComponent,CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  standalone: true
})
export class DashboardComponent implements OnInit {
  nombre: string = 'cargando...';
  rol: string = 'cargando...';

  constructor(private peticion: PeticionService, private router: Router) {}

  ngOnInit(): void {
    this.cargarEstado();
  }

  cargarEstado() {
    const post = {
      host: this.peticion.urlreal,
      path: '/usuarios/estado',
      payload: {}
    };

    this.peticion.post(post.host + post.path, post.payload).then((res: any) => {
      console.log(res);
      this.nombre = res.nombre;
      this.rol = res.rol;

      if (!this.nombre) {
        this.router.navigate(['/login']);
      }
    });
  }

  logout() {
    const post = {
      host: this.peticion.urlreal,
      path: '/usuarios/logout',
      payload: {}
    };

    this.peticion.post(post.host + post.path, post.payload).then((res: any) => {
      console.log(res);
      Swal.fire({
        title: res.state === true ? 'Que bien' : 'Ouch',
        text: res.mensaje,
        icon: res.state === true ? 'success' : 'error',
      });
      this.router.navigate(['/login']);
    });
  }
}