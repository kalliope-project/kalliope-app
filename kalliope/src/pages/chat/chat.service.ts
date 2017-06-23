import {ChatMessage} from './../../models/ChatMessage';
import {Injectable} from '@angular/core';

/**
 * Manage the Services related to the chat Page
 * @class ChatService
 */
@Injectable()
export class ChatService {

    /**
     * @constructor
     */
    constructor() {

    }

    /**
     * Save the message list using the local storage
     * @param chatMessages {Array<ChatMessage>} the list of chat message to save.
     */
    saveChatMessages(chatMessages: Array<ChatMessage>) {
        return localStorage.setItem('chatMessages', JSON.stringify(chatMessages));
    }

    /**
     * Retrieve the message list using from the local storage.
     * @return chatMessages {Array<ChatMessage>} the list of chat message previously saved into the local storage.
     */
    loadChatMessages(): Array<ChatMessage> {
        return JSON.parse(localStorage.getItem('chatMessages'));
    }
}