import { ChatPage } from './../chat/chat.component';
import { OrdersService } from './orders.service';
import { SettingsPage } from './../settings/settings.component';
import { SettingsService } from './../settings/settings.service';
import { Settings } from './../settings/settings';
import {Component, ViewChild} from '@angular/core';
import { MenuController, ModalController, Nav, NavController, App, ToastController } from 'ionic-angular';

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
        private ordersService: OrdersService,
        public toastCtrl: ToastController) {

        // get the nac controller used to switch pages
        this.nav = this.app.getActiveNav();

        menu.enable(true);

        // load orders
        this.orders = ["please do order 66", "this is an order to run", "Bonjour"];

        // load settings from storage
        this.settings = settingsService.getDefaultSettings();
        if (this.settings == null) {
            this.nav.setRoot(SettingsPage);
        }else{
            console.log("Settings loaded. Url: " + this.settings.url);
        }

    }

    executeOrder(order){
        /**
         * Execute the order on kalliope
         */
         this.ordersService.postOrder(order, this.settings).subscribe(
                orderResponse  => this.addToChatPage(orderResponse),
                error => this.handleError(error));
    }

    handleError(error){
        this.presentToast(error);
        console.log(error);
    }

    presentToast(message_to_print) {
        let toast = this.toastCtrl.create({
            message: message_to_print,
            duration: 3000,
            position: 'bottom'
        });
        toast.present();
    }

    addToChatPage(orderResponse){
        /**
         * Add the received response to the chat page
         */
        console.log(orderResponse.userOrder);
        this.nav.setRoot(ChatPage, {
            orderResponse: orderResponse
        });
    }


}
