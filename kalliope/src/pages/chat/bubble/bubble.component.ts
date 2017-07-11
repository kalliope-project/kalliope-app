import { ChatMessage } from './../../../models/ChatMessage';
import { Component, Input } from '@angular/core';

/**
 * Model Class to define a bubble .
 * @class Bubble
 */
@Component({
    selector: 'chat-bubble',
    templateUrl: 'bubble.html'
})
export class Bubble{
    @Input() chatMessage: ChatMessage;

    constructor() {

    }
}