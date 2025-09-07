import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'superfiltro2'
})
export class Superfiltro2Pipe implements PipeTransform {

  transform(miarray: any[],texto:string): any[] {
    
    if (texto == "") {
      return miarray
    }
    else{
      const resultado = miarray.map(item => ({...item,completo: Object.values(item).join('')}));
      console.log(resultado)

      let regex = new RegExp(texto,'i')
      let arrayrespuesta = resultado.filter((item)=> regex.test(item.completo))
      return arrayrespuesta;

    }
  }

}
