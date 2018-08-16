import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterpipe'
})
export class FilterpipePipe implements PipeTransform {

  /*transform(value: any, args?: any): any {
    return null;

  }*/
   transform(items: any[], searchText: string): any[] {
    if(!items) return [];
    if(!searchText) return items;
	searchText = searchText.toLowerCase();

	return items.filter( it => {
		if(!it.name){
			return it._id.toLowerCase().includes(searchText);
		}
		else{
			return it.name.toLowerCase().includes(searchText);
		}
      
    });
   }

}
