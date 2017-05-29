/**
 * Created by monf on 26/05/17.
 */

import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/Rx';

import {Settings} from "../settings/settings";
import {Synapse} from "./synapse";

@Injectable()
export class SynapsesService {
    http: any;

    constructor(http: Http) {
        this.http = http;
    }

    getSynapses(settings: Settings) {
        let headers = new Headers();
        headers.append('Authorization', 'Basic ' + btoa(settings.username + ':' + settings.password));
        const options = new RequestOptions({headers: headers});
        return this.http.get('http://'+settings.url + '/synapses', options)
            .map(res => res.json());
    }

    runSynapse(synapse: Synapse,
               settings:Settings) {
        let headers = new Headers();
        headers.append('Authorization', 'Basic ' + btoa(settings.username + ':' + settings.password));
        const options = new RequestOptions({headers: headers});
        return this.http.post('http://'+settings.url +  '/synapses/start/id/' + synapse.name, undefined, options)
            .map(res => res.json())
    }
}
