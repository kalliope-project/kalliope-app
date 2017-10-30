import {Param} from "./Param";
import {Signal} from "./Signal";

import { Geofence } from '@ionic-native/geofence';
import {Transition} from "ionic-angular";

/**
 * The model class corresponding to the Order
 * @class Order
 */
export class Geolocation extends Signal {

    /*
     * Attributes :
     * protected name:string
     * protected param: Array<Param>
     *
     * */
    public name: string;
    public params: Array<Param>;

    private geofence: Geofence = new Geofence();

    /**
     * @constructor
     * @param name {string} the order name
     * @param params {Array<Param>} the list of Param
     */
    constructor(name: string, params: Array<Param>) {
        super(name, params);
        // initialize the geofence
        this.geofence.initialize().then(
            // resolved promise does not return a value
            () => console.log('[Geolocation] Geofence Plugin Ready'),
            (err) => console.log(err)
        );
        this.addGeofence();
    }

    public _getLatitude(): number {
        return this.params.find(p => p.name == 'latitude').value;
    }

    public _getLongitude(): number {
        return this.params.find(p => p.name == 'longitude').value;
    }

    public _getRadius(): any {
        return this.params.find(p => p.name == 'radius').value;
    }

    private addGeofence() {
        let fence = {
            id: this.name, //any unique ID
            latitude: this._getLatitude(), //center of geofence radius
            longitude: this._getLongitude(),
            radius: this._getRadius(), //radius to edge of geofence in meters
            transitionType: 1 // TransitionType.ENTER
        }

        this.geofence.addOrUpdate(fence).then(
            () => console.log('[Geolocation] Geofence ' + this.name + ' added'),
            (err) => console.log('[Geolocation] Geofence ' + this.name + ' failed to add')
        );
    }
}



