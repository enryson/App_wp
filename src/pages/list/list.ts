import { ApiProvider } from './../../providers/api/api';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {  
  private p : number = 0;
  public pag : any = [];
  constructor(public navCtrl: NavController,public api:ApiProvider,public navParams: NavParams) {

    this.p = navParams.get('page_id');
    this.api.get('pages/'+this.p).subscribe((datap:any)=>{

      this.pag =  this.pag.concat(datap);      
      //console.log(datap);
    });    
  }
  ionViewDidLoad() {
  }
}
