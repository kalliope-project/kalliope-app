import { SettingsPage } from './../settings/settings.component';
import { SettingsService } from './../settings/settings.service';
import { Settings } from './../settings/settings';
import {Component, ViewChild} from '@angular/core';
import { MenuController, ModalController, Nav, NavController } from 'ionic-angular';

@Component({
    selector: 'page-orders',
    templateUrl: 'orders.html'
})
export class OrdersPage {
    @ViewChild(Nav) nav: Nav;
    settings: Settings;
    orders: String[];

    constructor(
        public navCtrl: NavController,
        public settingsService: SettingsService,
        public modalCtrl: ModalController,
        public menu: MenuController) {

        menu.enable(true);

        // load orders
        this.orders = ["please do order 66", "this is an order to run"];

        // load settings from storage
        this.settings = settingsService.getDefaultSettings()
        if (this.settings == null) {
            this.presentModalSettings()
        }else{
            console.log("Settings loaded. Url: " + this.settings.url);
        }

    }

    presentModalSettings() {
        /**
         * Show the settings modal
         */
        let modal = this.modalCtrl.create(SettingsPage);
        modal.present();
    }

}
