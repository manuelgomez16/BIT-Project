import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalComponent } from './personal.component';
import { HttpClientModule } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from '../../app.routes';
import Swal from 'sweetalert2';

describe('PersonalComponent', () => {
  let component: PersonalComponent;
  let fixture: ComponentFixture<PersonalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonalComponent, HttpClientModule],
      providers:[provideRouter(routes)]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("Validar que el campo nombre sea obligatorio al añadir una persona", async () => {
        fixture = TestBed.createComponent(PersonalComponent);
        component = fixture.componentInstance;
    
        component.nombre=""
        component.email=""
        component.password=""
    
        component.Guardar()

        await fixture.whenStable();
        fixture.detectChanges();

          expect(component.respuestaapi.mensaje).toBe('El campo nombre es obligatorio')
          Swal.close();
  })

  it("Validar que el campo email sea obligatorio al añadir una persona", async () => {
        fixture = TestBed.createComponent(PersonalComponent);
        component = fixture.componentInstance;
    
        component.nombre="Pepe1"
        component.email=""
        component.password=""
    
        component.Guardar()

        await fixture.whenStable();
        fixture.detectChanges();

          expect(component.respuestaapi.mensaje).toBe('El campo email es obligatorio')
          Swal.close();
  })

  it("Validar que el campo password sea obligatorio al añadir una persona", async () => {
        fixture = TestBed.createComponent(PersonalComponent);
        component = fixture.componentInstance;
    
        component.nombre="Pepe1"
        component.email="mnuelg27@gmail.com"
        component.password=""
    
        component.Guardar()

        await fixture.whenStable();
        fixture.detectChanges();

          expect(component.respuestaapi.mensaje).toBe('El campo password es obligatorio')
          Swal.close();
  })

  it("Validar que el campo password sea obligatorio al añadir una persona", async () => {
        fixture = TestBed.createComponent(PersonalComponent);
        component = fixture.componentInstance;
    
        component.nombre="Pepe1"
        component.email="mnuelg27@gmail.com"
        component.password="1234"
    
        component.Guardar()

        await fixture.whenStable();
        fixture.detectChanges();

        expect(component.respuestaapi.mensaje).toBe('La email Ya Existe Intente con otro')
        Swal.close();
  })

  it("Validar que se añada la persona", async () => {
      fixture = TestBed.createComponent(PersonalComponent);
      component = fixture.componentInstance;
  
      var random = Math.floor(Math.random() * (99999 * 99999) + 100000)
  
      component.nombre = "Pepe1"
      component.email = "testsal2"+ random + "@gmail.com"
      component.password = "1234"
  
      component.Guardar()
 
      await fixture.whenStable();
      fixture.detectChanges();

      expect(component.respuestaapi.mensaje).toBe('Item Almacenado')
      Swal.close();
  })

  let idtemporal = ""

  it("Validar que la funcion cargar todas sirve", async () => {
      fixture = TestBed.createComponent(PersonalComponent);
      component = fixture.componentInstance;
  
      component.CargarTodas()
  
      await fixture.whenStable();
      fixture.detectChanges();

        idtemporal = component.datos[component.datos.length - 1]._id
        expect(component.datos.length).toBeGreaterThan(0)
        Swal.close();
  })

  it("Validar que la funcion cargar id sirve", async () => {
      fixture = TestBed.createComponent(PersonalComponent);
      component = fixture.componentInstance;
  
      component.Cargarid(idtemporal)
  
      await fixture.whenStable();
      fixture.detectChanges();

        expect(component.IdSeleccionado).toBe(idtemporal)
        Swal.close();
  })

  it("Validar que se requiere el Id para actualizar los datos de una persona", async () => {
  fixture = TestBed.createComponent(PersonalComponent);
  component = fixture.componentInstance;

      component.nombre="Pepe"
      component.estado="Activo"
      component.celular="1234"
      component.IdSeleccionado=""

      component.Actualizar()
      
      await fixture.whenStable();
      fixture.detectChanges();

        expect(component.respuestaapi.mensaje).toBe('El campo _id es obligatorio')
        Swal.close();
  })

  it("Validar que se pudieron actualizar los datos de una persona", async () => {
  fixture = TestBed.createComponent(PersonalComponent);
  component = fixture.componentInstance;

      component.nombre="Pepe"
      component.estado="Activo"
      component.celular="1234"
      component.IdSeleccionado=idtemporal

      component.Actualizar()
      
      await fixture.whenStable();
      fixture.detectChanges();

        expect(component.respuestaapi.mensaje).toBe('Se actualizo el registro')
        Swal.close();
  })

  it("Validar que el campo id sea obligatorio al eliminar un item", async () => {
      fixture = TestBed.createComponent(PersonalComponent);
      component = fixture.componentInstance;
  
      component.IdSeleccionado=""
  
      component.Eliminar()

      await fixture.whenStable();
      fixture.detectChanges();

        expect(component.respuestaapi.mensaje).toBe('El campo _id es obligatorio')
        Swal.close();
  })

  it("Validar que se elimino un item", async () => {
      fixture = TestBed.createComponent(PersonalComponent);
      component = fixture.componentInstance;
      
      component.IdSeleccionado = idtemporal
  
      component.Eliminar()
      
      await fixture.whenStable();
      fixture.detectChanges();

        expect(component.respuestaapi.mensaje).toBe('Se Elimino el registro')
        Swal.close();
  })

});
