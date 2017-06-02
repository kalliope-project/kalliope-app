import {Order} from "./order";
export class Synapse {

    /*
    * Attributes :
    * public name:string
    * public orders: Array<string>
    *
    * */

    constructor(public name:string,
                public orders:Array<Order>) {

    }

    toString(): string {
        return "Synapse : name -> "+this.name +
                ", orders -> "+ this.orders;
    }
}

