import {Param} from "./param";

/**
 * The model class corresponding to the Signal
 * @class Signal
 */

export interface SignalConstructor {
    new (name: string, params: Array<Param>): Signal
}

export abstract class Signal {

    protected name: string;
    protected params: Array<Param>;

    abstract toString(): string;

    /**
     * @constructor
     * @param value {string} the order value
     * @param params {Array<Param>} the list of Param
     */
    constructor(name: string, params: Array<Param>) {
        this.name = name;
        this.params = params;
    }

}




