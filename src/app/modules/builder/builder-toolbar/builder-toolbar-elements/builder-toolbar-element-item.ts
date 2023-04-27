import { Type } from '@angular/core';

export class BuilderToolbarElementItem {
  constructor(public component: Type<unknown>, public elementOptions: unknown) {}
}
