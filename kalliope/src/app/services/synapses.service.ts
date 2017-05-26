/**
 * Created by monf on 26/05/17.
 */

import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class SynapsesService {
  http: any;
  baseUrl: String;
  user: String;
  password: String;

  constructor(http: Http) {
    this.http = http;
    this.baseUrl = 'http://localhost:5000/';
    this.user = 'admin';
    this.password = 'secret';
  }

  getSynapses() {
    let headers = new Headers();
    headers.append('Authorization', 'Basic ' + btoa(this.user + ':' + this.password));
    const options = new RequestOptions({headers: headers});
    return this.http.get(this.baseUrl + "synapses", options)
      .map(res => res.json());
  }

  runSynapse(synapseName: any) {
    let headers = new Headers();
    headers.append('Authorization', 'Basic ' + btoa(this.user + ':' + this.password));
    const options = new RequestOptions({headers: headers});
    return this.http.post(this.baseUrl + "synapses/start/id/"+synapseName, undefined , options)
      .map(res => res.json());
  }

}
