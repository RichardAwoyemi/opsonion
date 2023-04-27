import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(list: IFilterList[], filterText: string): IFilterList[] {
    return list ? list.filter((item) => item.name.search(new RegExp(filterText, 'i')) > -1) : [];
  }
}

export interface IFilterList {
  name: string;
}
