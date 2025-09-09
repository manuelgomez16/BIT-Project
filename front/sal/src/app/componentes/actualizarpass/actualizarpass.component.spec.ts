import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizarpassComponent } from './actualizarpass.component';
import { HttpClientModule } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from '../../app.routes';

describe('ActualizarpassComponent', () => {
  let component: ActualizarpassComponent;
  let fixture: ComponentFixture<ActualizarpassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActualizarpassComponent, HttpClientModule],
      providers:[provideRouter(routes)]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActualizarpassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});