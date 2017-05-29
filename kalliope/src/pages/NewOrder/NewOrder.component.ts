import { OrdersService } from './../orders/orders.service';
import { NavController, ViewController } from 'ionic-angular';
import { Component } from '@angular/core';


@Component({
    selector: 'page-neworder',
    templateUrl: 'NewOrder.html'
})
export class NewOrderPage {
    newOrder: string;

    constructor(public navCtrl: NavController, public viewCtrl: ViewController,  private ordersService: OrdersService){

    }

    dismiss() {
        this.viewCtrl.dismiss();
    }

    saveOrder(){
        console.log("[NewOrderPage] Saving new order " + this.newOrder)
        let currentOrders = this.ordersService.loadOrders();
        if (currentOrders == null){
            currentOrders = [];
        }
        currentOrders.push(this.newOrder);
        this.ordersService.saveOrders(currentOrders);
        this.dismiss();
    }

}