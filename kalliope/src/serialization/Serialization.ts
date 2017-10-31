import 'rxjs/Rx';
import {Param} from "../models/Param";
import {Order} from "../models/Order";
import {Synapse} from "../models/Synapse";
import {Geolocation} from "../models/Geolocation";

/**
 * Manage the global serialization of the Synapse object coming from the Kalliope Core API
 * @class Serialization
 */
export module Serialization {

    /**
     * Serialization from a Javascript Object to a Synapse model
     * @param responseJSON {Object} the Javascript Object
     * @return {Array<Synapse>} the list of Synapse
     */
    export function JSONToSynapse(responseJSON: Object): Array<Synapse> {
        let synapses: Array<Synapse> = [];
        if ('synapses' in responseJSON) {
            let synapsesJSON = responseJSON['synapses'];
            for (let synap of synapsesJSON) {
                if ('name' in synap) {
                    if ('signals' in synap) {
                        for (let signal of synap['signals']) {
                            if ('name' in signal) {
                                if ('order' === signal.name) {
                                    /*
                                    * In this case,
                                    * 1/ signal.parameters is the sentence we need to extract parameters.
                                    * 2/ We don't use external parameters, just init a new array instead... to be continued
                                    * */
                                    synapses.push(new Synapse(synap['name'], new Order(signal.parameters, new Array<Param>())));
                                }
                                else if ('geolocation' == signal.name) {
                                    synapses.push(
                                        new Synapse(
                                            synap['name'],
                                            new Geolocation(signal.name, Serialization._getArrayParamFromObjectParameters(signal.parameters))
                                        )
                                    )
                                }
                            }
                        }
                    }
                }
            }
        }
        return synapses;
    }

    export function _getArrayParamFromObjectParameters(params: Object): Array<Param> {
        return Object.keys(params).map(p => new Param(p, params[p]));
    }
}
