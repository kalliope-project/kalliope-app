import { MatchedSynapse } from './MatchedSynapses';
import {NeuronModule} from "./NeuronModule";
// {
//   "matched_synapses": [
//     {
//       "matched_order": "Bonjour",
//       "neuron_module_list": [
//         {
//           "generated_message": "Bonjour monsieur",
//           "neuron_name": "Say"
//         }
//       ],
//       "synapse_name": "say-hello-fr"
//     }
//   ],
//   "status": "complete",
//   "user_order": "Bonjour"
// }



export class OrderResponse {
    matchedSynapses: Array<MatchedSynapse>;
    status: string;
    userOrder: string;


    constructor(values: Object = {}) {
        Object.assign(this, values);
    }

    static responseToObject(jsonData){
        /**
         * Static Method
         * param: jsonData -> raw Javascript object
         * Convert a JSON response from kalliope API into a OrderResponse object
         */
        console.log('[OrderResponse] responseToObject: entry jsonData  -> '+JSON.stringify(jsonData));
        let orderResponse = new OrderResponse();
        orderResponse.status = jsonData["status"];
        orderResponse.userOrder = jsonData["user_order"];

        let matchedSynapses: Array<MatchedSynapse> = [];
        for (let entryMatchedSynapse of jsonData["matched_synapses"]) {
            let matchedSynapse = new MatchedSynapse();
            matchedSynapse.matchedOrder = entryMatchedSynapse["matched_order"];
            matchedSynapse.synapseName = entryMatchedSynapse["synapse_name"];

            let neuronModuleList: Array<NeuronModule>  = [];
            for (let entryNeuronModule of entryMatchedSynapse["neuron_module_list"]) {
                let neuronModule: NeuronModule = new NeuronModule();
                neuronModule.generatedMessage = entryNeuronModule["generated_message"];
                neuronModule.neuronName = entryNeuronModule["neuron_name"];
                neuronModuleList.push(neuronModule);
            }
            matchedSynapse.neuronModuleList = neuronModuleList;

            matchedSynapses.push(matchedSynapse)
        }
        orderResponse.matchedSynapses = matchedSynapses;
        console.log('[OrderResponse] responseToObject: output orderResponse  -> '+JSON.stringify(orderResponse));
        return orderResponse;
    }
}