/**
 * Created by monf on 26/05/17.
 */

import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/Rx';

import {Settings} from "../settings/settings";
import {Synapse} from "./synapse";
import {Order} from "./order";

@Injectable()
export class SynapsesService {
    http: any;

    constructor(http: Http) {
        this.http = http;
    }


    JSONToSynapse(responseJSON: any): Array<Synapse> {
        let synapses : Array<Synapse> = [];
        if ('synapses' in responseJSON) {
            let synapsesJSON = responseJSON.synapses;
            for (let synap of synapsesJSON) {
                if ('name' in synap) {
                    let synapseName = synap['name'];
                    let synapseOrder: Order;
                    if ('signals' in synap) {
                        for (let signal of synap['signals']){
                            if ('order' in signal) {
                                synapseOrder = new Order(signal['order']);
                            }
                        }
                    }
                    let synapse = new Synapse(synapseName, synapseOrder);
                    synapses.push(synapse);
                }
            }
        }
        return synapses;
    }

    getSynapses(settings: Settings) {
        let headers = new Headers();
        headers.append('Authorization', 'Basic ' + btoa(settings.username + ':' + settings.password));
        const options = new RequestOptions({headers: headers});
        return this.http.get('http://'+settings.url + '/synapses', options)
            .map(res => this.JSONToSynapse(res.json()))

    }

    runSynapse(synapse: Synapse,
               settings:Settings) {
        let headers = new Headers();
        headers.append('Authorization', 'Basic ' + btoa(settings.username + ':' + settings.password));
        const options = new RequestOptions({headers: headers});

        // TODO kalliope Core v0.4.4 -> API does not handle Param POST !!
        // let param_dict = {}
        // for (let param of synapse.order.params) {
        //     param_dict[param.name] = param.value;
        // }
        // let body = JSON.stringify(param_dict); // Stringify payload

        return this.http.post('http://'+settings.url +  '/synapses/start/id/' + synapse.name, undefined, options)
            .map(res => res.json())
    }
}
