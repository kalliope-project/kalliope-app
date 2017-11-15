import {Component} from '@angular/core';
import {MenuController, NavController, NavParams} from 'ionic-angular';
import {Settings} from './../settings/settings';
import {SettingsService} from "../settings/settings.service";
import {Geolocation} from "../../models/Geolocation";
import * as Leaflet from "leaflet";

/**
 * UI Component and Behaviour for the Synapse page
 * @class
 */
@Component({
    templateUrl: 'geolocation.html'
})

export class GeolocationPage {

    settings: Settings;
    private geolocationSignal: Geolocation; //TODO pass the synapse not just the signal
    private _radius: number;
    private _latLng: any;
    private circle: any;
    private map: any;


    /*TODO manage  geolocation in synapse page within a tab */

    /**
     * @constructor
     * @param public navCtrl {NavController}
     * @param private synapseService {SynapsesService} Service to manage the synapses operations
     * @param public settingsService {SettingsService} Service to manage the settings
     */
    constructor(public navCtrl: NavController,
                navParams: NavParams,
                private settingsService: SettingsService,
                private menu: MenuController) {
        this.settings = settingsService.getDefaultSettings();
        this.geolocationSignal = navParams.get("geofenceSynapse");
        this._radius = this.geolocationSignal._getRadius();
        this._latLng = Leaflet.latLng(this.geolocationSignal._getLatitude(), this.geolocationSignal._getLongitude());
    }


    ionViewDidLoad() {
        this.menu.enable(false);
        // workaround map is not correctly displayed
        // maybe this should be done in some other event
        setTimeout(this.loadMap.bind(this), 1000);
    }


    get radius() {
        return this._radius;
    }

    set radius(value) {
        this._radius = value;
        this.circle.setRadius(value);
    }

    set latLng(value) {
        this._latLng = value;
        this.circle.setLatLng(value);
    }

    get latLng() {
        return this._latLng;
    }

    loadMap() {
        this.map = Leaflet
            .map("map")
            .setView(this.latLng, 13)
            .on("click", this.onMapClicked.bind(this))

        Leaflet.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png")
            .addTo(this.map);

        this.circle = Leaflet.circle(this.latLng, this.radius).addTo(this.map);
    }

    onMapClicked(e) {
        this.latLng = e.latlng;
    }

    onMarkerPositionChanged(e) {
        const latlng = e.target.getLatLng();
        this.latLng = latlng;
    }
}


