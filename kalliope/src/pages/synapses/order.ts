/**
 * Created by monf on 03/06/17.
 */

import {Param} from "./param";
export class Order {

    /*
     * Attributes :
     * public name:string
     * public param: Array<Param>
     *
     * */

    constructor(public value:string,
                public params: Array<Param> = []) {

        this.params = this._getParamBetweenBracketsList(this.value);

    }

    _getParamBetweenBracketsList(sentence: string): Array<Param> {
        let regexp = new RegExp(/((?:{{\s*)[\w\.]+(?:\s*}}))/g);
        let paramBetweenBracketsList = [];
        let matchingWordList = sentence.match(regexp);
        if (matchingWordList != null) {
            paramBetweenBracketsList = matchingWordList
                .map(b => b.replace('{{','').replace('}}',''))
                .map(b => new Param(b));
        }
        return paramBetweenBracketsList;
    }

    toString(): string {
        return "Order : value -> "+this.value +
            ", params -> "+ this.params;
    }
}



