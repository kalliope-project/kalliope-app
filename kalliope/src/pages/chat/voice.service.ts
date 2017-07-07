import {Settings} from '../settings/settings';
import 'rxjs/Rx';
import {HTTP, HTTPResponse} from '@ionic-native/http';
import {Injectable} from '@angular/core';
import {MediaFile} from "@ionic-native/media-capture";


/**
 *
 * The Service Class to manage Voice operations.
 * @class VoiceService
 */
@Injectable()
export class VoiceService {

    /**
     * Voice Constructor
     * @constructor
     * @param httpService {HTTP} the ionic native HTTP service - cordova plugin
     */
    constructor(private httpService: HTTP) {

    }

    /**
     * Upload a file to the Kalliope Core API (/synapses/start/audio)
     * @param voiceFile {MediaFile} the media file (audio) to upload
     * @param settings {Settings} settings to access the api
     * @return {Promise<HTTPResponse>} the HTTP response after uploading the file onto the Kalliope Core.
     */
    postVoice(voiceFile: MediaFile, settings: Settings): Promise<HTTPResponse> {
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