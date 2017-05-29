import { ChatService } from './chat.service';
import { OrderResponse } from './../../models/orderResponse';
import { ChatMessage } from './../../models/ChatMessage';
import { Settings } from './../settings/settings';
import {Component, ViewChild} from '@angular/core';
import { MenuController, ModalController, Nav, NavController, App, ToastController } from 'ionic-angular';
import { NavParams } from 'ionic-angular';

@Component({
    selector: 'page-chat',
    templateUrl: 'chat.html'
})
export class ChatPage {

    /** Variables */
    chatMessages: Array<ChatMessage>;

    /** Constructor */
    constructor(public navCtrl: NavController, private navParams: NavParams, private chatService: ChatService){

        // load the default chatMessages
        this.chatMessages = chatService.loadeChatMessages();
        if (this.chatMessages == null){
            // no chat message yet. start a new list
            this.chatMessages= [];
        }

        let orderResponse: OrderResponse = navParams.get('orderResponse');
        if (orderResponse != null){
            this.loadNewMessage(orderResponse);
        }

    }

    loadNewMessage(orderResponse){
        for (let matchedSynapse of orderResponse.matchedSynapses) {
            let myChatMessage = new ChatMessage();
            myChatMessage.sender = "Me";
            myChatMessage.message = matchedSynapse.matchedOrder;
            this.chatMessages.push(myChatMessage);

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


}