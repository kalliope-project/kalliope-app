import {Param} from "./Param";
import {Signal} from "./Signal";

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

    protected latitude: Param;
    protected longitude: Param;
    protected radius: Param;

    /**
     * @constructor
     * @param name {string} the order name
     * @param params {Array<Param>} the list of Param
     */
    constructor(name: string, params: Array<Param>) {
        super(name, params);
        this.latitude = Geolocation._getLatitude(params);
        this.longitude = Geolocation._getLongitude(params);
        this.radius = Geolocation._getRadius(params);
    }

    private static _getLatitude(params: Array<Param>): Param {
        return params.find(p => p.name == 'latitude');
    }

    private static _getLongitude(params: Array<Param>): Param {
        return params.find(p => p.name == 'longitude');
    }

    private static _getRadius(params: Array<Param>): Param {
        return params.find(p => p.name == 'radius');
    }
}



