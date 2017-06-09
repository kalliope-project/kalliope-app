/**
 * Created by monf on 02/06/17.
 */

export class Param {

    /*
     * Attributes :
     * public name:string
     * public value: string
     *
     * */

    constructor(public name:string,
                public value: string = '') {
    }

    toString(): string {
        return "Param : name -> "+this.name +
                ", value -> "+ this.value;
    }
}

