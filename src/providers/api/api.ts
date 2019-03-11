import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the ApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

var random = Math.floor(Math.random() * 10000);

@Injectable()
export class ApiProvider {

  private API_URL:any = 'http://igrejaunasp.com/wp-json/wp/v2/';
  public Categories:any = [];
  

  constructor(public http: HttpClient) {
    
  }

  get(query:string){
    return this.http.get(this.API_URL + query + '&v=' + random);
  }
  getPost(query:string){
    return this.http.get(this.API_URL + query + '?v=' + random);
  }
  
  getCategories(){
    this.getPost('categories').subscribe((data)=>{
      this.Categories=data;
    });
  }
  
  getCatName(cat_id:number){
    let cat_name:string = '';
    this.Categories.forEach(element => {
      if(element.id==cat_id){
        cat_name = element.name;
      }
    });
    return cat_name;
  }
}
