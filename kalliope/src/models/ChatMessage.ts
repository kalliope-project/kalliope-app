export class ChatMessage{
    sender: string;
    message: string;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}