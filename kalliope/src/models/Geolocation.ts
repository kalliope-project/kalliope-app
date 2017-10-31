import {Param} from "./Param";
import {Signal} from "./Signal";

import { Geofence } from '@ionic-native/geofence';

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


    /**
     * @constructor
     * @param params {Array<Param>} the list of Param
     */
    constructor(name:string, params: Array<Param>) {
        super(name, params);
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
}



