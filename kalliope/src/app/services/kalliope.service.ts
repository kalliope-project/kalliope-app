import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/Rx';


@Injectable()
export class KalliopeService {
    http:any;
    baseUrl: String;
    user: String;
    password: String;

    constructor(http:Http) {
      this.http = http;
      this.baseUrl = 'http://localhost:5000/';
      this.user = 'admin';
      this.password = 'secret';
    }

    getSynapses() {
      let headers =  new Headers();
      headers.append('Authorization','Basic ' + btoa(this.user+':'+this.password));
      let options = new RequestOptions({headers: headers});
      return this.http.get(this.baseUrl+"synapses", options)
                          .map(res => res.text())
    }
}
