import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalComponent } from './personal.component';
import { HttpClientModule } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from '../../app.routes';

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

  it("Validar que el campo nombre sea obligatorio al añadir una persona", (done) => {
        fixture = TestBed.createComponent(PersonalComponent);
        component = fixture.componentInstance;
    
        component.nombre=""
        component.email=""
        component.password=""
    
        component.Guardar()
        setTimeout(() => {
          expect(component.respuestaapi.mensaje).toBe('El campo nombre es obligatorio')
          done()
        }, 30);
  })

  it("Validar que el campo email sea obligatorio al añadir una persona", (done) => {
        fixture = TestBed.createComponent(PersonalComponent);
        component = fixture.componentInstance;
    
        component.nombre="Pepe1"
        component.email=""
        component.password=""
    
        component.Guardar()
        setTimeout(() => {
          expect(component.respuestaapi.mensaje).toBe('El campo email es obligatorio')
          done()
        }, 30);
  })

  it("Validar que el campo password sea obligatorio al añadir una persona", (done) => {
        fixture = TestBed.createComponent(PersonalComponent);
        component = fixture.componentInstance;
    
        component.nombre="Pepe1"
        component.email="mnuelg27@gmail.com"
        component.password=""
    
        component.Guardar()
        setTimeout(() => {
          expect(component.respuestaapi.mensaje).toBe('El campo password es obligatorio')
          done()
        }, 30);
  })

  it("Validar que el campo password sea obligatorio al añadir una persona", (done) => {
        fixture = TestBed.createComponent(PersonalComponent);
        component = fixture.componentInstance;
    
        component.nombre="Pepe1"
        component.email="mnuelg27@gmail.com"
        component.password="1234"
    
        component.Guardar()
        setTimeout(() => {
          expect(component.respuestaapi.mensaje).toBe('La email Ya Existe Intente con otro')
          done()
        }, 30);
  })

  it("Validar que se añada la persona", (done) => {
      fixture = TestBed.createComponent(PersonalComponent);
      component = fixture.componentInstance;
  
      var random = Math.floor(Math.random() * (99999 * 99999) + 100000)
  
      component.nombre = "Pepe1"
      component.email = "testsal2"+ random + "@gmail.com"
      component.password = "1234"
  
      component.Guardar()
      setTimeout(() => {
        expect(component.respuestaapi.mensaje).toBe('Item Almacenado')
        done()
      }, 300);
    })

});
