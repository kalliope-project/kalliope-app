import { NewOrderPage } from './../NewOrder/NewOrder.component';
import { ChatPage } from './../chat/chat.component';
import { OrdersService } from './orders.service';
import { SettingsService } from './../settings/settings.service';
import { Settings } from './../settings/settings';
import {Component} from '@angular/core';
import {
    ActionSheetController,
    App,
    MenuController,
    ModalController,
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

        // load orders
        this.refreshOrders();

    }

    executeOrder(order) {
        /**
         * Execute the order on kalliope
         */
        this.nav.setRoot(ChatPage, {
            orderFromOrderPage: order
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
                        this.updateOrder(order);
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

    updateOrder(order){
        let modalNewOrder = this.modalCtrl.create(NewOrderPage, {orderToUpdate: order});
        modalNewOrder.present();
        modalNewOrder.onDidDismiss(data => this.refreshOrders())
    }


}
