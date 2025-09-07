import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'superfiltro'
})
export class SuperfiltroPipe implements PipeTransform {

  transform(miarray: any[],campo:string,texto:string): any[] {
    
    if (texto == "") {
      return miarray
    }
    else{
      let regex = new RegExp(texto,'i')
      let arrayrespuesta = miarray.filter((item)=> regex.test(item[campo]))
      return arrayrespuesta;

    }
  }

}
