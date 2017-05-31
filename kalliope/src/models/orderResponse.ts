import { MatchedSynapse } from './MatchedSynapses';
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
}