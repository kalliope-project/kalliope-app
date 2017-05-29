
export class Settings {
    // url of kalliope api server
    url: string = 'localhost:5000';
    username: string = '';
    password: string = '';

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}