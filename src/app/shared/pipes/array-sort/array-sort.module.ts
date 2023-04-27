import { NgModule } from '@angular/core';
import { ArraySortPipe } from './array-sort.pipe';
import { ArraySimpleSortPipe } from './array-simple-sort.pipe';

@NgModule({
  declarations: [ArraySortPipe, ArraySimpleSortPipe],
  exports: [ArraySortPipe, ArraySimpleSortPipe],
})
export class ArraySortModule {}
