/**
 * Created by monf on 26/05/17.
 */
import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {SynapsesService} from './synapses.service'

@Component({
    selector: 'page-synapses',
    templateUrl: 'synapses.html'
})

export class SynapsesPage {

    synapses: Array<string>;
    ipAdress: string = 'localhost:5000';
    username: string = '';
    password: string = '';
    connexionOk: boolean = false;

    constructor(public navCtrl: NavController,
                private synapseService: SynapsesService) {
    }

    /*
     * On loading the synapse page start loading synapses from the Kalliope Core.
     * */
    ngOnInit() {
        this.getSettings();
        this.testConnection();
        this.getSynapse();
    }

    refreshPage() {
        this.getSettings();
        this.testConnection();
        this.getSynapse();
    }

    /*
     * Get the ipAdress, username and password values coming from the local storage.
     * */
    getSettings() {
        this.ipAdress = localStorage.getItem('ipAdress');
        this.password = localStorage.getItem('password');
        this.username = localStorage.getItem('username');
    }

    /*
    *
    * Asynch Functionnals methods
    *
    * */


    /*
    * TODO : update it should be tested on version note on the getSynapses....
    * */
    testConnection() {
        this.connexionOk = false;
        this.synapseService.getSynapses(this.ipAdress, this.username, this.password)
            .subscribe(
                response => {
                    this.connexionOk = true;
                    console.log("[SynapsesPage] Connection OK, the Kalliope Version: " + JSON.stringify(response));
                },
                err => {
                    console.log("[SynapsesPage] Error fetching the synapses list ! : "+ err);
                    // this.navCtrl.push(SettingsPage);
                    // TODO find a way to update the settings page because this navCtrl is a new instance
                }
            );
    }

    getSynapse() {
        this.synapseService.getSynapses(this.ipAdress, this.username, this.password)
            .subscribe(
                response => {
                    this.synapses = response.synapses;
                    console.log("[SynapsesPage] fetched synapses list : " + JSON.stringify(this.synapses));
                },
                err => {
                    this.synapses = [];
                    console.log("[SynapsesPage] Error fetching the synapses list ! : "+ err);
                }
            );
    }

    runSynapse(synapseName) {
        this.synapseService.runSynapse(synapseName, this.ipAdress, this.username, this.password)
            .subscribe(response => {
                console.log("[SynapsesPage] Response from running synapse : " + JSON.stringify(response));
        });
    }
}


