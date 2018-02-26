/**
 * Model Class to define the NeuronModule
 * @class NeuronModule
 */
export class NeuronModule {

    generatedMessage: string;
    neuronName: string;

    /**
     * @constructor
     * @param values {Object}
     */
    constructor(values: Object = {}) {
        Object.assign(values);
    }
}