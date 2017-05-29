import { OrdersService } from './orders.service';
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
        private app: App,
        private ordersService: OrdersService) {

        // get the nac controller used to switch pages
        this.nav = this.app.getActiveNav();

        menu.enable(true);

        // load orders
        this.orders = ["please do order 66", "this is an order to run", "Bonjour"];

        // load settings from storage
        this.settings = settingsService.getDefaultSettings();
        if (this.settings == null) {
            this.nav.setRoot(SettingsPage);
        } else {
            if ('url' in this.settings &&
                'username' in this.settings &&
                'password' in this.settings) {
                console.log("Settings loaded. Url: " + this.settings.url);
            }
            else {
                this.nav.setRoot(SettingsPage);
            }
        }

    }

    executeOrder(order){
        /**
         * Execute the order on kalliope
         */
         this.ordersService.postOrder(order, this.settings).subscribe(
                data  => console.log(data),
                error => console.log(error));
    }

}
