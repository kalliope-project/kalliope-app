import {OrdersService} from './../orders/orders.service';
import {ViewController, NavParams} from 'ionic-angular';
import {Component} from '@angular/core';

/**
 * Define components and behaviour on the NewOrderPage
 * @class newOrderPage
 */
@Component({
    selector: 'page-neworder',
    templateUrl: 'NewOrder.html'
})
export class NewOrderPage {

    newOrder: string;
    updateCall: boolean = false;    // used to know if we are updating an order
    currentOrders: Array<string>;
    orderToUpdate: string;
    buttonText: string;

    /**
     *
     * @constructor
     * @param public navCtrl {NavController}
     * @param public viewCtrl {ViewController} Controller to manage the View panel.
     * @param private ordersService {OrderService} Manage orders related services.
     * @param private params {NavParams}
     */
    constructor(public viewCtrl: ViewController,
                private ordersService: OrdersService,
                private params: NavParams) {

        // if we have received an order to update, place it into he view
        this.orderToUpdate = params.get('orderToUpdate');
        if (this.orderToUpdate != null) {
            this.newOrder = this.orderToUpdate;
            this.updateCall = true;
        }

        // load current orders
        this.currentOrders = this.ordersService.loadOrders();
        if (this.currentOrders == null) {
            this.currentOrders = [];
        }

        // test inside the button
        this.buttonText = "Add"
        if (this.updateCall) {
            this.buttonText = "Update"
        }

    }

    /**
     * remove the current view.
     */
    dismiss() {
        this.viewCtrl.dismiss();
    }

    /**
     * Save the new Order.
     */
    saveOrder() {
        console.log("[NewOrderPage] saveOrder : Saving new order -> " + this.newOrder);
        if (this.updateCall) {
            console.log("[NewOrderPage] saveOrder : update");
            // this is an update of an existing order
            this.updateOrder(this.newOrder, this.orderToUpdate);
        } else {
            this.currentOrders.push(this.newOrder);
            this.ordersService.saveOrders(this.currentOrders);
        }
        this.dismiss();
    }

    /**
     * update an existing order.
     * @param newOrder {string} the new order which will replace the old one.
     * @param oldOrder {string} the old order.
     */
    updateOrder(newOrder: string, oldOrder: string) {
        console.log("[NewOrderPage] updateOrder : Saving new order -> " + newOrder);
        // delete the order
        var index = this.currentOrders.indexOf(oldOrder, 0);
        if (index > -1) {
            this.currentOrders[index] = newOrder;
        }
        // save the new list
        this.ordersService.saveOrders(this.currentOrders);
    }
}