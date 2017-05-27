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

    ipAdress : string = 'localhost:5000';
    username : string = '';
    password : string = '';


    constructor(public navCtrl: NavController) {
        this.getDefault();
    }

    getDefault() {
        this.ipAdress = localStorage.getItem('ipAdress');
        this.username = localStorage.getItem('username');
        this.password = localStorage.getItem('password');
    }

    setDefault() {
        localStorage.setItem('ipAdress', this.ipAdress);
        localStorage.setItem('username', this.username);
        localStorage.setItem('password', this.password);
    }

}


