import { SettingsPage } from './../settings/settings.component';
import { SettingsService } from './../settings/settings.service';
import { Settings } from './../settings/settings';
import { OrdersService } from './../orders/orders.service';
import { ChatService } from './chat.service';
import { ChatMessage } from './../../models/ChatMessage';
import {Component} from '@angular/core';
import { NavController, LoadingController, ToastController } from 'ionic-angular';
import { NavParams } from 'ionic-angular';

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
    constructor(
        public navCtrl: NavController,
        private navParams: NavParams,
        private ordersService: OrdersService,
        public loadingCtrl: LoadingController,
        public toastCtrl: ToastController,
        public settingsService: SettingsService,
        private chatService: ChatService){

        // load the default chatMessages
        this.chatMessages = chatService.loadeChatMessages();
        if (this.chatMessages == null){
            // no chat message yet. start a new list
            this.chatMessages= [];
        }

        // load settings from storage
        this.settings = settingsService.getDefaultSettings();
        if (this.settings == null) {
            this.nav.setRoot(SettingsPage);
        }else{
            console.log("Settings loaded. Url: " + this.settings.url);
        }

        // let orderResponse: OrderResponse = navParams.get('orderResponse');
        // // myOrder is the order from the user
        // let myOrder: string = navParams.get('myOrder');
        // if (orderResponse != null){
        //     this.loadNewMessage(orderResponse, myOrder);
        // }

        let orderFromOrderPage = navParams.get('orderFromOrderPage');
        if (orderFromOrderPage != null){    // we received an order to process
            this.newMessage = orderFromOrderPage;
            this.sendMessage();
        }

    }

    loadNewMessage(orderResponse, myOrder){
        // add the user order
        let myChatMessage = new ChatMessage();
        myChatMessage.sender = "Me";
        myChatMessage.message = myOrder;
        this.chatMessages.push(myChatMessage);

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

    cleanMessages(){
        this.chatMessages= [];
        this.chatService.saveChatMessages(this.chatMessages);
    }

    sendMessage(){
        if (this.newMessage != null){
            // prepare loader
            this.loader = this.loadingCtrl.create({
                content: "Please wait...",
                duration: 3000
            });

            // start waiting gif
            this.loader.present();

            // execute the order
            this.ordersService.postOrder(this.newMessage, this.settings).subscribe(
                orderResponse => this.processOrderResponse(orderResponse, this.newMessage),
                error => this.handleError(error));
        }

    }

    handleError(error){
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

    processOrderResponse(orderResponse, sentMessage){
        // stop the loader
        this.loader.dismiss();
        // clean the input
        this.newMessage = "";
        // relaod the list with the response
        this.loadNewMessage(orderResponse, sentMessage);
    }


}