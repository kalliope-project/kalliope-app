/**
 * Created by monf on 12/02/17.
 */
import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import { KalliopeService } from '../../app/services/kalliope.service'

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {

  constructor(public navCtrl: NavController,
              private kalliopeService: KalliopeService) {

  }

  ngOnInit(){
    console.log("ngOnInit on ran ....");
    this.getSynapse();
  }

  getSynapse(){
    this.kalliopeService.getSynapses().subscribe(response => {
      console.log(response);
    });
  }

}
