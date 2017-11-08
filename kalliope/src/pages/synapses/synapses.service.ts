import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/Rx';

import {Settings} from "../settings/settings";
import {Synapse} from "../../models/Synapse";
import {Observable} from "rxjs/Observable";
import {Serialization} from "../../serialization/Serialization";
import {OrderResponse} from "../../models/orderResponse";

/**
 * Service to manage the Synapse operations using the Kalliope Core API
 * @class SynapsesService
 */
@Injectable()
export class SynapsesService {
    http: any;

    /**
     * @constructor
     * @param http {Http}
     */
    constructor(http: Http) {
        this.http = http;
    }

    /**
     * Access the Kalliope Core API to get the list of synapses (/synapses).
     * @param settings {Settings} the settings to access the Kalliope Core API
     * @return {Observable<Array<Synapse>>}
     */
    getSynapses(settings: Settings): Observable<Array<Synapse>> {
        let headers = new Headers();
        headers.append('Authorization', 'Basic ' + btoa(settings.username + ':' + settings.password));
        const options = new RequestOptions({headers: headers});
        return this.http.get('http://' + settings.url + '/synapses', options)
            .map(res => Serialization.JSONToSynapse(res.json()))
    }

    /**
     * Run a synapse from using the Kalliope Core API (/synapses/start/id/)
     * @param synapse {Synapse} the synapse to run
     * @param settings {Settings} the settings to access the Kalliope Core API
     * @return {Observable<OrderResponse>}
     */
    runSynapse(synapse: Synapse,
               settings: Settings): Observable<OrderResponse> {
        return this.runSynapseByName(synapse.name, settings);
    }

    /**
     * Run a synapse by name from using the Kalliope Core API (/synapses/start/id/)
     * @param synapseName {string} the synapse name to run
     * @param settings {Settings} the settings to access the Kalliope Core API
     * @return {Observable<OrderResponse>}
     */
    runSynapseByName(synapseName: string,
               settings: Settings): Observable<OrderResponse> {
        let headers = new Headers();
        headers.append('Authorization', 'Basic ' + btoa(settings.username + ':' + settings.password));
        const options = new RequestOptions({headers: headers});
        // TODO kalliope Core v0.4.4 -> API does not handle Param POST !!
        // let param_dict = {}
        // for (let param of synapse.signal.params) {
        //     param_dict[param.name] = param.value;
        // }
        // let body = JSON.stringify(param_dict); // Stringify payload

        return this.http.post('http://' + settings.url + '/synapses/start/id/' + synapseName, undefined, options)
            .map(res => OrderResponse.responseToObject(res.json()))
    }
}
