import { OrdersService } from './../orders/orders.service';
import { NavController, ViewController, NavParams } from 'ionic-angular';
import { Component } from '@angular/core';


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

    constructor(public navCtrl: NavController, public viewCtrl: ViewController,
    private ordersService: OrdersService, private params: NavParams){

        // if we have received an order to update, place it into he view
        this.orderToUpdate = params.get('orderToUpdate');
        if (this.orderToUpdate != null){
            this.newOrder = this.orderToUpdate;
            this.updateCall = true;
        }

        // load current orders
        this.currentOrders = this.ordersService.loadOrders();
        if (this.currentOrders == null){
            this.currentOrders = [];
        }

        // test inside the button
        this.buttonText = "Add"
        if (this.updateCall){
            this.buttonText = "Update"
        }

    }

    dismiss() {
        this.viewCtrl.dismiss();
    }

    saveOrder(){
        console.log("[NewOrderPage] Saving new order " + this.newOrder)
        if (this.updateCall){
            console.log("update")
            // this is an update of an existing order
            this.updateOrder(this.newOrder, this.orderToUpdate);
        }else{
            this.currentOrders.push(this.newOrder);
            this.ordersService.saveOrders(this.currentOrders);
        }

        this.dismiss();
    }

    updateOrder(newOrder, oldOrder){
        // delete the order
        var index = this.currentOrders.indexOf(oldOrder, 0);
        if (index > -1) {
            this.currentOrders[index] = newOrder;
        }
        // save the new list
        this.ordersService.saveOrders(this.currentOrders);

    }

}