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
  public slides:any=[];
  private per_page:number = 3;
  private page:number = 1;
  private isLoading:boolean = false;
  private category_id:number = 0;

  constructor(public navCtrl: NavController,public api:ApiProvider,public NavParams:NavParams) {
    if(this.NavParams.get('cat_id')!=null && this.NavParams.get('cat_id')!=undefined){
      this.category_id = this.NavParams.get('cat_id');
    }
    
    this.getPosts();
    this.getSlides();
  }

  getSlides(){
    this.slides = [];
    this.api.get('media?categories=80&fields=id,guid').subscribe((data)=>{
      this.slides =  this.slides.concat(data);
    });
  }

  getPosts(infinityScroll = null){
    this.api.get('posts?_embed&per_page=' + this.per_page + '&page=1');
    if(!this.isLoading){
      this.isLoading = true;
      if(infinityScroll != null && infinityScroll.ionRefresh){
        this.page = 1;
      }

      let url:string = 'posts?_embed&per_page=' + this.per_page + '&page=' + this.page;
      url += this.category_id != 0 ?'&categories=' + this.category_id:'';

      this.api.get(url).subscribe((dat:any) => {
        
        this.isLoading = false;
        if(infinityScroll != null && infinityScroll.ionRefresh){
          setTimeout(_ => this.items = this.items.concat(dat.items), 10000);
          this.items = this.items; 
        }
        
        this.items = infinityScroll != null && infinityScroll.ionRefresh ? dat: this.items.concat(dat);
        
        console.log(dat);
        if(dat.length === this.per_page){
          this.page++;
        }

        if(infinityScroll!=null){
          this.getSlides();
          infinityScroll.complete();
        }
      }, (error)=>{
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