import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroComponent } from './registro.component';
import { HttpClientModule } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from '../../app.routes';

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

  //Fix later//


  it("Validar que el nombre sea obligatorio en el frontend al registrar", (done) => {
    fixture = TestBed.createComponent(RegistroComponent);
    component = fixture.componentInstance;

    component.nombre = ""
    component.email = ""
    component.password = ""

    component.registrar()
    setTimeout(() => {
      expect(component.respuestaapi.mensaje).toBe('El campo nombre es Obligatorio')
      done()
    }, 300);
  })

  it("Validar que el email sea obligatorio en el frontend al registrar", (done) => {
    fixture = TestBed.createComponent(RegistroComponent);
    component = fixture.componentInstance;

    component.nombre = "Manuel"
    component.email = ""
    component.password = ""

    component.registrar()
    setTimeout(() => {
      expect(component.respuestaapi.mensaje).toBe('El campo email es Obligatorio')
      done()
    }, 300);
  })

  it("Validar que el password sea obligatorio en el frontend al registrar", (done) => {
    fixture = TestBed.createComponent(RegistroComponent);
    component = fixture.componentInstance;

    component.nombre = "Manuel"
    component.email = "mnuelg27@gmail.com"
    component.password = ""

    component.registrar()
    setTimeout(() => {
      expect(component.respuestaapi.mensaje).toBe('El campo password es Obligatorio')
      done()
    }, 300);
  })

  it("Validar que el el correo ya exista", (done) => {
    fixture = TestBed.createComponent(RegistroComponent);
    component = fixture.componentInstance;

    component.nombre = "Manuel"
    component.email = "mnuelg27@gmail.com"
    component.password = "1234"

    component.registrar()
    setTimeout(() => {
      expect(component.respuestaapi.mensaje).toBe('El correo electronico ya esta en uso intente con otro')
      done()
    }, 300);
  })

  // it("Validar cree el usuario en el frontend", (done) => {
  //   fixture = TestBed.createComponent(RegistroComponent);
  //   component = fixture.componentInstance;

  //   var random = Math.floor(Math.random() * (99999 * 99999) + 100000)

  //   component.nombre = "Manuel"
  //   component.email = "testsal"+ random + "@gmail.com"
  //   component.password = "1234"

  //   component.registrar()
  //   setTimeout(() => {
  //     expect(component.respuestaapi.mensaje).toBe('el campo password es obligatorio')
  //     done()
  //   }, 300);
  // })

});
