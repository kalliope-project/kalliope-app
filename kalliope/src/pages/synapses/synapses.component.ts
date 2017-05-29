/**
 * Created by monf on 26/05/17.
 */
import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {SynapsesService} from './synapses.service'

/*  Access Settings */
import { SettingsService } from './../settings/settings.service';
import { Settings } from './../settings/settings';
import {Synapse} from "./synapse";

@Component({
    selector: 'page-synapses',
    templateUrl: 'synapses.html'
})

export class SynapsesPage {

    synapses: Array<Synapse> = [];
    settings: Settings;

    constructor(public navCtrl: NavController,
                private synapseService: SynapsesService,
                public settingsService: SettingsService) {

        this.settings = settingsService.getDefaultSettings();
    }

    ngOnInit() {
        console.log('ICI');
        this.getSynapse();
    }

    JSONToSynapse(synapsesJSON: any) {
        for (var i=0; i< synapsesJSON.length; i++) {
            if ('name' in synapsesJSON[i]) {
                var synapse = new Synapse(synapsesJSON[i]['name']);
                this.synapses.push(synapse);
            }
        }
    }

    getSynapse() {
        this.synapseService.getSynapses(this.settings)
            .subscribe(
                response => {
                    console.log("[SynapsesPage] fetched synapses list : " + JSON.stringify(response.synapses));
                    this.JSONToSynapse(response.synapses);
                },
                err => {
                    console.log("[SynapsesPage] Error fetching the synapses list ! : "+ err);
                    this.synapses = [];
                }
            );
    }

    runSynapse(synapse) {
        this.synapseService.runSynapse(synapse, this.settings)
            .subscribe(response => {
                console.log("[SynapsesPage] Response from running synapse : " + JSON.stringify(response));
        });
    }
}


