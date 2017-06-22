import {SettingsPage} from './../settings/settings.component';
import {SettingsService} from './../settings/settings.service';
import {Settings} from './../settings/settings';
import {OrdersService} from './../orders/orders.service';
import {ChatService} from './chat.service';
import {ChatMessage} from './../../models/ChatMessage';
import {Component} from '@angular/core';
import {NavController, LoadingController, ToastController} from 'ionic-angular';
import {NavParams} from 'ionic-angular';
import {CaptureError, MediaCapture, MediaFile} from "@ionic-native/media-capture";
import {VoiceService} from "./voice.service";
import {OrderResponse} from "../../models/orderResponse";

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

    /** Constructor */
    constructor(public navCtrl: NavController,
                private navParams: NavParams,
                private ordersService: OrdersService,
                public loadingCtrl: LoadingController,
                public toastCtrl: ToastController,
                private mediaCapture: MediaCapture,
                public settingsService: SettingsService,
                private voiceService: VoiceService,
                private chatService: ChatService) {

        // load the default chatMessages
        this.chatMessages = chatService.loadeChatMessages();
        if (this.chatMessages == null) {
            // no chat message yet. start a new list
            this.chatMessages = [];
        }

        // load settings from storage
        this.settings = settingsService.getDefaultSettings();
        if (this.settings == null) {
            this.nav.setRoot(SettingsPage);
        } else {
            console.log("Settings loaded. Url: " + this.settings.url);
        }

        // let orderResponse: OrderResponse = navParams.get('orderResponse');
        // // myOrder is the order from the user
        // let myOrder: string = navParams.get('myOrder');
        // if (orderResponse != null){
        //     this.loadNewMessage(orderResponse, myOrder);
        // }

        let orderFromOrderPage = navParams.get('orderFromOrderPage');
        if (orderFromOrderPage != null) {    // we received an order to process
            this.newMessage = orderFromOrderPage;
            this.sendMessage();
        }

    }

    loadNewMessage(orderResponse, myOrder) {
        console.log("[ChatPage] loadNewMessage: OrderResponse -> "+JSON.stringify(orderResponse));
        console.log("[ChatPage] loadNewMessage: myOrder -> "+ myOrder);
        // add the user order
        let myMessage = new ChatMessage();
        myMessage.sender = "Me";
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
                chatMessage.sender = "Kalliope";
                chatMessage.message = neuronModule.generatedMessage;
                this.chatMessages.push(chatMessage)
            }
        }
        // save the new chatMessage list
        this.chatService.saveChatMessages(this.chatMessages);
    }

    // Loader management
    startLoader() {
        // prepare loader
        this.loader = this.loadingCtrl.create({
            content: "Please wait...",
            duration: 3000
        });

        // start waiting gif
        this.loader.present();
    }

    stopLoader() {
        // stop the loader
        this.loader.dismiss();
    }

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

    // Screen
    handleError(error) {
        this.presentToast(error);
        console.log(error);
    }

    presentToast(message_to_print) {
        let toast = this.toastCtrl.create({
            message: message_to_print,
            duration: 3000,
            position: 'bottom'
        });
        toast.present();
    }

    cleanMessages() {
        this.chatMessages = [];
        this.chatService.saveChatMessages(this.chatMessages);
    }

    // Start Process
    processOrderResponse(orderResponse, sentMessage) {
        this.stopLoader();
        // clean the input
        this.newMessage = "";
        // reload the list with the response
        this.loadNewMessage(orderResponse, sentMessage);
    }


    recordVoice() {
        this.mediaCapture.captureAudio()
            .then(
                (data: MediaFile[]) => {
                    this.startLoader();
                    return this.voiceService.postVoice(data[0], this.settings)
                        .catch((error) => {
                            console.log('[ChatPage] recordVoice: error -> ' + error.error);
                            this.handleError(error);
                            this.stopLoader();
                        })
                        .then(data => {
                            console.log('[ChatPage] recordVoice: raw data -> '+ JSON.stringify(data));
                            let orderResponse = OrderResponse.responseToObject(JSON.parse(data['data']));
                            console.log('[ChatPage] recordVoice: orderResponse -> '+ JSON.stringify(orderResponse));
                            this.loadNewMessage(orderResponse, undefined);
                            this.stopLoader();
                        });
                },
                (err: CaptureError) => console.log(err)
            );
    }

}