import { SettingsPage } from './../settings/settings.component';
import { SettingsService } from './../settings/settings.service';
import { Settings } from './../settings/settings';
import {Component, ViewChild} from '@angular/core';
import { MenuController, ModalController, Nav, NavController, App } from 'ionic-angular';

@Component({
    selector: 'page-orders',
    templateUrl: 'orders.html'
})
export class OrdersPage {
    settings: Settings;
    orders: String[];
    nav: NavController;

    constructor(
        public navCtrl: NavController,
        public settingsService: SettingsService,
        public modalCtrl: ModalController,
        public menu: MenuController,
        private app: App) {

        // get the nac controller used to switch pages
        this.nav = this.app.getActiveNav();

        menu.enable(true);

        // load orders
        this.orders = ["please do order 66", "this is an order to run"];

        // load settings from storage
        this.settings = settingsService.getDefaultSettings();
        if (this.settings == null) {
            this.nav.setRoot(SettingsPage);
        }else{
            console.log("Settings loaded. Url: " + this.settings.url);
        }

    }

}
