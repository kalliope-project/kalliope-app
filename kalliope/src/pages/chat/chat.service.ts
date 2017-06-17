import {ChatMessage} from './../../models/ChatMessage';
import {Injectable} from '@angular/core';


@Injectable()
export class ChatService {

    constructor() {

    }

    saveChatMessages(chatMessages: Array<ChatMessage>) {
        return localStorage.setItem('chatMessages', JSON.stringify(chatMessages));
    }

    loadeChatMessages(): Array<ChatMessage> {
        return JSON.parse(localStorage.getItem('chatMessages'));
    }
}