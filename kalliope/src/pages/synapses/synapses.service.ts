/**
 * Created by monf on 26/05/17.
 */

import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class SynapsesService {
    http: any;

    constructor(http: Http) {
        this.http = http;
    }

    getSynapses(ipAdress: string,
                username: string,
                password: string) {
        let headers = new Headers();
        headers.append('Authorization', 'Basic ' + btoa(username + ':' + password));
        const options = new RequestOptions({headers: headers});
        return this.http.get('http://'+ipAdress + '/synapses', options)
            .map(res => res.json());
    }

    runSynapse(synapseName: any,
               ipAdress: string,
               username: string,
               password: string) {
        let headers = new Headers();
        headers.append('Authorization', 'Basic ' + btoa(username + ':' + password));
        const options = new RequestOptions({headers: headers});
        return this.http.post('http://'+ipAdress +  '/synapses/start/id/' + synapseName, undefined, options)
            .map(res => res.json())
    }


    /*
    * note Kalliope does not need authentication to get the Version
    * */
    getVersion(ipAdress: string,
               username: string,
               password: string) {
        console.log("Ici le getVersion : username ->"+username+", password ->"+password);
        let headers = new Headers();
        headers.append('Authorization', 'Basic ' + btoa(username + ':' + password));
        const options = new RequestOptions({headers: headers});
        return this.http.get('http://'+ipAdress + '/', options)
            .map(res => res.json());
    }
}
