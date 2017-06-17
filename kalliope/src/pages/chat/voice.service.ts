import {Settings} from '../settings/settings';
import 'rxjs/Rx';
// import {Http, Headers, RequestOptions} from '@angular/http';
import {HTTP} from '@ionic-native/http';
import {Injectable} from '@angular/core';
import {MediaFile} from "@ionic-native/media-capture";

@Injectable()
export class VoiceService {

    constructor(private httpService: HTTP) {

    }

    // TODO upload file not working yet ! :/
    postVoice(voiceFile: MediaFile, settings: Settings) {
        console.log("[VoiceService] call postVoice with URL: " + settings.url + ",user: " + settings.username + ",pass:" + settings.password);
        console.log("[VoiceService] call postVoice with FIle: " + voiceFile.toString());
        console.log("[VoiceService] call postVoice with voiceFile.type: " + voiceFile.type);
        console.log("[VoiceService] call postVoice with voiceFile.fullpath: " + voiceFile.fullPath);

        this.httpService.useBasicAuth(settings.username, settings.password);
        this.httpService.setHeader("Content-Type", "multipart/form-data");
        // let headers = new Headers();
        // headers.set('Authorization', 'Basic ' + btoa(settings.username + ':' + settings.password));
        // headers.set("Content-Type", "multipart/form-data");

        let url_to_call: string = "http://" + settings.url + "/synapses/start/order";
        let data = this.httpService.uploadFile(url_to_call, {}, {}, voiceFile.fullPath, 'file');
        return data;
    }
}