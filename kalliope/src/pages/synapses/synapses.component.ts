import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {SynapsesService} from './synapses.service';
import {SettingsService} from './../settings/settings.service';
import {Settings} from './../settings/settings';
import {Synapse} from "../../models/Synapse";
import {Geofence} from "@ionic-native/geofence";
import {Geolocation} from "../../models/Geolocation";

/**
 * UI Component and Behaviour for the Synapse page
 * @class
 */
@Component({
    selector: 'page-synapses',
    templateUrl: 'synapses.html'
})
export class SynapsesPage {

    synapsesToDisplay: Array<Synapse> = [];
    geofence: Geofence = new Geofence();
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
        if (this.settings.geolocation) {
            // initialize the geofence
            this.geofence.initialize().then(
                // resolved promise does not return a value
                () => console.log('[Geolocation] Geofence Plugin Ready'),
                (err) => console.log(err)
            );
        }
    }

    ngOnInit() {
        this.getSynapsesToDisplay();
        // if (this.settings.geolocation) {
        //     //this.initGeolocationSynapses();
        // }
    }

    /**
     * Retrieve the list of sysnapse from the Kalliope Core API
     */
    getSynapsesToDisplay() {
        return this.synapseService.getSynapses(this.settings).subscribe(
            response => {
                let synapsesToDisplay = response.filter(syn => SynapsesPage.selectSynapseToDisplay(this.settings, syn));
                console.log("[SynapsesPage] getSynapsesToDisplay: fetched synapses list -> " + JSON.stringify(synapsesToDisplay));
                this.synapsesToDisplay = synapsesToDisplay;
            },
            err => {
                console.log("[SynapsesPage] getSynapsesToDisplay: Error fetching the synapses list ! -> " + err);
                this.synapsesToDisplay = [];
            }
        );
    }

    /*TODO manage geolocation properly */
    private static selectSynapseToDisplay(settings: Settings, synapse: Synapse)  {
        if (settings.geolocation) {
            return synapse.signal.name == 'order' || synapse.signal.name == 'geolocation';
        }
        return synapse.signal.name == 'order'
    }

    private initGeolocationSynapses() {
        this.synapsesToDisplay.filter(syn => syn.signal.name == 'geolocation').forEach(this.initGeolocationTrigger)
    }

    private initGeolocationTrigger(geolocationSynapse: Synapse) {
        // casting signal to geolocation
        let geolocation: Geolocation = geolocationSynapse.signal as Geolocation;
        let fence = {
            id: geolocation.name, //any unique ID
            latitude: geolocation._getLatitude(), //center of geofence radius
            longitude: geolocation._getLongitude(),
            radius: geolocation._getRadius(), //radius to edge of geofence in meters
            transitionType: 1 // TransitionType.ENTER
        }

        this.geofence.addOrUpdate(fence).then(
            () => console.log('[Geolocation] Geofence ' + geolocation.name + ' added'),
            (err) => console.log('[Geolocation] Geofence ' + geolocation.name + ' failed to add')
        );

        this.geofence.onTransitionReceived().forEach(geo => console.log('Geofence transition detected :' + geo.toString()));
    }


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


