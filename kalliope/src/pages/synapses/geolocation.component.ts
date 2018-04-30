import {Component} from '@angular/core';
import {NavController, NavParams, Platform} from 'ionic-angular';
import {Settings} from './../settings/settings';
import {Geolocation} from "../../models/Geolocation";
import * as Leaflet from 'leaflet';
import { Meta } from '@angular/platform-browser';
import {Synapse} from "../../models/Synapse";
import {SynapsesPage} from "./synapses.component";

/**
 * UI Component and Behaviour for the Synapse page
 * @class
 */
@Component({
    templateUrl: 'geolocation.html'
})

export class GeolocationPage {

    settings: Settings;
    private geolocationSignal: Geolocation;
    private geolocationSynapse: Synapse;
    private _radius: number;
    private _latLng: any;
    private circle: any;
    private map: any;
    private marker: any;


    /*TODO manage geolocation in synapse page within a tab */

    /**
     * @constructor
     * @param public navCtrl {NavController}
     * @param private navParams {NavParams} Navigation parameters.
     * @param public meta {Meta} Provide metadata.
     */
    constructor(public navCtrl: NavController,
                navParams: NavParams,
                platform: Platform,
                private meta: Meta) {
        this.meta.addTag({ name:"viewport", content:"width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" });
        this.geolocationSynapse = navParams.get("geofenceSynapse");
        this.geolocationSignal = this.geolocationSynapse.signal as Geolocation;
        this._radius = this.geolocationSignal._getRadius();
        this._latLng = Leaflet.latLng(this.geolocationSignal._getLatitude(), this.geolocationSignal._getLongitude());

        /*
        * Back to Synapse page when pressing the "hard" back button on the phone.
        * */
        platform.registerBackButtonAction(() => {
            this.navCtrl.setRoot(SynapsesPage);
        },1);
    }

    ngOnInit() {
        this.loadMap();
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

        this.map = Leaflet.map("map", {
            touchZoom: true,

        });

        Leaflet.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(this.map);

        this.circle = Leaflet.circle(this.latLng, {
            radius:this.radius,
            color: '#009688',
            fillColor: '#009688',
            fillOpacity: 0.3})
            .addTo(this.map); // bindpopup does not work as expected for this circle ! :(

        var icon = Leaflet.icon({
            iconUrl: "assets/marker/kalliopeBrain.png",
            shadowUrl: "assets/marker/marker-shadow.png",
            iconSize:     [100, 100], // size of the icon
            shadowSize:   [50, 64], // size of the shadow
        });

        Leaflet.marker(this.latLng, {icon: icon}).addTo(this.map).bindPopup(String(this.geolocationSynapse.name));

        this.map.locate({setView: true,
                                maxZoom: 18,
                                timeout: 100000,
                                maximumAge: 5000,
        });

        this.map.on('locationfound', this.onLocationFound.bind(this));
        this.map.on('locationerror', this.onLocationError.bind(this));

    }

    onLocationError(e) {
        alert("onLocationError :" + e.message);
    }

    onLocationFound(e) {
        var icon = Leaflet.icon({
            iconUrl: "assets/marker/user-marker.png",
            shadowUrl: "assets/marker/marker-shadow.png",
            iconSize:     [50, 50], // size of the icon
            shadowSize:   [30, 22], // size of the shadow
        });
        this.marker = Leaflet.marker(e.latlng, {icon: icon}).addTo(this.map).bindPopup("You");
    }
}


