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

  let idtemporal = "68c2473cc5c9cec0f156cec2"

  // it("Validar que el campo id sea obligatorio al eliminar un item", (done) => {
  //     fixture = TestBed.createComponent(InventarioComponent);
  //     component = fixture.componentInstance;
  
  //     component.IdSeleccionado=""
  
  //     component.Eliminar()
  //     setTimeout(() => {
  //       expect(component.respuestaapi.mensaje).toBe('el campo _id es obligatorio')
  //       done()
  //     }, 30)
  // })

  // it("Validar que se elimino un item", (done) => {
  //     fixture = TestBed.createComponent(InventarioComponent);
  //     component = fixture.componentInstance;

  //     (component as any).peticion.get((component as any).peticion.urlreal + "/inventario/CargarTodas").then((res: any) => {
      
  //     component.IdSeleccionado = res[0]._id
  
  //     component.Eliminar()
  //     setTimeout(() => {
  //       expect(component.respuestaapi.mensaje).toBe('se ha Eliminado el elemento')
  //       done()
  //     }, 30);
  //     })
      
  // })

  // it("Validar que se elimino un item", (done) => {
  //     fixture = TestBed.createComponent(InventarioComponent);
  //     component = fixture.componentInstance;
  
  //     component.IdSeleccionado=idtemporal
  
  //     component.Eliminar()
  //     setTimeout(() => {
  //       expect(component.respuestaapi.mensaje).toBe('se ha Eliminado el elemento')
  //       done()
  //     }, 30);
  // })

  it("Validar que la funcion cargar todas sirve", (done) => {
      fixture = TestBed.createComponent(InventarioComponent);
      component = fixture.componentInstance;
  
      component.CargarTodas()
      setTimeout(() => {
        expect(component.datos.length).toBeGreaterThan(0)
        done()
      }, 30);
  })

  it("Validar que la funcion cargar id sirve", (done) => {
      fixture = TestBed.createComponent(InventarioComponent);
      component = fixture.componentInstance;

      component.IdSeleccionado="68c2473cc5c9cec0f156cec2"
  
      component.Cargarid(idtemporal)
      setTimeout(() => {
        expect(component.codigo).toBe(component.codigo)
        done()
      }, 30);
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

  it("Validar que el codigo exista para poder actualizar un item", (done) => {
  fixture = TestBed.createComponent(InventarioComponent);
  component = fixture.componentInstance;

      component.cantidad="2"
      component.descripcion="PC"
      component.precio="2000"
      component.IdSeleccionado=idtemporal

      component.Actualizar()
      setTimeout(() => {
        expect(component.respuestaapi.mensaje).toBe('el id que intenta actualizar no existe')
        done()
      }, 300);
  })

  it("Validar que el codigo exista para poder actualizar un item", (done) => {
  fixture = TestBed.createComponent(InventarioComponent);
  component = fixture.componentInstance;

      component.cantidad="2"
      component.descripcion="PC"
      component.precio="2000"
      component.IdSeleccionado=idtemporal

      component.Actualizar()
      setTimeout(() => {
        expect(component.respuestaapi.mensaje).toBe('el id que intenta actualizar no existe')
        done()
      }, 300);
  })

});