import { ApiProvider } from './../../providers/api/api';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {  

  public pag : any = [];
  constructor(public navCtrl: NavController,public api:ApiProvider) {

    this.api.get('pages/441').subscribe((datap:any)=>{

      this.pag =  this.pag.concat(datap);      
      console.log(datap);
    });    
  }
  ionViewDidLoad() {
  }
}
