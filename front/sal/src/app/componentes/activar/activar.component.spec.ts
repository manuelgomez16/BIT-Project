import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivarComponent } from './activar.component';
import { provideRouter } from '@angular/router';
import { routes } from '../../app.routes';
import { HttpClientModule } from '@angular/common/http';
import Swal from 'sweetalert2';

describe('ActivarComponent', () => {
  let component: ActivarComponent;
  let fixture: ComponentFixture<ActivarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActivarComponent, HttpClientModule],
      providers:[provideRouter(routes)]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActivarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("Validar que el campo email sea obligatorio al activar una cuenta", async () => {
        fixture = TestBed.createComponent(ActivarComponent);
        component = fixture.componentInstance;

        component.email=""
        component.codigo=""
    
        component.Activar()
        
        await fixture.whenStable();
        fixture.detectChanges();

          expect(component.respuestaapi.mensaje).toBe('El campo email es Obligatorio')
          Swal.close();
    })

    it("Validar que el campo codigo sea obligatorio al activar una cuenta", async () => {
        fixture = TestBed.createComponent(ActivarComponent);
        component = fixture.componentInstance;

        component.email="mnuelg27@gmail.com"
        component.codigo=""
    
        component.Activar()
        
        await fixture.whenStable();
        fixture.detectChanges();

          expect(component.respuestaapi.mensaje).toBe('El campo codigo es Obligatorio')
          Swal.close();
    })

    it("Validar que el codigo sea invalido al activar una cuenta", async () => {
        fixture = TestBed.createComponent(ActivarComponent);
        component = fixture.componentInstance;

        component.email="mnuelg27@gmail.com"
        component.codigo="xxxxx"
    
        component.Activar()
        
        await fixture.whenStable();
        fixture.detectChanges();

          expect(component.respuestaapi.mensaje).toBe('El codigo de activacion es invalido')
          Swal.close();
    })

    it("Validar que el codigo sea valido al activar una cuenta", async () => {
        fixture = TestBed.createComponent(ActivarComponent);
        component = fixture.componentInstance;

        component.email="mnuelg27@gmail.com"
        component.codigo="A-5868"
    
        component.Activar()
        
        await fixture.whenStable();
        fixture.detectChanges();

          expect(component.respuestaapi.mensaje).toBe('Cuenta activada correctamente')
          Swal.close();
    })

});
