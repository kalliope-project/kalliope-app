import {Param} from "./param";

/**
 * The model class corresponding to the Order
 * @class Order
 */
export class Order {

    /*
     * Attributes :
     * public name:string
     * public param: Array<Param>
     *
     * */

    /**
     * @constructor
     * @param value {string} the order value
     * @param params {Array<Param>} the list of Param
     */
    constructor(public value: string,
                public params: Array<Param> = []) {

        this.params = this._getParamBetweenBracketsList(this.value);

    }

    /**
     * Retrieve the list of Param from a given order
     * @param sentence {string} the sentence
     * @return {Array} the list of Param
     * @private
     */
    _getParamBetweenBracketsList(sentence: string): Array<Param> {
        let regexp = new RegExp(/((?:{{\s*)[\w\.]+(?:\s*}}))/g);
        let paramBetweenBracketsList = [];
        let matchingWordList = sentence.match(regexp);
        if (matchingWordList != null) {
            paramBetweenBracketsList = matchingWordList
                .map(b => b.replace('{{', '').replace('}}', ''))
                .map(b => new Param(b));
        }
        return paramBetweenBracketsList;
    }

    /**
     * Convert an Order to String
     * @return {string} The string corresponding to the order
     */
    toString(): string {
        return "Order : value -> " + this.value +
            ", params -> " + this.params;
    }
}



