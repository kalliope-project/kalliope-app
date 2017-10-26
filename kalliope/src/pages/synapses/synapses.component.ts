import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {SynapsesService} from './synapses.service';
import {SettingsService} from './../settings/settings.service';
import {Settings} from './../settings/settings';
import {Synapse} from "../../models/Synapse";

/**
 * UI Component and Behaviour for the Synapse page
 * @class
 */
@Component({
    selector: 'page-synapses',
    templateUrl: 'synapses.html'
})
export class SynapsesPage {

    synapses: Array<Synapse> = [];
    settings: Settings;

    /**
     * @constructor
     * @param public navCtrl {NavController}
     * @param private synapseService {SynapsesService} Service to manage the synapses operations
     * @param public settingsService {SettingsService} Service to manage the settings
     */
    constructor(public navCtrl: NavController,
                private synapseService: SynapsesService,
                public settingsService: SettingsService) {

        this.settings = settingsService.getDefaultSettings();
    }

    ngOnInit() {
        this.getOrderSynapses();
    }

    /**
     * Retrieve the list of sysnapse from the Kalliope Core API
     */
    getOrderSynapses() {
        return this.synapseService.getSynapses(this.settings).subscribe(
            response => {
                let reponseOrder = response.filter(synapse => synapse.signal.name == 'order');
                console.log("[SynapsesPage] getOrderSynapses: fetched synapses list -> " + JSON.stringify(reponseOrder));
                this.synapses = reponseOrder;
            },
            err => {
                console.log("[SynapsesPage] getOrderSynapses: Error fetching the synapses list ! -> " + err);
                this.synapses = [];
            }
        );
    }

    /*
    * TODO select only Order synapses
    * */

    /**
     * Run a synapse calling the Kalliope Core API
     * @param synapse {Synapse}
     */
    runSynapse(synapse: Synapse) {
        this.synapseService.runSynapse(synapse, this.settings)
            .subscribe(
                response => {
                    console.log("[SynapsesPage] runSynapse: Response from running synapse -> " + JSON.stringify(response));
                })
    }
}


