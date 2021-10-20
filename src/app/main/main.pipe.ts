import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'main',
})
export class MainPipe implements PipeTransform {
  transform(value: string, character: string): string {
    let result!: string;
    if (value.includes('Active')) {
      result = value.slice(0, 6) + ' ' + value.slice(6, value.length);
    } else if (value.includes('Total')) {
      result = value.slice(0, 5) + ' ' + value.slice(5, value.length);
    } else if (value.includes('New')) {
      result = value.slice(0, 3) + ' ' + value.slice(3, value.length);
    } else {
      result = value.slice(5, value.length).replace(character, ' ');
    }
    return result;
  }
}
