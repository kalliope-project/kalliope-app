import {Settings} from './settings';
import 'rxjs/Rx';
import {Http, Headers, RequestOptions} from '@angular/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';

/**
 * Service class to manage the settings.
 * @class SettingsService
 */
@Injectable()
export class SettingsService {

    /**
     * @constructor
     * @param httpService {Http} Service to handle the HTTP requests
     */
    constructor(private httpService: Http) {

    }

    /**
     * Provide the remote Kalliope Core version
     * @param settings {Settings} the model Settings to access API
     * @return {Observable<R>}
     */
    getVersion(settings: Settings): Observable<any> {
        console.log("[SettingsService] getVersion: URL -> " + settings.url + ",user: " + settings.username, ",pass:" + settings.password);

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

    /**
     * Log the Error into the console
     * @param error
     * @return {any}
     */
    logError(error) {
        console.error("[SettingsService] logError: error -> " + error);
        return Observable.throw(error.json().error || 'Server error');
    }

    /**
     * Log the Kalliope Version
     * @param version
     */
    saveVersion(version: string) {
        console.log("[SettingsService] saveVersion: kalliope Core version -> " + version);
    }

    /**
     * Retrieve the Settings
     * @return {Settings}
     */
    getDefaultSettings(): Settings {
        return JSON.parse(localStorage.getItem('settings'));
    }

    /**
     * Save the Settings into the local storage
     * @param settings {Settings}
     */
    setDefaultSettings(settings: Settings) {
        return localStorage.setItem('settings', JSON.stringify(settings));
    }

    /**
     * Remove the Settings from the local storage
     * @return
     */
    detroyDefaultSettings() {
        return localStorage.removeItem('settings');
    }
}

