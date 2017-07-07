// Core
import {NgModule, ErrorHandler} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {IonicApp, IonicModule, IonicErrorHandler} from 'ionic-angular';
import {MyApp} from './app.component';
import {HttpModule} from '@angular/http';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';

// Pages
import {NewOrderPage} from './../pages/NewOrder/NewOrder.component';
import {OrdersPage} from './../pages/orders/orders.component';
import {ChatPage} from './../pages/chat/chat.component';
import {SettingsPage} from './../pages/settings/settings.component';
import {SynapsesPage} from '../pages/synapses/synapses.component'

// Services
import {OrdersService} from './../pages/orders/orders.service';
import {ChatService} from './../pages/chat/chat.service';
import {SynapsesService} from './../pages/synapses/synapses.service';
import {SettingsService} from './../pages/settings/settings.service';
import {VoiceService} from "../pages/chat/voice.service";

// ionic Cordova plugins
import {MediaCapture} from '@ionic-native/media-capture';
import {HTTP} from '@ionic-native/http';

@NgModule({
    declarations: [
        MyApp,
        SynapsesPage,
        SettingsPage,
        OrdersPage,
        ChatPage,
        NewOrderPage
    ],
    imports: [
        BrowserModule,
        HttpModule,
        IonicModule.forRoot(MyApp)
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        SynapsesPage,
        SettingsPage,
        OrdersPage,
        ChatPage,
        NewOrderPage
    ],
    providers: [
        StatusBar,
        SplashScreen,
        SettingsService,
        SynapsesService,
        VoiceService,
        OrdersService,
        ChatService,
        MediaCapture,
        HTTP,
        {provide: ErrorHandler, useClass: IonicErrorHandler}
    ]
})
export class AppModule {
}
