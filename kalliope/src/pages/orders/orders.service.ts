import {OrderResponse} from './../../models/orderResponse';
import {Settings} from './../settings/settings';
import 'rxjs/Rx';
import {Http, Headers, RequestOptions} from '@angular/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';

/**
 * The Service Class to manage Orders operations.
 * @class OrdersService:
 */
@Injectable()
export class OrdersService {

    /**
     * @constructor
     * @param httpService {HTTP}
     */
    constructor(private httpService: Http) {

    }

    /**
     * POST the given order to Kalliope Core API (/synapses/start/order)
     * @param order {string} the order to send to the Kalliope Core API
     * @param settings {Settings} the Settings to access the Kalliope Core API
     * @return {Observable<OrderResponse>} The OrderResponse provided by the Kalliope Core.
     */
    postOrder(order: string, settings: Settings): Observable<OrderResponse> {
        console.log("[OrdersService] call postOrder with URL: " + settings.url
        + ",user: " + settings.username,
        ",pass:" + settings.password,
        ",no_voice:" + settings.noVoice);

        let headers = new Headers();
        headers.append('Authorization', 'Basic ' + btoa(settings.username + ':' + settings.password));
        headers.append('Content-Type', 'application/json');

        const options = new RequestOptions({
            headers: headers
        });

        let order_dict = {
            "order": order,
            "no_voice": settings.noVoice
        }

        let body = JSON.stringify(order_dict); // Stringify payload

        let url_to_call: string = "http://" + settings.url + "/synapses/start/order";
        let data = this.httpService.post(url_to_call, body, options).map(res => OrderResponse.responseToObject(res.json()));

        return data;
    }

    // Local Storage management ---------------------------

    /**
     * Saving the order list to the local storage.
     * @param orders {Array<string>} the
     */
    saveOrders(orders: Array<string>) {
        return localStorage.setItem('orders', JSON.stringify(orders));
    }

    /**
     * load the previous orders.
     * @return {Array<string>} the list of the previously given orders
     */
    loadOrders(): Array<string> {
        return JSON.parse(localStorage.getItem('orders'));
    }

}