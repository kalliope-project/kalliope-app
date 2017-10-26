import {Order} from "./Order";
import {Signal} from "./Signal";

/**
 * The model Class
 * @class Synapse
 */
export class Synapse {

    /*
     * Attributes :
     * public name:string
     * public signals: any // TODO should be an array ... did not find out how to bind objects
     *
     * */

    /**
     * @constructor
     * @param name {string} the name of the Synapse
     * @param signal {any} the Order corresponding
     */
    constructor(public name: string,
                public signal: Signal) {

    }

    /**
     * Convert a Synapse to a String
     * @return {string} The string corresponding to the Synapse
     */
    toString(): string {
        return "Synapse : name -> " + this.name +
            ", signal -> " + this.signal;
    }
}

