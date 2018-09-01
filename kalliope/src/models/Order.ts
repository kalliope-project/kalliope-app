import {Param} from "./Param";
import {Signal} from "./Signal";

/**
 * The model class corresponding to the Order
 * @class Order
 */
export class Order extends Signal {

    /*
     * Attributes :
     * protected name:string
     * protected param: Array<Param>
     *
     * */
    public name;
    public params;
    public value;


    /**
     * @constructor
     * @param value {string} the order value
     * @param params {Array<Param>} the list of Param
     */
    constructor(value: string, params: Array<Param>) {
        let extractedParams: Array<Param> = Order._getParamBetweenBracketsList(value);
        super("order", params.concat(extractedParams));
        this.value = value;
    }

    /**
     * Retrieve the list of Param from a given order
     * @param sentence {string} the sentence
     * @return {Array} the list of Param
     * @private
     */
    static _getParamBetweenBracketsList(sentence: string): Array<Param> {
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



