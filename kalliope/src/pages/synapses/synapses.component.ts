
import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {SynapsesService} from './synapses.service'

/*  Access Settings */
import { SettingsService } from './../settings/settings.service';
import { Settings } from './../settings/settings';
import {Synapse} from "./synapse";
import {Order} from "./order";

@Component({
    selector: 'page-synapses',
    templateUrl: 'synapses.html'
})

export class SynapsesPage {

    synapses: Array<Synapse> = [];
    settings: Settings;
    selectedOrder:Order;

    constructor(public navCtrl: NavController,
                private synapseService: SynapsesService,
                public settingsService: SettingsService) {

        this.settings = settingsService.getDefaultSettings();
    }

    ngOnInit() {
        this.getSynapse();
    }

    getSynapse() {
        this.synapseService.getSynapses(this.settings).subscribe(
            response => {
                console.log("[SynapsesPage] fetched synapses list : " + JSON.stringify(response));
                this.synapses = response;
            },
            err => {
                console.log("[SynapsesPage] Error fetching the synapses list ! : "+ err);
                this.synapses = [];
            }
        );
    }

    runSynapse(synapse) {
        this.synapseService.runSynapse(synapse, this.settings)
            .subscribe(
                response => {
                    console.log("[SynapsesPage] Response from running synapse : " + JSON.stringify(response));
            })
    }
}


