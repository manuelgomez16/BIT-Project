import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventarioComponent } from './inventario.component';
import { HttpClientModule } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from '../../app.routes';
import Swal from 'sweetalert2';

describe('InventarioComponent', () => {
  let component: InventarioComponent;
  let fixture: ComponentFixture<InventarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InventarioComponent, HttpClientModule],
      providers:[provideRouter(routes)]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InventarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("Validar que el campo codigo sea obligatorio al crear un item en el inventario", async () => {
      fixture = TestBed.createComponent(InventarioComponent);
      component = fixture.componentInstance;
  
      component.codigo=""
      component.nombre=""
      component.precio=""
  
      component.Guardar()
  
      await fixture.whenStable();
      fixture.detectChanges();
  
        expect(component.respuestaapi.mensaje).toBe('el campo codigo es obligatorio')
        Swal.close();
    })

  it("Validar que el campo nombre sea obligatorio al crear un item en el inventario", async () => {
      fixture = TestBed.createComponent(InventarioComponent);
      component = fixture.componentInstance;
  
      component.codigo="666"
      component.nombre=""
      component.precio=""
  
      component.Guardar()
  
      await fixture.whenStable();
      fixture.detectChanges();

        expect(component.respuestaapi.mensaje).toBe('el campo nombre es obligatorio')
        Swal.close();
  })

  it("Validar que el campo precio sea obligatorio al crear un item en el inventario", async () => {
      fixture = TestBed.createComponent(InventarioComponent);
      component = fixture.componentInstance;
  
      component.codigo="666"
      component.nombre="PC"
      component.precio=""
  
      component.Guardar()
  
      await fixture.whenStable();
      fixture.detectChanges();

        expect(component.respuestaapi.mensaje).toBe('el campo precio es obligatorio')
        Swal.close();
  })

  it("Validar que el codigo no se repita al crear un item en el inventario", async () => {
      fixture = TestBed.createComponent(InventarioComponent);
      component = fixture.componentInstance;
  
      component.codigo="666"
      component.nombre="PC"
      component.precio="1000"
  
      component.Guardar()
  
      await fixture.whenStable();
      fixture.detectChanges();
      
        expect(component.respuestaapi.mensaje).toBe('el codigo ya existe intente con otro')
        Swal.close();
  })

  it("Validar que el item fue guardado correctamente en el inventario", async () => {
      fixture = TestBed.createComponent(InventarioComponent);
      component = fixture.componentInstance;

      var random = Math.floor(Math.random() * (999 * 999) + 100)
  
      component.codigo="R" + random
      component.nombre="PC"
      component.precio="1000"
  
      component.Guardar()
  
      await fixture.whenStable();
      fixture.detectChanges();

        expect(component.respuestaapi.mensaje).toBe('item almacenado')
        Swal.close();
  })

  let idtemporal = ""

  it("Validar que la funcion cargar todas sirve", async () => {
      fixture = TestBed.createComponent(InventarioComponent);
      component = fixture.componentInstance;
  
      component.CargarTodas()
  
      await fixture.whenStable();
      fixture.detectChanges();

        idtemporal = component.datos[component.datos.length - 1]._id
        expect(component.datos.length).toBeGreaterThan(0)
        Swal.close();
  })

  it("Validar que la funcion cargar id sirve", async () => {
      fixture = TestBed.createComponent(InventarioComponent);
      component = fixture.componentInstance;
  
      component.Cargarid(idtemporal)
  
      await fixture.whenStable();
      fixture.detectChanges();

        expect(component.IdSeleccionado).toBe(idtemporal)
        Swal.close();
  })

  it("Validar que el campo id es necesario al actualizar", async () => {
    fixture = TestBed.createComponent(InventarioComponent);
    component = fixture.componentInstance;

    component.IdSeleccionado=""
    component.precio=""
    component.cantidad=""

    component.Actualizar()
    
    await fixture.whenStable();
    fixture.detectChanges();

        expect(component.respuestaapi.mensaje).toBe('el campo _id es obligatorio')
        Swal.close();
  })

  it("Validar que el campo precio es necesario al actualizar", async () => {
      fixture = TestBed.createComponent(InventarioComponent);
      component = fixture.componentInstance;

      component.IdSeleccionado="1234"
      component.precio=""
      component.cantidad=""
  
      component.Actualizar()
      
      await fixture.whenStable();
      fixture.detectChanges();

        expect(component.respuestaapi.mensaje).toBe('el campo precio es obligatorio')
        Swal.close();
  })

  it("Validar que el campo cantidad es necesario al actualizar", async () => {
      fixture = TestBed.createComponent(InventarioComponent);
      component = fixture.componentInstance;

      component.IdSeleccionado="1234"
      component.precio="1000"
      component.cantidad=""
  
      component.Actualizar()
      
      await fixture.whenStable();
      fixture.detectChanges();

        expect(component.respuestaapi.mensaje).toBe('el campo cantidad es obligatorio')
        Swal.close();
  })

  it("Validar que se pudo actualizar un item", async () => {
  fixture = TestBed.createComponent(InventarioComponent);
  component = fixture.componentInstance;

      component.cantidad="2"
      component.descripcion="PC"
      component.precio="2000"
      component.IdSeleccionado=idtemporal

      component.Actualizar()
      
      await fixture.whenStable();
      fixture.detectChanges();

        expect(component.respuestaapi.mensaje).toBe('se ha Actualizado el elemento')
        Swal.close();
  })

  it("Validar que el campo id sea obligatorio al eliminar un item", async () => {
      fixture = TestBed.createComponent(InventarioComponent);
      component = fixture.componentInstance;
  
      component.IdSeleccionado=""
  
      component.Eliminar()

      await fixture.whenStable();
      fixture.detectChanges();

        expect(component.respuestaapi.mensaje).toBe('el campo _id es obligatorio')
        Swal.close();
  })

  it("Validar que se elimino un item", async () => {
      fixture = TestBed.createComponent(InventarioComponent);
      component = fixture.componentInstance;
      
      component.IdSeleccionado = idtemporal
  
      component.Eliminar()
      
      await fixture.whenStable();
      fixture.detectChanges();

        expect(component.respuestaapi.mensaje).toBe('se ha Eliminado el elemento')
        Swal.close();
  })

});