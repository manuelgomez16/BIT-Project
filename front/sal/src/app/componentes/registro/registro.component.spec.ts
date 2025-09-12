import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroComponent } from './registro.component';
import { HttpClientModule } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from '../../app.routes';
import Swal from 'sweetalert2';

describe('RegistroComponent', () => {
  let component: RegistroComponent;
  let fixture: ComponentFixture<RegistroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistroComponent, HttpClientModule],
      providers:[provideRouter(routes)]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("Validar que el nombre sea obligatorio en el frontend al registrar", async () => {
    fixture = TestBed.createComponent(RegistroComponent);
    component = fixture.componentInstance;

    component.nombre = ""
    component.email = ""
    component.password = ""

    component.registrar()

    await fixture.whenStable();
    fixture.detectChanges();

      expect(component.respuestaapi.mensaje).toBe('El campo nombre es Obligatorio')
      Swal.close();
  })

  it("Validar que el email sea obligatorio en el frontend al registrar", async () => {
    fixture = TestBed.createComponent(RegistroComponent);
    component = fixture.componentInstance;

    component.nombre = "Manuel"
    component.email = ""
    component.password = ""

    component.registrar()

    await fixture.whenStable();
    fixture.detectChanges();
      expect(component.respuestaapi.mensaje).toBe('El campo email es Obligatorio')
      Swal.close();
  })

  it("Validar que el password sea obligatorio en el frontend al registrar", async () => {
    fixture = TestBed.createComponent(RegistroComponent);
    component = fixture.componentInstance;

    component.nombre = "Manuel"
    component.email = "mnuelg27@gmail.com"
    component.password = ""

    component.registrar()

    await fixture.whenStable();
    fixture.detectChanges();
      expect(component.respuestaapi.mensaje).toBe('El campo password es Obligatorio')
      Swal.close();
  })

  it("Validar que el el correo ya exista", async () => {
    fixture = TestBed.createComponent(RegistroComponent);
    component = fixture.componentInstance;

    component.nombre = "Manuel"
    component.email = "mnuelg27@gmail.com"
    component.password = "1234"

    component.registrar()

    await fixture.whenStable();
    fixture.detectChanges();

      expect(component.respuestaapi.mensaje).toBe('El correo electronico ya esta en uso intente con otro')
      Swal.close();
  })

  it("Validar que se cree el usuario en el frontend", async () => {
    fixture = TestBed.createComponent(RegistroComponent);
    component = fixture.componentInstance;

    var random = Math.floor(Math.random() * (99999 * 99999) + 100000)

    component.nombre = "Pepe"
    component.email = "testsal"+ random + "@gmail.com"
    component.password = "1234"

    component.registrar()

    await fixture.whenStable();
    fixture.detectChanges();

      expect(component.respuestaapi.mensaje).toBe('Usuario Registrado Correctamente verifique su bandeja')
      Swal.close();
  })

})