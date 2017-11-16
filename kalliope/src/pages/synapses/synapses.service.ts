import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/Rx';

import {Settings} from "../settings/settings";
import {Synapse} from "../../models/Synapse";
import {Observable} from "rxjs/Observable";
import {Serialization} from "../../serialization/Serialization";
import {OrderResponse} from "../../models/orderResponse";
import {Geofence} from "@ionic-native/geofence";
import {SettingsService} from "../settings/settings.service";
import {Geolocation} from "../../models/Geolocation";
import {Subject} from "rxjs/Subject";

/**
 * Service to manage the Synapse operations using the Kalliope Core API
 * @class SynapsesService
 */
@Injectable()
export class SynapsesService {
    http: any;
    geofence: Geofence;
    settings: Settings;
    synapses: Array<Synapse>;
    geofenceToLaunch: Subject<any> = new Subject<any>();
    subscritionDone: boolean = false; // True if synapse has already subscribed to geofence event.

    /**
     * @constructor
     * @param http {Http}
     */
    constructor(http: Http,
                public settingsService: SettingsService) {
        this.settings = settingsService.getDefaultSettings();
        this.http = http;
    }

    setGeofence(synapses: Array<Synapse>) {
        if (this.geofence == null) {
            this.geofence = new Geofence();
            this.geofence.initialize().then(
                function (initStatus) {
                    console.log("[SynapsesService] Geofence init status : "+initStatus);
                    this.initGeolocationSynapses(synapses);
                    this.geofence.onNotificationClicked().then(notificationData =>
                        console.log("App opened from Geo Notification!", notificationData));
            }.bind(this),
                err => console.log("[SynapsesService] Geofence fail to init : "+ err));
        }
    }


    private initGeolocationSynapses(synapses: Array<Synapse>) {
        synapses.filter(syn => syn.signal.name == 'geolocation').forEach(this.initGeolocationTrigger.bind(this))
    }

    private initGeolocationTrigger(geolocationSynapse: Synapse) {
        // casting signal to geolocation
        let geolocation: Geolocation = geolocationSynapse.signal as Geolocation;
        let fence = this.buildGeofence(geolocationSynapse.name, geolocation);

        this.geofence.addOrUpdate(fence).then(
            () => console.log('[Geolocation] Geofence ' + geolocationSynapse.name + ' added'),
            (err) => console.log('[Geolocation] Geofence ' + geolocationSynapse.name + ' failed to add')
        );

        this.geofence.onTransitionReceived().forEach(function(geofences) {
            geofences.forEach(geo => this.geofenceToLaunch.next(geo))
        }.bind(this));
    }

    private buildGeofence(synapseName: string, geolocation: Geolocation) {
        return {
            id: synapseName, //any unique ID
            latitude: geolocation._getLatitude(), //center of geofence radius
            longitude: geolocation._getLongitude(),
            radius: geolocation._getRadius(), //radius to edge of geofence in meters
            transitionType: 1, // TransitionType.ENTER
            // notification: { //notification settings // TODO notification.id must be number ! to be tested...
            //     id: synapseName, //any unique ID
            //     title: "You crossed a " + synapseName, //notification title
            //     text: "[latitude -> " + geolocation._getLatitude() + ", longitude -> " + geolocation._getLongitude() + "]", //notification body
            //     openAppOnClick: true //open app when notification is tapped
            // }
        }
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
