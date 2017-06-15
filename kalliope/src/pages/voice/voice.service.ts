import { Settings } from './../settings/settings';
import 'rxjs/Rx';
import {Http, Headers, RequestOptions} from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class VoiceService {

    constructor(private httpService: Http) {

    }

    postVoice(voiceFile: any, settings: Settings)/*: Observable <VoiceResponse> */ {
        console.log("[VoiceService] call postVocie with URL: " + settings.url + ",user: " + settings.username, ",pass:" + settings.password);

        let headers = new Headers();
        headers.append('Authorization', 'Basic ' + btoa(settings.username + ':' + settings.password));
        headers.append('Content-Type', 'multipart/form-data');
        headers.append('Accept', 'application/json');

        const options = new RequestOptions({
            headers: headers
        });

        let url_to_call: string = "http://" + settings.url + "/synapses/start/order";
        let data =  this.httpService.post(url_to_call, voiceFile, options).map(res => res.json());

        return data;
    }

}