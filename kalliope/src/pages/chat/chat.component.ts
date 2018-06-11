import {SettingsPage} from './../settings/settings.component';
import {SettingsService} from './../settings/settings.service';
import {Settings} from './../settings/settings';
import {OrdersService} from './../orders/orders.service';
import {ChatService} from './chat.service';
import {ChatMessage} from './../../models/ChatMessage';
import {Component} from '@angular/core';
import {NavController, LoadingController, ToastController} from 'ionic-angular';
import {NavParams} from 'ionic-angular';
import {CaptureError, MediaCapture} from "@ionic-native/media-capture";
import {VoiceService} from "./voice.service";
import {OrderResponse} from "../../models/orderResponse";
import { Media, MediaObject } from '@ionic-native/media';
import { File} from '@ionic-native/file';
import {Observable} from "rxjs/Observable";

/**
 * @class ChatPage: Components and behaviour Handlers of the Chat page.
 * */
@Component({
    selector: 'page-chat',
    templateUrl: 'chat.html'
})
export class ChatPage {

    /** Variables */
    chatMessages: Array<ChatMessage>;
    newMessage: string;
    loader;
    settings: Settings;
    nav: NavController;
    recordFile: MediaObject;
    isRecording: boolean = false;
    currTimeout;
    countDown: number = 10;

    /**
     * Chat Page constructor
     * @constructor
     * @param public navCtrl {NavController}
     * @param private navParams {NavParams}
     * @param private ordersService {OrdersService} the service managing the orders
     * @param public loadingCtrl {LoadingController} the controller to provide the Loading component
     * @param public toastCtrl {ToastController} the controller to provide the toast component
     * @param private mediaCapture {MediaCapture} the service to manage the media (audio) capture. (Cordova plugin)
     * @param public settingsService {SettingsService} the service managing the settings
     * @param private voiceService {VoiceService} the service managing the captured voice (audio)
     * @param private chatService {ChatService} the service managing the chat
     *
     */
    constructor(public navCtrl: NavController,
                private navParams: NavParams,
                private ordersService: OrdersService,
                public loadingCtrl: LoadingController,
                public toastCtrl: ToastController,
                private mediaCapture: MediaCapture,
                public settingsService: SettingsService,
                private voiceService: VoiceService,
                private chatService: ChatService,
                private media: Media,
                private file: File) {

        // chatService.clearStorage();

        // TODO: idea -> for each message put date over the chat bubbles ?

        // load the default chatMessages
        this.chatMessages = chatService.loadChatMessages();
        if (this.chatMessages == null) {
            // no chat message yet. start a new list
            this.chatMessages = [];
        }

        // load settings from storage
        this.settings = settingsService.getDefaultSettings();
        if (this.settings == null) {
            console.log("Settings not loaded. Redirect to settings page");
            this.navCtrl.setRoot(SettingsPage);
        } else {
            console.log("Settings loaded. Url: " + this.settings.url);
        }

        let orderFromOrderPage = navParams.get('orderFromOrderPage');
        if (orderFromOrderPage != null) {    // we received an order to process
            this.newMessage = orderFromOrderPage;
            this.sendMessage();
        }

        let responseFromGeolocation = navParams.get('responseFromGeolocation');
        if (responseFromGeolocation != null) {
            let geofence = navParams.get('geofence');
            let myOrder: string = new Date().toLocaleString()+" ***Geolocation signal*** "+geofence.id+" --> [latitude: "+ geofence.latitude+ ", longitude: "+geofence.longitude + ", radius: "+ geofence.radius+"]"
            this.loadNewMessage(responseFromGeolocation, myOrder);
        }

        let responseFromOrder = navParams.get('responseFromOrder');
        if (responseFromOrder != null) {
            let synapseOrder = navParams.get('synapseOrder');
            let myOrder: string = synapseOrder.name + ':  [' +  synapseOrder.signal.params.join("][") + "]";
            this.loadNewMessage(responseFromOrder, myOrder);
        }
    }

    /**
     * Display the User ("Me") and Kalliope interactions into the chat page.
     * @param orderResponse {OrderResponse} the OrderResponse coming back from the kalliopeCore.
     * @param myOrder {string} the order provided by the user, undefined if user recorded an audio order.
     */
    loadNewMessage(orderResponse: OrderResponse, myOrder: string) {
        console.log("[ChatPage] loadNewMessage: OrderResponse -> " + JSON.stringify(orderResponse));
        console.log("[ChatPage] loadNewMessage: myOrder -> " + myOrder);
        // add the user order
        let myMessage = new ChatMessage();
        myMessage.sender = "me";
        if (myOrder !== undefined) {
            myMessage.message = myOrder;
        } else { // myOrder is undefined
            myMessage.message = orderResponse.userOrder;
        }
        this.chatMessages.push(myMessage);

        // add each generated answer
        for (let matchedSynapse of orderResponse.matchedSynapses) {
            for (let neuronModule of matchedSynapse.neuronModuleList) {
                let chatMessage = new ChatMessage();
                chatMessage.sender = "you";
                chatMessage.message = neuronModule.generatedMessage;
                this.chatMessages.push(chatMessage)
            }
        }
        // save the new chatMessage list
        this.chatService.saveChatMessages(this.chatMessages);
    }

    // Loader management ---------------------------

    /**
     * Using the {LoadingCtrl} display a waiting message during 3000ms.
     */
    startLoader() {
        // prepare loader
        this.loader = this.loadingCtrl.create({
            content: "Please wait...",
            duration: 3000
        });

        // start waiting gif
        this.loader.present();
    }

    /**
     * Stopping the {LoadingCtrl} previously started by the 'startLoader' method
     */
    stopLoader() {
        // stop the loader
        this.loader.dismiss();
    }

    /**
     * Send the message provided by the user.
     */
    sendMessage() {
        if (this.newMessage != null) {
            //start the loader
            this.startLoader();
            // execute the order
            this.ordersService.postOrder(this.newMessage, this.settings).subscribe(
                orderResponse => this.processOrderResponse(orderResponse, this.newMessage),
                error => this.handleError(error));
        }
    }

    // Screen ---------------------------
    /**
     * Display a provided error using the {ToastController}
     * @param error {string} the error to display
     */
    handleError(error: string) {
        this.presentToast(error);
        console.log(error);
    }

    /**
     * Displays the message at the bottom of the screen for 3000ms.
     * @param message_to_print {string} the message to display
     */
    presentToast(message_to_print: string) {
        let toast = this.toastCtrl.create({
            message: message_to_print,
            duration: 3000,
            position: 'bottom'
        });
        toast.present();
    }

    /**
     * Remove all displayed messages from the chat page.
     */
    cleanMessages() {
        this.chatMessages = [];
        this.chatService.saveChatMessages(this.chatMessages);
    }

    // Start Process ---------------------------

    /**
     * Processing the OrderResponse message provided by the Kalliope Core API.
     * @param orderResponse {OrderResponse} the OrderResponse provided by Kalliope Core
     * @param sentMessage {string} the message written by the user
     */
    processOrderResponse(orderResponse: OrderResponse, sentMessage: string) {
        this.stopLoader();
        // clean the input
        this.newMessage = "";
        // reload the list with the response
        this.loadNewMessage(orderResponse, sentMessage);
    }

    recordVoice() {
        // Note : To be verified if it works on iOS : check official ionic doc
        this.recordFile = this.media.create(this.file.externalCacheDirectory + 'sound_file.mp3');
        this.isRecording = true;
        this.recordFile.startRecord();
        this.presentToast("Start recording");

        this.currTimeout = Observable.interval(1000).subscribe(v => {
            this.countDown--;
            if(this.countDown == 0) {
                this.stopRecordVoice();
                this.presentToast("Stop recording after 10 seconds");
            }
        });
    }

    stopRecordVoice() {
        this.currTimeout.unsubscribe();
        this.countDown = 10;
        this.recordFile.stopRecord();
        this.isRecording = false;
        //this.recordFile.play();

        //start the loader
        this.startLoader();
        this.voiceService.postVoice(this.file.externalCacheDirectory + 'sound_file.mp3', this.settings).then( response => {
            console.log("[Chat] stopRecordVoice -> audio response :  " + response.data);
            this.processOrderResponse(OrderResponse.responseToObject(JSON.parse(response.data)), undefined);
        });
    }

    handleErrorFromRecordVoice(err: CaptureError){
        console.log('[ChatPage] handleErrorFromRecordVoice: ' + err);
        const errorNoActivityFound = "No Activity found to handle Intent";
        let errortoString : String = err.toString()
        console.log("[ChatPage] err.code: " + errortoString);
        if (errortoString.includes(errorNoActivityFound)){
            this.handleError("You need a voice recorder application");
        }
    }

}