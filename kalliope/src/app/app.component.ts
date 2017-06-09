import {VoicePage} from "../pages/voice/voice.component";
import { SynapsesPage } from '../pages/synapses/synapses.component';
import { ChatPage } from './../pages/chat/chat.component';
import { OrdersPage } from './../pages/orders/orders.component';
import { SettingsPage } from './../pages/settings/settings.component';

import {Component, ViewChild} from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';

@Component({
    templateUrl: 'app.html'
})
export class MyApp {

    @ViewChild(Nav) nav: Nav;
    rootPage: any = OrdersPage;
    pages: Array<{title: string, component: any}>

    constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
        this.initializeApp();

        // used for an example of ngFor and navigation
        this.pages = [
            { title: 'Voice', component: VoicePage },
            { title: 'Orders', component: OrdersPage },
            { title: 'Synapses', component: SynapsesPage },
            { title: 'Chat', component: ChatPage },
            { title: 'Settings', component: SettingsPage }
        ];

        // remove this in prod! for testing only in order to clean the local storage at every new load
        // localStorage.clear();

    }

    initializeApp() {
        this.platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            this.statusBar.styleDefault();
            this.splashScreen.hide();
        });
    }

    openPage(page) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        this.nav.setRoot(page.component);
    }
}
