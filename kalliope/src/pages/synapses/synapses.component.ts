import { SettingsPage } from './../settings/settings.component';
import {Component} from '@angular/core';
import {NavController, ToastController} from 'ionic-angular';
import {SynapsesService} from './synapses.service';
import {Settings} from './../settings/settings';
import {Synapse} from "../../models/Synapse";
import {Geofence} from "@ionic-native/geofence";
import {SettingsService} from "../settings/settings.service";
import {Subscription} from "rxjs/Subscription";
import {ChatPage} from "../chat/chat.component";
import {GeolocationPage} from "./geolocation.component";

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
    geofence: Geofence;
    settings: Settings;
    _geofenceSubscribtion: Subscription;


    /*TODO manage  geolocation in other tab */

    /**
     * @constructor
     * @param public navCtrl {NavController}
     * @param private synapseService {SynapsesService} Service to manage the synapses operations
     * @param public settingsService {SettingsService} Service to manage the settings
     */
    constructor(public navCtrl: NavController,
                public toastCtrl: ToastController,
                private settingsService: SettingsService,
                private synapseService: SynapsesService) {

        // load settings from storage
        this.settings = settingsService.getDefaultSettings();
        if (this.settings == null) {
            console.log("Settings not loaded. Redirect to settings page");
            this.navCtrl.setRoot(SettingsPage);
        } else {
            console.log("Settings loaded. Url: " + this.settings.url);
            this.geofence = this.synapseService.geofence;
            if (!this.synapseService.subscritionDone) {
                this.synapseService.subscritionDone = true;
                this._geofenceSubscribtion = this.synapseService.geofenceToLaunch.subscribe(
                    geo => this.raiseGeolocationSynapse(geo),
                    err => console.log("[SynapsesPage] Fail to raise the geolocation Synapse :"+ err));
            }
        }
    }

    ngOnInit() {
        if (this.settings != null) {
            this.getSynapsesToDisplay();
        }
    }

    /**
     * Run a synapse by its geofence geolocation.
     * (usefull in case of geolocation when we don't have access to the full Synapse.)
     * @param geofence {geofenceObject}
     */
    private raiseGeolocationSynapse(geofence) {
        this.synapseService.runSynapseByName(geofence.id, this.settings).subscribe(function (response) {
            this.navCtrl.setRoot(ChatPage, {
                responseFromGeolocation: response,
                geofence: geofence
            });
        console.log("[SynapsesPage] raiseGeolocationSynapse: Response from running synapse -> " + JSON.stringify(response));
    }.bind(this));
}

    /**
     * Retrieve the list of sysnapse from the Kalliope Core API
     */
    getSynapsesToDisplay() {
        if (this.settings != null){
            this.synapseService.getSynapses(this.settings).subscribe(response => {
                if (this.settings.geolocation) {
                    this.synapseService.setGeofence(response);
                }
                this.synapsesToDisplay = response.filter(syn => SynapsesPage.selectSynapseToDisplay(this.settings, syn));
                console.log("[SynapsesPage] getSynapsesToDisplay: fetched synapses list -> " + JSON.stringify(this.synapsesToDisplay));
            },
            err => {
                console.log("[SynapsesPage] getSynapsesToDisplay: Error fetching the synapses list ! -> " + err);
                this.synapsesToDisplay = [];
            });
        }

    }

    private static selectSynapseToDisplay(settings: Settings, synapse: Synapse): boolean {
        if (settings.geolocation) {
            return synapse.signal.name == 'order' || synapse.signal.name == 'geolocation';
        }
        return synapse.signal.name == 'order'
    }


    /**
     * Run a synapse calling the Kalliope Core API
     * @param synapse {Synapse}
     */
    runSynapse(synapse: Synapse) {
        this.synapseService.runSynapse(synapse, this.settings)
            .subscribe(response => {
                    console.log("[SynapsesPage] runSynapse: Response from running synapse -> " + JSON.stringify(response));
            })
    }

    displayGeolocation(synapse: Synapse) {
        this.navCtrl.setRoot(GeolocationPage, {
            geofenceSynapse: synapse
        });
    }


    /**
     * Displays the message at the bottom of the screen for 3000ms.
     * @param message_to_print {string} the message to display
     */
    presentToast(message_to_print: string) {
        let toast = this.toastCtrl.create({
            message: message_to_print,
            duration: 5000,
            position: 'bottom'
        });
        toast.present();
    }

    /*
    * Show a toast to explain what is the geolocation flag.
    * */
    showInfoGeolocation(){
        this.presentToast("If true, the application will manage geolocation signals from the kalliope brain");
    }

    /**
     * A setting has been updated from the client page, save the new status
     */
    geolocationSettingsUpdated(){
        console.log("[SynapsesPage] setting geolocation updated");
        this.getSynapsesToDisplay();
        this.settingsService.setDefaultSettings(this.settings);
    }

}


