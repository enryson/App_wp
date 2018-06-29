import { DetailPage } from './../detail/detail';
import { ApiProvider } from './../../providers/api/api';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public items:any=[];
  private per_page:number = 8;
  private page:number = 1;

  private isLoading:boolean = false;
  private category_id:number = 0;

  constructor(public navCtrl: NavController,public api:ApiProvider,public NavParams:NavParams) {
    if(this.NavParams.get('cat_id')!=null && this.NavParams.get('cat_id')!=undefined){
      this.category_id = this.NavParams.get('cat_id');
    }
    this.getPosts();
  }

  getPosts(infinityScroll = null){
    if(!this.isLoading){
      this.isLoading = true;
      if(infinityScroll!=null && infinityScroll.ionRefresh){
        this.page = 1;
      }
      this.api.get('posts?_embed&per_page='+this.per_page+'&page='+this.page+(this.category_id!=0?'&categories='+this.category_id:'')).subscribe((data:any)=>{
        this.isLoading = false;
        this.items = infinityScroll!=null && infinityScroll.ionRefresh ? data: this.items.concat(data);
        if(data.length===this.per_page){
          this.page++;
        }

        if(infinityScroll!=null){
          infinityScroll.complete();
        }
      },(error)=>{
        this.isLoading = false;
        if(infinityScroll!=null){
          infinityScroll.complete();
        }
      });
    }
  }

  openDetail(item){
    this.navCtrl.push(DetailPage, {post:item});
  }

  getCatName(cat_id:number){
    let cat_name:string = '';
    this.api.Categories.forEach(element => {
      if(element.id==cat_id){
        cat_name = element.name;
      }
    });
    return cat_name;
  }

}
