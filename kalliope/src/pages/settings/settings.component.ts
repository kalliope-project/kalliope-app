import { OrdersPage } from './../orders/orders.component';
import { SettingsService } from './settings.service';
import { Settings } from './settings';
import {Component, ViewChild} from '@angular/core';
import { App, LoadingController, Nav, NavController, ToastController } from 'ionic-angular';

@Component({
    selector: 'page-settings',
    templateUrl: 'settings.html'
})
export class SettingsPage {
    // @ViewChild(Nav) nav: Nav;
    settings: Settings;
    loader;
    settingsOK: Boolean = false;
    nav: NavController;

    constructor(
        public navCtrl: NavController,
        public loadingCtrl: LoadingController,
        private SettingsService: SettingsService,
        public toastCtrl: ToastController,
        private app: App) {

        // get the nac controller used to switch pages
        this.nav = this.app.getActiveNav();

        this.settings = this.SettingsService.getDefaultSettings();
        if (this.settings == null){
            this.settings = new Settings();
        }

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
                error => this.connectonFailled(error));

    }

    connectionSuccess(data) {
        console.log("Connection to Kalliope API server OK");
        console.log(data);
        this.loader.dismiss();
        this.presentToast("Kalliope version: " + data["Kalliope version"]);
        this.settingsOK = true;
    }

    connectonFailled(error){
        console.log("error: " + error);
    }

    presentToast(message_to_print) {
        let toast = this.toastCtrl.create({
            message: message_to_print,
            duration: 3000,
            position: 'bottom'
        });
        toast.present();
    }

    saveSettings(){
        this.SettingsService.setDefaultSettings(this.settings);
        this.nav.setRoot(OrdersPage);
    }

}


