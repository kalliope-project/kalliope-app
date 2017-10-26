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
    protected params: Array<Param>;


    /**
     * @constructor
     * @param name {string} the order name
     * @param params {Array<Param>} the list of Param
     */
    constructor(name: string, params: Array<Param>) {
        super(name, params);
    }
}



