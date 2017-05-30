import { NewOrderPage } from './../NewOrder/NewOrder.component';
import { ChatPage } from './../chat/chat.component';
import { OrdersService } from './orders.service';
import { SettingsPage } from './../settings/settings.component';
import { SettingsService } from './../settings/settings.service';
import { Settings } from './../settings/settings';
import {Component, ViewChild} from '@angular/core';
import {
    ActionSheetController,
    App,
    MenuController,
    ModalController,
    Nav,
    NavController,
    ToastController,
    LoadingController
} from 'ionic-angular';

@Component({
    selector: 'page-orders',
    templateUrl: 'orders.html'
})
export class OrdersPage {
    settings: Settings;
    orders: string[];
    nav: NavController;
    loader;

    constructor(
        public navCtrl: NavController,
        public settingsService: SettingsService,
        public modalCtrl: ModalController,
        public menu: MenuController,
        private app: App,
        private ordersService: OrdersService,
        public toastCtrl: ToastController,
        public actionSheetCtrl: ActionSheetController,
        public loadingCtrl: LoadingController) {

        // get the nac controller used to switch pages
        this.nav = this.app.getActiveNav();

        menu.enable(true);

        // load orders
        this.refreshOrders();

        // load settings from storage
        this.settings = settingsService.getDefaultSettings();
        if (this.settings == null) {
            this.nav.setRoot(SettingsPage);
        }else{
            console.log("Settings loaded. Url: " + this.settings.url);
        }

        // prepare loader
        this.loader = this.loadingCtrl.create({
            content: "Please wait...",
            duration: 3000
        });

    }

    executeOrder(order){
        /**
         * Execute the order on kalliope
         */
        // start waiting gif
        this.loader.present();

        // execute the order
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
        // stop loading
        this.loader.dismiss();
        this.nav.setRoot(ChatPage, {
            orderResponse: orderResponse
        });
    }

    addNewOrder(){
        let modalNewOrder = this.modalCtrl.create(NewOrderPage);
        modalNewOrder.present();
        modalNewOrder.onDidDismiss(data => this.refreshOrders())
    }

    refreshOrders(){
        this.orders = this.ordersService.loadOrders()
        if (this.orders == null){
            this.orders = [];
        }
    }

    presentActionSheet(order) {
        let actionSheet = this.actionSheetCtrl.create({
            title: order,
            buttons: [
                {
                    text: 'Play',
                    icon: 'play',
                    handler: () => {
                        this.executeOrder(order);
                    }
                },
                {
                    text: 'Edit',
                    icon: 'hammer',
                    handler: () => {
                        console.log('Edit clicked');
                    }
                },
                {
                    text: 'Delete',
                    role: 'destructive',
                    icon: 'trash',
                    handler: () => {
                        this.deleteOrder(order);
                    }
                },
                {
                    text: 'Cancel',
                    role: 'cancel', // will always sort to be on the bottom
                    icon: 'close',
                    handler: () => {
                        console.log('Cancel clicked');
                    }
                }

            ]
        });
        actionSheet.present();

    }

    deleteOrder(order){
        // delete the order
        var index = this.orders.indexOf(order, 0);
        if (index > -1) {
            this.orders.splice(index, 1);
        }
        // save the new list
        this.ordersService.saveOrders(this.orders);

    }


}
