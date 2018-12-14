import {Pipe} from '@angular/core';

@Pipe({name: 'filter'})
export class FilterArrayPipe{
	
	transform(value,args){
		if(typeof args==="undefined" || args=="Select"){
			return value;
		}
		else if(value){
			return value.filter(item=>{
				for(let key in item){
					console.log(item[key]);
					if(key==="category"){
						if(item[key]==args){
							return true;
						}
					}
				}
			});
		}

	}
}