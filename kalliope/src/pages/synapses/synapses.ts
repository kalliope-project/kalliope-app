/**
 * Created by monf on 26/05/17.
 */
import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {SynapsesService} from './synapses.service'
import {SettingsPage} from "../settings/settings";

@Component({
    selector: 'page-synapses',
    templateUrl: 'synapses.html'
})

export class SynapsesPage {

    synapses: Array<string>;
    ipAdress: string;
    username: string;
    password: string;
    connexionOk: boolean = false;

    constructor(public navCtrl: NavController,
                private synapseService: SynapsesService) {
    }

    /*
     * On loading the synapse page start loading synapses from the Kalliope Core.
     * */
    ngOnInit() {
        this.getDefaults();
        this.getSynapse();
    }

    refreshPage() {
        this.connexionOk = false;
        this.getDefaults();
        this.getSynapse();
    }

    /*
     * Get the ipAdress, username and password values coming from the local storage.
     * */
    getDefaults() {
        if (localStorage.getItem('ipAdress') != null) {
            this.ipAdress = localStorage.getItem('ipAdress');
        } else {
            console.log("You need to set up the Kalliope Core IP Adress");
            this.navCtrl.push(SettingsPage);
        }

        if (localStorage.getItem('username') != null) {
            this.username = localStorage.getItem('username');
        } else {
            console.log("You need to set up the username of the Kalliope Core API");
            this.navCtrl.push(SettingsPage);
        }

        if (localStorage.getItem('password') != null) {
            this.password = localStorage.getItem('password');
        } else {
            console.log("You need to set up the password of the Kalliope Core API");
            this.navCtrl.push(SettingsPage);
        }

        this.connexionOk = true;
    }

    /*
    *
    * Asynch Functionnals methods
    *
    * */
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


