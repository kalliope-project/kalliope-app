import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/Rx';

import {Settings} from "../settings/settings";
import {Synapse} from "../../models/Synapse";
import {Order} from "../../models/Order";
import {Observable} from "rxjs/Observable";
import {Signal} from "../../models/Signal";
import {Geolocation} from "../../models/Geolocation";

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
     * Serialization from a Javascript Object to a Synapse model
     * @param responseJSON {Object} the Javascript Object
     * @return {Array<Synapse>} the list of Synapse
     */
    JSONToSynapse(responseJSON: Object): Array<Synapse> {
        let synapses: Array<Synapse> = [];
        if ('synapses' in responseJSON) {
            let synapsesJSON = responseJSON['synapses'];
            for (let synap of synapsesJSON) {
                if ('name' in synap) {
                    if ('signals' in synap) {
                        for (let signal of synap['signals']) {
                            if ('name' in signal) {
                                if ('order' === signal.name) {
                                    synapses.push(new Synapse(synap['name'], new Order(signal.parameters)));
                                }
                                if ('geolocation' == signal.name) {
                                    synapses.push(new Synapse(synap['name'], new Geolocation(signal.name, signal.parameters)))
                                }
                            }
                        }
                    }
                }
            }
        }
        return synapses;
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
            .map(res => this.JSONToSynapse(res.json()))
    }

    /**
     * Run a synapse from using the Kalliope Core API (/synapses/start/id/)
     * @param synapse {Synapse} the synapse to run
     * @param settings {Settings} the settings to access the Kalliope Core API
     * @return {Observable<array<Synapse>>}
     */
    runSynapse(synapse: Synapse,
               settings: Settings): Observable<Array<Synapse>> {
        let headers = new Headers();
        headers.append('Authorization', 'Basic ' + btoa(settings.username + ':' + settings.password));
        const options = new RequestOptions({headers: headers});

        // TODO kalliope Core v0.4.4 -> API does not handle Param POST !!
        // let param_dict = {}
        // for (let param of synapse.signal.params) {
        //     param_dict[param.name] = param.value;
        // }
        // let body = JSON.stringify(param_dict); // Stringify payload

        return this.http.post('http://' + settings.url + '/synapses/start/id/' + synapse.name, undefined, options)
            .map(res => res.json())
    }
}
