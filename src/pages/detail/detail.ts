import { DomSanitizer } from '@angular/platform-browser';
import { ApiProvider } from './../../providers/api/api';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html',
})
export class DetailPage {

  post:any;
  selectedItem: any;

  constructor(public navCtrl: NavController,public navParams: NavParams,public sanitizer: DomSanitizer,public api:ApiProvider) {
    
    this.selectedItem = navParams.get('post');
    
    if( this.selectedItem.content.rendered ) {
      this.post = this.sanitizer.bypassSecurityTrustHtml( this.selectedItem.content.rendered );
    }
  }

  ionViewDidLoad() {
    
  }


}
