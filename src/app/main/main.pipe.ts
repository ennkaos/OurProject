import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'main',
})
export class MainPipe implements PipeTransform {
  transform(value: string, character: string): string {
    let result = value.replace(character, ' ');
    result = result.slice(0, result.length - 4);
    return result;
  }
}
