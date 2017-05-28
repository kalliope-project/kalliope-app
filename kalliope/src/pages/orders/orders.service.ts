import { Settings } from './../settings/settings';
import 'rxjs/Rx';
import {Http, Headers, RequestOptions} from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class OrdersService {

    constructor(private httpService: Http) {

    }

    postOrder(order: string, settings: Settings){
        console.log("[OrdersService] call getVersion with URL: " + settings.url + ",user: " + settings.username, ",pass:" + settings.password);

        let headers = new Headers();
        headers.append('Authorization', 'Basic ' + btoa(settings.username + ':' + settings.password));
        headers.append('Content-Type', 'application/json');

        const options = new RequestOptions({
            headers: headers
        });

        let order_dict = {
            "order": order
        }

        let body = JSON.stringify(order_dict); // Stringify payload

        let url_to_call: string = "http://" + settings.url + "/synapses/start/order";
        return this.httpService.post(url_to_call, body, options)
            .map(res => res.json());
    }

}