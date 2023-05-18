import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(dataSource: any, filterValue: string): any{

    if(!dataSource) return "";
    if(!filterValue) return dataSource

    return dataSource.filter(function(item:any){
      return JSON.stringify(item).toLowerCase().includes(filterValue);
    }) 
  
   // = filterValue.trim().toLowerCase();

  }

}
