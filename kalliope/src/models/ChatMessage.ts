/**
 * Model Class to define a Chat Message.
 * @class ChatMessage
 */
export class ChatMessage{
    sender: string;
    message: string;

    /**
     * @constructor
     * @param values {Object} the corresponding Javascript Object
     */
    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}