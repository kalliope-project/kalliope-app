
import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';

import {MediaCapture, CaptureAudioOptions, CaptureError, MediaFile} from '@ionic-native/media-capture';

@Component({
    selector: 'page-synapses',
    templateUrl: 'voice.html'
})

export class VoicePage {

    constructor(public navCtrl: NavController,
                private mediaCapture: MediaCapture) {

    }

    ngOnInit() {
        console.log('Hello VoicePage');
    }


    recordVoice() {
        this.mediaCapture.captureAudio()
            .then(
                (data: MediaFile[]) => console.log(data),
                (err: CaptureError) => console.log(err)
            );
    }
}


