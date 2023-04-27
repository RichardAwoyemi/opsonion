import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort',
})
export class ArraySortPipe implements PipeTransform {
  transform(array: unknown[], field: string): string[] {
    if (!Array.isArray(array)) {
      return;
    }
    array.sort((a: string, b: string) => {
      if (a[field] < b[field]) {
        return -1;
      } else if (a[field] > b[field]) {
        return 1;
      } else {
        return 0;
      }
    });
    return array;
  }
}
