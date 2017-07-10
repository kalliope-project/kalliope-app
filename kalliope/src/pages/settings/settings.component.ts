import {OrdersPage} from './../orders/orders.component';
import {SettingsService} from './settings.service';
import {Settings} from './settings';
import {Component} from '@angular/core';
import {App, LoadingController, NavController, ToastController} from 'ionic-angular';

/**
 * UI Component and Behaviour to handle the Settings Page
 * define and test the Kalliope Core API URL.
 * @class SettingsPage
 */
@Component({
    selector: 'page-settings',
    templateUrl: 'settings.html'
})
export class SettingsPage {
    settings: Settings;
    loader;
    settingsOK: Boolean = false;
    nav: NavController;

    /**
     * @constructor
     * @param public navCtrl {NavController}
     * @param public loadingCtrl {LoadingController} Controller to handle the Loading UI element
     * @param private SettingsService {SettingsService} Service to manage the Settings model
     * @param public toastCtrl {ToastController} Controller to handle the Toast UI Element.
     * @param private app {App}
     */
    constructor(public navCtrl: NavController,
                public loadingCtrl: LoadingController,
                private SettingsService: SettingsService,
                public toastCtrl: ToastController,
                private app: App) {

        // get the nac controller used to switch pages
        this.nav = this.app.getActiveNav();

        this.settings = this.SettingsService.getDefaultSettings();
        if (this.settings == null) {
            this.settings = new Settings();
        }

        // prepare a loader for waiting durring the connection
        this.createLoader();
    }

    /**
     * Method to test the Kalliope Core connection
     */
    testConnection() {
        console.log("[SettingsPage] testConnection: Testing connection with URL -> " + this.settings.url)

        this.loader.present();
        this.SettingsService.getVersion(this.settings)
            .subscribe(
                data => this.connectionSuccess(data),
                error => this.connectonFailled(error));
    }

    /**
     * The connection to the Kalliope Core API is OK.
     * @param data {Object} the Javascript Object of the Kalliope Core response
     */
    connectionSuccess(data: Object) {
        console.log("[SettingsPage] connectionSuccess: Connection to Kalliope API server OK");
        console.log("[SettingsPage] connectionSuccess: The datas -> " + data);
        this.loader.dismiss();
        this.presentToast("Connection Success: Kalliope version ->" + data["Kalliope version"]);
        this.settingsOK = true;
    }

    /**
     * the connection fails, display an error into the console.
     * @param error {string}
     */
    connectonFailled(error: string) {
        console.log("[SettingsPage] connectonFailled: error -> " + error);
        this.loader.dismiss();
        this.presentToast("Connection failled: " + error);
        this.createLoader();
    }

    // TODO Refactoring the following method already exist
    /**
     * Display a message at the bottom of the screen during 3000ms
     * @param message_to_print {string} the message to display
     */
    presentToast(message_to_print: string) {
        let toast = this.toastCtrl.create({
            message: message_to_print,
            duration: 3000,
            position: 'bottom'
        });
        toast.present();
    }

    /**
     * Define and save the default settings.
     */
    saveSettings() {
        this.SettingsService.setDefaultSettings(this.settings);
        this.nav.setRoot(OrdersPage);
    }

    /**
     * Prepare a loader object
     */
    createLoader(){
        this.loader = this.loadingCtrl.create({
            content: "Please wait..."
        });
    }

}


