/**
 * Created by monf on 26/05/17.
 */
import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';

@Component({
    selector: 'page-settingss',
    templateUrl: 'settings.html'
})
export class SettingsPage {

    ipAdress : string;

    constructor(public navCtrl: NavController) {
        this.getDefault();
    }

    getDefault() {
        if (localStorage.getItem('ipAdress') != null) {
            this.ipAdress = localStorage.getItem('ipAdress');
        } else {
            this.ipAdress = 'localhost:5000';
        }
    }

    setDefault() {
        localStorage.setItem('ipAdress', this.ipAdress);
        
    }

}


