
import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';

import {MediaCapture, /*CaptureAudioOptions,*/ CaptureError, MediaFile} from '@ionic-native/media-capture';
import {VoiceService} from "./voice.service";
import {SettingsService} from "../settings/settings.service";
import {Settings} from "../settings/settings";
import {SettingsPage} from "../settings/settings.component";
import {Observable} from "rxjs/Observable";

@Component({
    selector: 'page-synapses',
    templateUrl: 'voice.html'
})

export class VoicePage {

    settings: Settings;

    constructor(public navCtrl: NavController,
                private mediaCapture: MediaCapture,
                private voiceService: VoiceService,
                public settingsService: SettingsService,) {

        // load settings from storage
        this.settings = settingsService.getDefaultSettings();
        if (this.settings == null) {
            this.navCtrl.setRoot(SettingsPage);
        }else{
            console.log("[VoicePage] Settings loaded. Url: " + this.settings.url);
        }
    }

    ngOnInit() {
        console.log('Hello VoicePage');
    }


    recordVoice() {
        this.mediaCapture.captureAudio()
            .then(
                (data: MediaFile[]) => {
                    console.log('[recordVoice] the MediaFile size : '+ data.length);
                    console.log('[recordVoice] the MediaFile first element : '+ data[0]);
                    return this.voiceService.postVoice(data[0], this.settings)
                        .catch((error) => {
                            console.log('error: '+error.error);
                            console.log('status: '+error.status);
                            Observable.throw(error)
                        });
                        //.subscribe(orderResponse => console.log('orderResponse => '+orderResponse));
                },
                (err: CaptureError) => console.log(err)
            );
    }
}


