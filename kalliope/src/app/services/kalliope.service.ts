import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/Rx';


@Injectable()
export class KalliopeService {
    http:any;
    baseUrl: String;

    constructor(http:Http) {
      this.http = http;
      this.baseUrl = 'http://127.0.0.1:5000/';
    }

    getSynapses() {
      return this.http.get(this.baseUrl+"/"+"synapses")
                    .map(res => res.json);
    }
}
