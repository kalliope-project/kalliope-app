import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import { KalliopeService } from '../../app/services/kalliope.service'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController,
              private kalliopeService: KalliopeService) {

  }

  ngOnInit(){
    console.log("ngOnInit on ran ....");
  }

  getSynapse(){
    this.kalliopeService.getSynapses().subscribe(response => {
      console.log(response);
    });
  }

}
