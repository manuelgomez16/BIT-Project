import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventarioComponent } from './inventario.component';
import { HttpClientModule } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from '../../app.routes';

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

  it("Validar que el campo codigo sea obligatorio al crear un item en el inventario", (done) => {
      fixture = TestBed.createComponent(InventarioComponent);
      component = fixture.componentInstance;
  
      component.codigo=""
      component.nombre=""
      component.precio=""
  
      component.Guardar()
      setTimeout(() => {
        expect(component.respuestaapi.mensaje).toBe('el campo codigo es obligatorio')
        done()
      }, 30);
  })

  it("Validar que el campo nombre sea obligatorio al crear un item en el inventario", (done) => {
      fixture = TestBed.createComponent(InventarioComponent);
      component = fixture.componentInstance;
  
      component.codigo="666"
      component.nombre=""
      component.precio=""
  
      component.Guardar()
      setTimeout(() => {
        expect(component.respuestaapi.mensaje).toBe('el campo nombre es obligatorio')
        done()
      }, 30);
  })

  it("Validar que el campo precio sea obligatorio al crear un item en el inventario", (done) => {
      fixture = TestBed.createComponent(InventarioComponent);
      component = fixture.componentInstance;
  
      component.codigo="666"
      component.nombre="PC"
      component.precio=""
  
      component.Guardar()
      setTimeout(() => {
        expect(component.respuestaapi.mensaje).toBe('el campo precio es obligatorio')
        done()
      }, 30);
  })

  it("Validar que el codigo no se repita al crear un item en el inventario", (done) => {
      fixture = TestBed.createComponent(InventarioComponent);
      component = fixture.componentInstance;
  
      component.codigo="666"
      component.nombre="PC"
      component.precio="1000"
  
      component.Guardar()
      setTimeout(() => {
        expect(component.respuestaapi.mensaje).toBe('el codigo ya existe intente con otro')
        done()
      }, 30);
  })

  it("Validar que el item fue guardado correctamente en el inventario", (done) => {
      fixture = TestBed.createComponent(InventarioComponent);
      component = fixture.componentInstance;

      var random = Math.floor(Math.random() * (999 * 999) + 100)
  
      component.codigo="R" + random
      component.nombre="PC"
      component.precio="1000"
  
      component.Guardar()
      setTimeout(() => {
        expect(component.respuestaapi.mensaje).toBe('item almacenado')
        done()
      }, 30);
  })

  let idtemporal = ""

  it("Validar que se cargue un item con la funcion de Cargarid", (done) => {
  fixture = TestBed.createComponent(InventarioComponent);
  component = fixture.componentInstance;

  (component as any).peticion.get((component as any).peticion.urlreal + "/inventario/CargarTodas").then((res: any) => {
      expect(res.length).toBeGreaterThan(0);

      idtemporal = res[0]._id;

      component.Cargarid(idtemporal);
      setTimeout(() => {
        expect(component.codigo).toBe(res[0].codigo);
        expect(component.nombre).toBe(res[0].nombre);
        expect(component.descripcion).toBe(res[0].descripcion);
        expect(component.precio).toBe(res[0].precio);
        expect(component.cantidad).toBe(res[0].cantidad);
        done();
      }, 300);
    });
  })

  it("Validar que el campo id es necesario al actualizar", (done) => {
      fixture = TestBed.createComponent(InventarioComponent);
      component = fixture.componentInstance;

      component.IdSeleccionado=""
      component.precio=""
      component.cantidad=""
  
      component.Actualizar()
      setTimeout(() => {
        expect(component.respuestaapi.mensaje).toBe('el campo _id es obligatorio')
        done()
      }, 30);
  })

  it("Validar que el campo precio es necesario al actualizar", (done) => {
      fixture = TestBed.createComponent(InventarioComponent);
      component = fixture.componentInstance;

      component.IdSeleccionado="1234"
      component.precio=""
      component.cantidad=""
  
      component.Actualizar()
      setTimeout(() => {
        expect(component.respuestaapi.mensaje).toBe('el campo precio es obligatorio')
        done()
      }, 30);
  })

  it("Validar que el campo cantidad es necesario al actualizar", (done) => {
      fixture = TestBed.createComponent(InventarioComponent);
      component = fixture.componentInstance;

      component.IdSeleccionado="1234"
      component.precio="1000"
      component.cantidad=""
  
      component.Actualizar()
      setTimeout(() => {
        expect(component.respuestaapi.mensaje).toBe('el campo cantidad es obligatorio')
        done()
      }, 30);
  })

  it("Validar que se actualice un item con la funcion de actualizar", (done) => {
  fixture = TestBed.createComponent(InventarioComponent);
  component = fixture.componentInstance;

  (component as any).peticion.get((component as any).peticion.urlreal + "/inventario/CargarTodas").then((res: any) => {
      expect(res.length).toBeGreaterThan(0);

      component.cantidad="2"
      component.descripcion="PC"
      component.precio="2000"
      component.IdSeleccionado=idtemporal = res[0]._id;

      component.Actualizar()
      setTimeout(() => {
        expect(component.respuestaapi.mensaje).toBe('se ha Actualizado el elemento')
        done()
      }, 300);
    });
  })

});