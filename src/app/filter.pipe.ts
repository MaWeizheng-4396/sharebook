import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {

  transform(park_arr: any, term: any): any {
    if (term === '') {
       park_arr = [];
    } else {
      return park_arr.filter(function (list) {
        return list.name.includes(term);
      });
    }
  }

}
