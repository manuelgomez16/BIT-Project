import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { provideRouter } from '@angular/router';
import { routes } from '../../app.routes';
import { HttpClientModule } from '@angular/common/http';
import Swal from 'sweetalert2';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginComponent, HttpClientModule],
      providers:[provideRouter(routes)]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("Validar que el el campo email sea obligatorio en el login", async () => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;

    component.email = ""
    component.password = ""

    component.iniciar()
    
    await fixture.whenStable();
    fixture.detectChanges();

      expect(component.respuestaapi.mensaje).toBe('El campo email es Obligatorio')
      Swal.close();
  })

  it("Validar que el el campo password sea obligatorio en el login", async () => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;

    component.email = "testsal@gmail.com"
    component.password = ""

    component.iniciar()
    
    await fixture.whenStable();
    fixture.detectChanges();

      expect(component.respuestaapi.mensaje).toBe('El campo password es Obligatorio')
      Swal.close();
  })

  it("Validar que el las credenciales fallen en el login", async () => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;

    component.email = "testsal@gmail.com"
    component.password = "xxxxx"

    component.iniciar()
    
    await fixture.whenStable();
    fixture.detectChanges();

      expect(component.respuestaapi.mensaje).toBe('credenciales invalidas')
      Swal.close();
  })

  it("Validar que el las credenciales no fallen en el login", async () => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;

    component.email = "mnuelg27@gmail.com"
    component.password = "1234"

    component.iniciar()
    
    await fixture.whenStable();
    fixture.detectChanges();

      expect(component.respuestaapi.mensaje).toBe('Bienvenido Manuel')
      Swal.close();
  })

});
