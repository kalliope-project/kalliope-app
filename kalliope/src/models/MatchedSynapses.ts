import {NeuronModule} from './NeuronModule';

/**
 * Model Class to define the MatchedSynapses
 * Corresponding to the Kalliope Core API response.
 * @class MatchedSynapse
 */
export class MatchedSynapse {

    // model attributes
    matchedOrder: string;
    neuronModuleList: Array<NeuronModule>;
    synapseName: string

    /**
     * @constructor
     * @param values {Object}
     */
    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}