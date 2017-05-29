import { NewOrderPage } from './../pages/NewOrder/NewOrder.component';
import { ChatService } from './../pages/chat/chat.service';
import { ChatPage } from './../pages/chat/chat.component';
import { OrdersService } from './../pages/orders/orders.service';
import { SynapsesService } from './../pages/synapses/synapses.service';
import { OrdersPage } from './../pages/orders/orders.component';
import { SettingsService } from './../pages/settings/settings.service';
import { SettingsPage } from './../pages/settings/settings.component';
import {NgModule, ErrorHandler} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {IonicApp, IonicModule, IonicErrorHandler} from 'ionic-angular';
import {MyApp} from './app.component';

import {SynapsesPage} from '../pages/synapses/synapses'

import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';

import {HttpModule} from '@angular/http';

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
        OrdersService,
        ChatService,
        {provide: ErrorHandler, useClass: IonicErrorHandler}
    ]
})
export class AppModule {
}
