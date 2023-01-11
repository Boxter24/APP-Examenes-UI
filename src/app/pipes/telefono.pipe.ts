import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'telefono'
})
export class TelefonoPipe implements PipeTransform {

  transform(value: String, ...args: String[]): String {
    
    let formatTelefono = value.slice(0,4);

    formatTelefono = formatTelefono + value.slice(4);

    return formatTelefono;

  }

}
