import {Component} from '@angular/core';
import {Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';

import {TabsPage} from '../pages/tabs/tabs';
import {SynapsesService} from '../pages/synapses/synapses.service'

@Component({
    templateUrl: 'app.html',
    providers: [SynapsesService]
})
export class MyApp {
    rootPage: any = TabsPage;

    constructor(platform: Platform,
                statusBar: StatusBar,
                splashScreen: SplashScreen) {
        platform.ready().then(() => {
            statusBar.styleDefault();
            splashScreen.hide();
        });
    }
}
