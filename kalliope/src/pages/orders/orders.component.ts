import {NewOrderPage} from './../NewOrder/NewOrder.component';
import {ChatPage} from './../chat/chat.component';
import {OrdersService} from './orders.service';
import {SettingsService} from './../settings/settings.service';
import {Settings} from './../settings/settings';
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

/**
 * Component and Behaviour of the Order page
 * @class OrdersPage
 */
@Component({
    selector: 'page-orders',
    templateUrl: 'orders.html'
})
export class OrdersPage {
    settings: Settings;
    orders: string[];
    nav: NavController;

    /**
     * @constructor
     * @param public navCtrl {NavController}
     * @param public settingsService {SettingsService} The service to handle settings
     * @param public modalCtrl {ModalController} Controller to manage the Modal
     * @param public menu {MenuController} Controller to manage the Menu
     * @param private app {App}
     * @param private ordersService {OrdersService} Service for orders
     * @param public toastCtrl {ToastController} Controller to manage Toast
     * @param public actionSheetCtrl {ActionSheetController} Controller to manage ActionSheet
     * @param public loadingCtrl {LoadingController} Controller to manage Loading
     */
    constructor(public navCtrl: NavController,
                public settingsService: SettingsService,
                public modalCtrl: ModalController,
                public menu: MenuController,
                private app: App,
                private ordersService: OrdersService,
                public toastCtrl: ToastController,
                public actionSheetCtrl: ActionSheetController,
                public loadingCtrl: LoadingController) {

        // get the nav controller used to switch pages
        this.nav = this.app.getActiveNav();

        // load orders
        this.refreshOrders();
    }

    /**
     * Execute the given order
     * @param order {string} the order to execute.
     */
    executeOrder(order: string) {
        /**
         * Execute the order on kalliope
         */
        this.nav.setRoot(ChatPage, {
            orderFromOrderPage: order
        });
    }

    /**
     * Add a new order into the orders list.
     */
    addNewOrder() {
        let modalNewOrder = this.modalCtrl.create(NewOrderPage);
        modalNewOrder.present();
        modalNewOrder.onDidDismiss(data => this.refreshOrders())
    }

    /**
     * Refresh the orders list.
     */
    refreshOrders() {
        this.orders = this.ordersService.loadOrders()
        if (this.orders == null) {
            this.orders = [];
        }
    }

    /**
     * UI Component to let the user 'Play, Edit, Delete, Cancel' a given order.
     * @param order {string} the given order.
     */
    presentActionSheet(order: string) {
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

    /**
     * Delete an order.
     * @param order {string} the given order to delete
     */
    deleteOrder(order: string) {
        // delete the order
        var index = this.orders.indexOf(order, 0);
        if (index > -1) {
            this.orders.splice(index, 1);
        }
        // save the new list
        this.ordersService.saveOrders(this.orders);
    }

    /**
     * Update an order
     * @param order {string} the given order to update.
     */
    updateOrder(order: string) {
        let modalNewOrder = this.modalCtrl.create(NewOrderPage, {orderToUpdate: order});
        modalNewOrder.present();
        modalNewOrder.onDidDismiss(data => this.refreshOrders())
    }


}
