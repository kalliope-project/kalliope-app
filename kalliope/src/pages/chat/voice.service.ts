import {Settings} from '../settings/settings';
import 'rxjs/Rx';
import {HTTP} from '@ionic-native/http';
import {Injectable} from '@angular/core';
import {MediaFile} from "@ionic-native/media-capture";

@Injectable()
export class VoiceService {

    constructor(private httpService: HTTP) {

    }

    postVoice(voiceFile: MediaFile, settings: Settings) {
        console.log("[VoiceService] postVoice: URL -> " + settings.url + ",user: " + settings.username + ",pass:" + settings.password);
        console.log("[VoiceService] postVoice: voiceFile.type -> " + voiceFile.type);
        console.log("[VoiceService] postVoice: voiceFile.fullpath -> " + voiceFile.fullPath);

        this.httpService.useBasicAuth(settings.username, settings.password);
        this.httpService.setHeader("Content-Type", "multipart/form-data");

        let url_to_call: string = "http://" + settings.url + "/synapses/start/audio";
        let data = this.httpService.uploadFile(url_to_call, {}, {}, voiceFile.fullPath, 'file');
        console.log("[VoiceService] : postVoice: data -> " + voiceFile.fullPath);
        return data;
    }
}