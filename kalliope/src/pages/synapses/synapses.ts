/**
 * Created by monf on 26/05/17.
 */
import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {SynapsesService} from '../../app/services/synapses.service'

@Component({
    selector: 'page-synapses',
    templateUrl: 'synapses.html'
})

export class SynapsesPage {

    synapses: any;

    constructor(public navCtrl: NavController,
                private synapseService: SynapsesService) {

    }

    /*
     * On loading the synapse page start loading synapses from the Kalliope Core.
     * */
    ngOnInit() {
        this.getSynapse();
    }

    getSynapse() {
        this.synapseService.getSynapses().subscribe(response => {
            this.synapses = response.synapses;
            console.log("[SynapsesPage] fetched synapses list : " + JSON.stringify(this.synapses));
        });
    }

    runSynapse(synapseName) {
        this.synapseService.runSynapse(synapseName).subscribe(response => {
            console.log("[SynapsesPage] Response from running synapse : " + JSON.stringify(response));
        });
    }

}


