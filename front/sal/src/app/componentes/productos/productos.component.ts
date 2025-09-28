import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

import { FooterComponent } from '../footer/footer.component';
import { SidebarComponent } from '../sidebar/sidebar.component';

interface Producto {
  _id?: string;
  codigo: string;
  nombre: string;
  precio: number;
}

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [CommonModule, FooterComponent, SidebarComponent],
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  productos: Producto[] = [];
  nuevoProducto: Producto = { codigo: '', nombre: '', precio: 0 };
  apiUrl = '/api/productos'; // ajusta a tu ruta real en tu backend

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.cargarProductos();
  }

  cargarProductos(): void {
    this.http.get<Producto[]>(`${this.apiUrl}/listar`).subscribe({
      next: (data) => (this.productos = data),
      error: (err) => console.error('Error cargando productos', err)
    });
  }

  guardarProducto(): void {
    this.http.post(`${this.apiUrl}/guardar`, this.nuevoProducto).subscribe({
      next: () => {
        this.nuevoProducto = { codigo: '', nombre: '', precio: 0 };
        this.cargarProductos();
      },
      error: (err) => console.error('Error guardando producto', err)
    });
  }

  eliminarProducto(id: string): void {
    this.http.post(`${this.apiUrl}/eliminar`, { _id: id }).subscribe({
      next: () => this.cargarProductos(),
      error: (err) => console.error('Error eliminando producto', err)
    });
  }
}