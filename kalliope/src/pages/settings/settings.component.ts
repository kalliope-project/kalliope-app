import { SettingsService } from './settings.service';
import { Settings } from './settings';
/**
 * Created by monf on 26/05/17.
 */
import {Component} from '@angular/core';
import { LoadingController, NavController } from 'ionic-angular';

@Component({
    selector: 'page-settings',
    templateUrl: 'settings.html'
})
export class SettingsPage {
    settings: Settings = new Settings();
    loader;

    constructor(
        public navCtrl: NavController,
        public loadingCtrl: LoadingController,
        private SettingsService: SettingsService,) {

        this.loader = this.loadingCtrl.create({
            content: "Please wait..."
        });

    }
    testConnection() {
        console.log("Testing connection with URL: " + this.settings.url)

        this.loader.present();
        // hard coded settings for testing
        let testing_settings = new Settings();
        testing_settings.username = "admin";
        testing_settings.password = "secret";
        testing_settings.url = "192.168.0.12:5000"
        this.settings = testing_settings

        this.SettingsService.getVersion(this.settings)
            .subscribe(
                data  => this.connectionSuccess(data),
                error => console.log("error: " + error));

    }

    connectionSuccess(data) {
        console.log("Connection to Kalliope API server OK");
        console.log(data)
        this.SettingsService.setDefaultSettings(this.settings)
        this.loader.dismiss();
    }

}


