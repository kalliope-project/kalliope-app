import { Settings } from './settings';
import 'rxjs/Rx';
import {Http, Headers, RequestOptions} from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class SettingsService {

    constructor(private httpService: Http) {

    }

    getVersion(settings: Settings): Observable < any > {
        console.log("[SettingsService] call getVersion with URL: " + settings.url + ",user: " + settings.username, ",pass:" + settings.password);

        let headers = new Headers();
        headers.append('Authorization', 'Basic ' + btoa(settings.username + ':' + settings.password));
        headers.append('Content-Type', 'application/json');

        const options = new RequestOptions({
            headers: headers
        });

        let url_to_call: string = "http://" + settings.url + "/";
        return this.httpService.get(url_to_call, options)
            .map(res => res.json());

    }

    logError(error) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }

    saveVersion(version) {
        /**
         * We can use this method to save the remote kalliope version
         */
        console.log(version);
    }

    getDefaultSettings(): Settings {
        return JSON.parse(localStorage.getItem('settings'));
    }

    setDefaultSettings(settings: Settings) {
        return localStorage.setItem('settings', JSON.stringify(settings));
    }

    detroyDefaultSettings() {
        return localStorage.removeItem('settings');
    }



}

