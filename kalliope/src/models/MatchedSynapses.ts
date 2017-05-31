import { NeuronModule } from './NeuronModule';


export class MatchedSynapse{

    matchedOrder: string;
    neuronModuleList: Array<NeuronModule>;
    synapseName: string

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}