/**
 * Created by monf on 26/05/17.
 */
import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {SynapsesService} from '../../app/services/synapses.service'
import {SettingsPage} from "../settings/settings";

@Component({
    selector: 'page-synapses',
    templateUrl: 'synapses.html'
})

export class SynapsesPage {

    synapses: string;
    ipAdress: string;

    constructor(public navCtrl: NavController,
                private synapseService: SynapsesService) {
    }

    /*
     * On loading the synapse page start loading synapses from the Kalliope Core.
     * */
    ngOnInit() {
        this.getDefault();
        this.getSynapse();
    }

    refreshPage() {
        this.getDefault();
        this.getSynapse();
    }

    /*
     * Get the ipAdress value coming from the local storage.
     * */
    getDefault() {
        if (localStorage.getItem('ipAdress') != null) {
            this.ipAdress = localStorage.getItem('ipAdress');
        } else {
            console.log("You need to set up the Kalliope Core IP Adress");
            this.navCtrl.push(SettingsPage);
        }
    }

    getSynapse() {
        this.synapseService.getSynapses(this.ipAdress, 'admin', 'secret').subscribe(response => {
            this.synapses = response.synapses;
            console.log("[SynapsesPage] fetched synapses list : " + JSON.stringify(this.synapses));
        });
    }

    runSynapse(synapseName) {
        this.synapseService.runSynapse(synapseName, this.ipAdress, 'admin', 'secret').subscribe(response => {
            console.log("[SynapsesPage] Response from running synapse : " + JSON.stringify(response));
        });
    }
}


