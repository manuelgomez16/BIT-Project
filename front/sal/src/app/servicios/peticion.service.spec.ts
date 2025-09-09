import { TestBed } from '@angular/core/testing';

import { PeticionService } from './peticion.service';
import { HttpClientModule } from '@angular/common/http';

describe('PeticionService', () => {
  let service: PeticionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientModule]
    });
    service = TestBed.inject(PeticionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it("Validar la peticion tipo post", (done) => {
    const Mokupurl = service.urlreal + "/usuarios/login"
    const Mokuppayload = { email:"", password:""}

    service.post(Mokupurl, Mokuppayload).then((res:any) => {
      expect(res).toEqual({state:false, mensaje:"El campo email es Obligatorio"})
      done()
    })

  })

});