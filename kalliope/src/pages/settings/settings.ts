
export class Settings {
    // url of kalliope api server
    url: string = '';
    username: string = '';
    password: string = '';

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}