import {Order} from "./order";
export class Synapse {

    /*
    * Attributes :
    * public name:string
    * public orders: Order // TODO should be an array ... did not find out how to bind objects
    *
    * */

    constructor(public name:string,
                public order:Order) {

    }

    toString(): string {
        return "Synapse : name -> "+this.name +
                ", order -> "+ this.order;
    }
}

