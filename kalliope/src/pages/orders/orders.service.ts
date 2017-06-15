import { MatchedSynapse } from './../../models/MatchedSynapses';
import { NeuronModule } from './../../models/NeuronModule';
import { OrderResponse } from './../../models/orderResponse';
import { Settings } from './../settings/settings';
import 'rxjs/Rx';
import {Http, Headers, RequestOptions} from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class OrdersService {

    constructor(private httpService: Http) {

    }

    postOrder(order: string, settings: Settings): Observable <OrderResponse>{
        console.log("[OrdersService] call postOrder with URL: " + settings.url + ",user: " + settings.username, ",pass:" + settings.password);

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
        let data =  this.httpService.post(url_to_call, body, options).map(res => this.responseToObject(res.json()));

        return data;
    }

    saveOrders(orders: Array<string>){
        return localStorage.setItem('orders', JSON.stringify(orders));
    }

    loadOrders(): Array<string>{
        return JSON.parse(localStorage.getItem('orders'));
    }

    responseToObject(jsonData){
        /**
         * Convert a JSON response from kalliope API into a OrderResponse object
         */

        let orderResponse = new OrderResponse();
        orderResponse.status = jsonData["status"];
        orderResponse.userOrder = jsonData["user_order"];

        let matchedSynapses: Array<MatchedSynapse> = [];
        for (let entryMatchedSynapse of jsonData["matched_synapses"]) {
            let matchedSynapse = new MatchedSynapse();
            matchedSynapse.matchedOrder = entryMatchedSynapse["matched_order"];
            matchedSynapse.synapseName = entryMatchedSynapse["synapse_name"];

            let neuronModuleList: Array<NeuronModule>  = [];
            for (let entryNeuronModule of entryMatchedSynapse["neuron_module_list"]) {
                let neuronModule: NeuronModule = new NeuronModule();
                neuronModule.generatedMessage = entryNeuronModule["generated_message"];
                neuronModule.neuronName = entryNeuronModule["neuron_name"];
                neuronModuleList.push(neuronModule);
            }
            matchedSynapse.neuronModuleList = neuronModuleList;

            matchedSynapses.push(matchedSynapse)
        }

        orderResponse.matchedSynapses = matchedSynapses;
        return orderResponse;


    }

}