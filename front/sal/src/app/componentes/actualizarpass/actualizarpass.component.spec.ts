import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizarpassComponent } from './actualizarpass.component';

describe('ActualizarpassComponent', () => {
  let component: ActualizarpassComponent;
  let fixture: ComponentFixture<ActualizarpassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActualizarpassComponent]
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
