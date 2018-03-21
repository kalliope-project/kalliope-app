/**
 * The model class corresponding to Parameters
 * @class Param
 */
export class Param {

    /**
     * @constructor
     * @param name {string} the name of the param
     * @param value {string} the value of the param
     */
    constructor(public name: string,
                public value: any = '') {
    }

    /**
     * Convert a Param to a string
     * @return {string} The string corresponding to the Param
     */
    toString(): string {
        return this.name +"->" + this.value;
    }
}

