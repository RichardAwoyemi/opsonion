import { Pipe } from '@angular/core';

@Pipe({
  name: 'ssort',
})
export class ArraySimpleSortPipe {
  transform(array: Array<string>): Array<string> {
    array.sort((a: string, b: string) => {
      if (a < b) {
        return -1;
      } else if (a > b) {
        return 1;
      } else {
        return 0;
      }
    });
    return array;
  }
}
