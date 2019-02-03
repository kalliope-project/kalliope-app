webpackJsonp([0],{

/***/ 140:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OrdersPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__settings_settings_component__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__NewOrder_NewOrder_component__ = __webpack_require__(252);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__chat_chat_component__ = __webpack_require__(91);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__orders_service__ = __webpack_require__(81);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__settings_settings_service__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_ionic_angular__ = __webpack_require__(29);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







/**
 * Component and Behaviour of the Order page
 * @class OrdersPage
 */
var OrdersPage = /** @class */ (function () {
    /**
     * @constructor
     * @param public navCtrl {NavController}
     * @param public settingsService {SettingsService} The service to handle settings
     * @param public modalCtrl {ModalController} Controller to manage the Modal
     * @param public menu {MenuController} Controller to manage the Menu
     * @param private app {App}
     * @param private ordersService {OrdersService} Service for orders
     * @param public actionSheetCtrl {ActionSheetController} Controller to manage ActionSheet
     */
    function OrdersPage(navCtrl, settingsService, modalCtrl, menu, app, ordersService, actionSheetCtrl) {
        this.navCtrl = navCtrl;
        this.settingsService = settingsService;
        this.modalCtrl = modalCtrl;
        this.menu = menu;
        this.app = app;
        this.ordersService = ordersService;
        this.actionSheetCtrl = actionSheetCtrl;
        // load settings from storage
        this.settings = settingsService.getDefaultSettings();
        if (this.settings == null) {
            console.log("Settings not loaded. Redirect to settings page");
            this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_0__settings_settings_component__["a" /* SettingsPage */]);
        }
        else {
            console.log("Settings loaded. Url: " + this.settings.url);
        }
        // load orders
        this.refreshOrders();
    }
    /**
     * Execute the given order
     * @param order {string} the order to execute.
     */
    OrdersPage.prototype.executeOrder = function (order) {
        /**
         * Execute the order on kalliope
         */
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__chat_chat_component__["a" /* ChatPage */], {
            orderFromOrderPage: order
        });
    };
    /**
     * Add a new order into the orders list.
     */
    OrdersPage.prototype.addNewOrder = function () {
        var _this = this;
        var modalNewOrder = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_1__NewOrder_NewOrder_component__["a" /* NewOrderPage */]);
        modalNewOrder.present();
        modalNewOrder.onDidDismiss(function (data) { return _this.refreshOrders(); });
    };
    /**
     * Refresh the orders list.
     */
    OrdersPage.prototype.refreshOrders = function () {
        this.orders = this.ordersService.loadOrders();
        if (this.orders == null) {
            this.orders = [];
        }
    };
    /**
     * UI Component to let the user 'Play, Edit, Delete, Cancel' a given order.
     * @param order {string} the given order.
     */
    OrdersPage.prototype.presentActionSheet = function (order) {
        var _this = this;
        var actionSheet = this.actionSheetCtrl.create({
            title: order,
            buttons: [
                {
                    text: 'Play',
                    icon: 'play',
                    handler: function () {
                        _this.executeOrder(order);
                    }
                },
                {
                    text: 'Edit',
                    icon: 'hammer',
                    handler: function () {
                        _this.updateOrder(order);
                    }
                },
                {
                    text: 'Delete',
                    role: 'destructive',
                    icon: 'trash',
                    handler: function () {
                        _this.deleteOrder(order);
                    }
                },
                {
                    text: 'Cancel',
                    role: 'cancel',
                    icon: 'close',
                    handler: function () {
                        console.log('Cancel clicked');
                    }
                }
            ]
        });
        actionSheet.present();
    };
    /**
     * Delete an order.
     * @param order {string} the given order to delete
     */
    OrdersPage.prototype.deleteOrder = function (order) {
        // delete the order
        var index = this.orders.indexOf(order, 0);
        if (index > -1) {
            this.orders.splice(index, 1);
        }
        // save the new list
        this.ordersService.saveOrders(this.orders);
    };
    /**
     * Update an order
     * @param order {string} the given order to update.
     */
    OrdersPage.prototype.updateOrder = function (order) {
        var _this = this;
        var modalNewOrder = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_1__NewOrder_NewOrder_component__["a" /* NewOrderPage */], { orderToUpdate: order });
        modalNewOrder.present();
        modalNewOrder.onDidDismiss(function (data) { return _this.refreshOrders(); });
    };
    OrdersPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_5__angular_core__["n" /* Component */])({
            selector: 'page-orders',template:/*ion-inline-start:"/home/monf/Projects/kalliope-app/kalliope/src/pages/orders/orders.html"*/'<ion-header>\n    <ion-toolbar color="green_material">\n        <button ion-button menuToggle>\n            <ion-icon name="menu"></ion-icon>\n        </button>\n        <ion-title>Orders</ion-title>\n    </ion-toolbar>\n</ion-header>\n\n<ion-content class="main_color" padding>\n\n    <ion-fab right bottom>\n        <button ion-fab color="green_material" (click)="addNewOrder()">\n            <ion-icon name="add"></ion-icon>\n        </button>\n    </ion-fab>\n\n    <ion-card *ngFor="let order of orders">\n\n        <ion-list>\n            <button ion-item (click)="presentActionSheet(order)">\n                {{ order }}\n            </button>\n        </ion-list>\n\n    </ion-card>\n\n\n</ion-content>'/*ion-inline-end:"/home/monf/Projects/kalliope-app/kalliope/src/pages/orders/orders.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_6_ionic_angular__["j" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_4__settings_settings_service__["a" /* SettingsService */],
            __WEBPACK_IMPORTED_MODULE_6_ionic_angular__["h" /* ModalController */],
            __WEBPACK_IMPORTED_MODULE_6_ionic_angular__["g" /* MenuController */],
            __WEBPACK_IMPORTED_MODULE_6_ionic_angular__["b" /* App */],
            __WEBPACK_IMPORTED_MODULE_3__orders_service__["a" /* OrdersService */],
            __WEBPACK_IMPORTED_MODULE_6_ionic_angular__["a" /* ActionSheetController */]])
    ], OrdersPage);
    return OrdersPage;
}());

//# sourceMappingURL=orders.component.js.map

/***/ }),

/***/ 141:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OrderResponse; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__MatchedSynapses__ = __webpack_require__(403);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__NeuronModule__ = __webpack_require__(404);


/**
 * The Model Object Class representing the OrderResponse provided by the Kalliope Core API.
 * @class OrderResponse
 *
 * eg : Kalliope Core API response :
 *
 {
  "matched_synapses": [
    {
      "matched_order": "Bonjour",
      "neuron_module_list": [
        {
          "generated_message": "Bonjour monsieur",
          "neuron_name": "Say"
        }
      ],
      "synapse_name": "say-hello-fr"
    }
  ],
  "status": "complete",
  "user_order": "Bonjour"
 }
 */
var OrderResponse = /** @class */ (function () {
    /**
     * @constructor
     * @param values {Object}
     */
    function OrderResponse(values) {
        if (values === void 0) { values = {}; }
        Object.assign(values);
    }
    /**
     * Deserialization method for the OrderResponse
     * from a given raw Javascript object returns an OrderResponse.
     * @static
     * @param jsonData {Object} the raw Javascript Object
     * @return {OrderResponse} the model OrderResponse
     */
    OrderResponse.responseToObject = function (jsonData) {
        /**
         * Static Method
         * param: jsonData -> raw Javascript object
         * Convert a JSON response from kalliope API into a OrderResponse object
         */
        console.log('[OrderResponse] responseToObject: entry jsonData  -> ' + JSON.stringify(jsonData));
        var orderResponse = new OrderResponse();
        orderResponse.status = jsonData["status"];
        orderResponse.userOrder = jsonData["user_order"];
        var matchedSynapses = [];
        for (var _i = 0, _a = jsonData["matched_synapses"]; _i < _a.length; _i++) {
            var entryMatchedSynapse = _a[_i];
            var matchedSynapse = new __WEBPACK_IMPORTED_MODULE_0__MatchedSynapses__["a" /* MatchedSynapse */]();
            matchedSynapse.matchedOrder = entryMatchedSynapse["matched_order"];
            matchedSynapse.synapseName = entryMatchedSynapse["synapse_name"];
            var neuronModuleList = [];
            for (var _b = 0, _c = entryMatchedSynapse["neuron_module_list"]; _b < _c.length; _b++) {
                var entryNeuronModule = _c[_b];
                var neuronModule = new __WEBPACK_IMPORTED_MODULE_1__NeuronModule__["a" /* NeuronModule */]();
                neuronModule.generatedMessage = entryNeuronModule["generated_message"];
                neuronModule.neuronName = entryNeuronModule["neuron_name"];
                neuronModuleList.push(neuronModule);
            }
            matchedSynapse.neuronModuleList = neuronModuleList;
            matchedSynapses.push(matchedSynapse);
        }
        orderResponse.matchedSynapses = matchedSynapses;
        console.log('[OrderResponse] responseToObject: output orderResponse  -> ' + JSON.stringify(orderResponse));
        return orderResponse;
    };
    return OrderResponse;
}());

//# sourceMappingURL=orderResponse.js.map

/***/ }),

/***/ 166:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 166;

/***/ }),

/***/ 211:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 211;

/***/ }),

/***/ 251:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SynapsesPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__settings_settings_component__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__synapses_service__ = __webpack_require__(353);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__settings_settings_service__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_local_notifications__ = __webpack_require__(356);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__chat_chat_component__ = __webpack_require__(91);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__geolocation_component__ = __webpack_require__(357);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








/**
 * UI Component and Behaviour for the Synapse page
 * @class
 */
var SynapsesPage = /** @class */ (function () {
    /**
     * @constructor
     * @param public navCtrl {NavController}
     * @param private synapseService {SynapsesService} Service to manage the synapses operations
     * @param public settingsService {SettingsService} Service to manage the settings
     */
    function SynapsesPage(navCtrl, toastCtrl, loadingCtrl, settingsService, localNotifications, synapseService) {
        this.navCtrl = navCtrl;
        this.toastCtrl = toastCtrl;
        this.loadingCtrl = loadingCtrl;
        this.settingsService = settingsService;
        this.localNotifications = localNotifications;
        this.synapseService = synapseService;
        this.synapsesToDisplay = [];
        // load settings from storage
        this.settings = settingsService.getDefaultSettings();
    }
    SynapsesPage_1 = SynapsesPage;
    SynapsesPage.prototype.ngOnInit = function () {
        if (this.settings == null) {
            console.log("[SynapsesPage] Settings not loaded. Redirect to settings page");
            this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_0__settings_settings_component__["a" /* SettingsPage */]);
        }
        else {
            console.log("[SynapsesPage] Settings loaded. Url: " + this.settings.url);
            this.getSynapsesToDisplay();
        }
    };
    SynapsesPage.prototype.geofenceSubscription = function () {
        this.geofence = this.synapseService.geofence;
        if (!this.synapseService.subscritionDone) {
            this.synapseService.subscritionDone = true;
            // next line to be commented out on browser
            this.geofence.onTransitionReceived().subscribe(function (geofences) {
                var _this = this;
                geofences.forEach(function (geo) { return _this.raiseGeolocationSynapse(geo); });
            }.bind(this)),
                function (err) { return console.log("[SynapsesPage] Fail to raise the geolocation Synapse :" + err); };
        }
    };
    /**
     * Run a synapse by its geofence geolocation.
     * (usefull in case of geolocation when we don't have access to the full Synapse.)
     * @param geofence {geofenceObject}
     */
    SynapsesPage.prototype.raiseGeolocationSynapse = function (geofence) {
        this.localNotifications.schedule({
            text: geofence.id
        });
        this.synapseService.runSynapseByName(geofence.id, this.settings).subscribe(function (response) {
            this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_6__chat_chat_component__["a" /* ChatPage */], {
                responseFromGeolocation: response,
                geofence: geofence
            });
            console.log("[SynapsesPage] raiseGeolocationSynapse: Response from running synapse -> " + JSON.stringify(response));
        }.bind(this));
    };
    /**
     * Retrieve the list of sysnapse from the Kalliope Core API
     */
    SynapsesPage.prototype.getSynapsesToDisplay = function () {
        var _this = this;
        if (this.settings != null) {
            this.synapseService.getSynapses(this.settings).subscribe(function (response) {
                _this.synapsesToDisplay = response.filter(function (syn) { return SynapsesPage_1.selectSynapseToDisplay(_this.settings, syn); });
                console.log("[SynapsesPage] getSynapsesToDisplay: fetched synapses list -> " + JSON.stringify(_this.synapsesToDisplay));
                if (_this.settings.geolocation) {
                    _this.synapseService.setGeofence(response);
                    _this.geofenceSubscription();
                }
            }, function (err) {
                console.log("[SynapsesPage] getSynapsesToDisplay: Error fetching the synapses list ! -> " + err);
                _this.synapsesToDisplay = [];
            });
        }
    };
    SynapsesPage.selectSynapseToDisplay = function (settings, synapse) {
        if (settings.geolocation) {
            return synapse.signal.name == 'order' || synapse.signal.name == 'geolocation';
        }
        return synapse.signal.name == 'order';
    };
    /**
     * Run a synapse calling the Kalliope Core API
     * @param synapse {Synapse}
     */
    SynapsesPage.prototype.runSynapse = function (synapse, order) {
        var _this = this;
        // View
        this.loader = this.loadingCtrl.create({
            content: "Running Synapse !"
        });
        this.loader.present();
        // Process
        this.synapseService.runSynapse(synapse, this.settings)
            .subscribe(function (response) {
            console.log("[SynapsesPage] runSynapse: Response from running synapse -> " + JSON.stringify(response));
            _this.loader.dismiss();
            _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_6__chat_chat_component__["a" /* ChatPage */], {
                responseFromSynapsePage: response,
                synapseOrder: order,
            });
        });
    };
    SynapsesPage.prototype.displayGeolocation = function (synapse) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_7__geolocation_component__["a" /* GeolocationPage */], {
            geofenceSynapse: synapse
        });
    };
    /**
     * Displays the message at the bottom of the screen for 3000ms.
     * @param message_to_print {string} the message to display
     */
    SynapsesPage.prototype.presentToast = function (message_to_print) {
        var toast = this.toastCtrl.create({
            message: message_to_print,
            duration: 5000,
            position: 'bottom'
        });
        toast.present();
    };
    /*
    * Show a toast to explain what is the geolocation flag.
    * */
    SynapsesPage.prototype.showInfoGeolocation = function () {
        this.presentToast("If true, the application will manage geolocation signals from the kalliope brain");
    };
    /**
     * A setting has been updated from the client page, save the new status
     */
    SynapsesPage.prototype.geolocationSettingsUpdated = function () {
        console.log("[SynapsesPage] setting geolocation updated");
        this.getSynapsesToDisplay();
        this.settingsService.setDefaultSettings(this.settings);
        if (!this.settings.geolocation) {
            this.synapseService.geofence.removeAll();
            this.synapseService.geofence = null;
            this.synapseService.subscritionDone = false;
            console.debug("[debug] geolocationSettingsUpdated");
        }
    };
    SynapsesPage = SynapsesPage_1 = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["n" /* Component */])({
            selector: 'page-synapses',template:/*ion-inline-start:"/home/monf/Projects/kalliope-app/kalliope/src/pages/synapses/synapses.html"*/'<ion-header>\n    <ion-toolbar color="green_material">\n        <button ion-button menuToggle>\n            <ion-icon name="menu"></ion-icon>\n        </button>\n        <ion-title>Synapses</ion-title>\n    </ion-toolbar>\n</ion-header>\n\n<ion-content class="main_color" padding>\n\n    <div *ngFor="let synapse of synapsesToDisplay">\n        <ion-card *ngIf="synapse.signal.name == \'order\'" class="synapse-ion-card">\n            <ion-card-header>\n                <button ion-button clear item-right icon-only (click)="runSynapse(synapse, synapse.signal)" class="synapse">\n                    {{synapse.name}}\n                    <ion-icon name="play"></ion-icon>\n                </button>\n            </ion-card-header>\n            <ion-list *ngFor="let param of synapse.signal.params" class="param">\n                <ion-input text-center [(ngModel)]="param.value" type="text" placeholder= {{param.name}}></ion-input>\n            </ion-list>\n        </ion-card>\n        <ion-card *ngIf="synapse.signal.name == \'geolocation\'" class="synapse-ion-card">\n            <ion-card-header>\n                <button ion-button clear item-right icon-only (click)="displayGeolocation(synapse)" class="synapse">\n                    {{synapse.name}}\n                    <ion-icon name="locate"></ion-icon>\n                </button>\n            </ion-card-header>\n        </ion-card>\n    </div>\n\n</ion-content>\n\n<ion-footer *ngIf=settings>\n    <ion-toolbar>\n        <ion-item>\n            <ion-label>Geolocation <ion-badge color="green_material" (click)="showInfoGeolocation()">?</ion-badge></ion-label>\n            <ion-toggle color="green_material" [(ngModel)]="settings.geolocation" (ionChange)="geolocationSettingsUpdated()"></ion-toggle>\n        </ion-item>\n    </ion-toolbar>\n</ion-footer>\n'/*ion-inline-end:"/home/monf/Projects/kalliope-app/kalliope/src/pages/synapses/synapses.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["j" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["m" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["f" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_4__settings_settings_service__["a" /* SettingsService */],
            __WEBPACK_IMPORTED_MODULE_5__ionic_native_local_notifications__["a" /* LocalNotifications */],
            __WEBPACK_IMPORTED_MODULE_3__synapses_service__["a" /* SynapsesService */]])
    ], SynapsesPage);
    return SynapsesPage;
    var SynapsesPage_1;
}());

//# sourceMappingURL=synapses.component.js.map

/***/ }),

/***/ 252:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NewOrderPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__orders_orders_service__ = __webpack_require__(81);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(1);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/**
 * Define components and behaviour on the NewOrderPage
 * @class newOrderPage
 */
var NewOrderPage = /** @class */ (function () {
    /**
     *
     * @constructor
     * @param public navCtrl {NavController}
     * @param public viewCtrl {ViewController} Controller to manage the View panel.
     * @param private ordersService {OrderService} Manage orders related services.
     * @param private params {NavParams}
     */
    function NewOrderPage(viewCtrl, ordersService, params) {
        this.viewCtrl = viewCtrl;
        this.ordersService = ordersService;
        this.params = params;
        this.updateCall = false; // used to know if we are updating an order
        // if we have received an order to update, place it into he view
        this.orderToUpdate = params.get('orderToUpdate');
        if (this.orderToUpdate != null) {
            this.newOrder = this.orderToUpdate;
            this.updateCall = true;
        }
        // load current orders
        this.currentOrders = this.ordersService.loadOrders();
        if (this.currentOrders == null) {
            this.currentOrders = [];
        }
        // test inside the button
        this.buttonText = "Add";
        if (this.updateCall) {
            this.buttonText = "Update";
        }
    }
    /**
     * remove the current view.
     */
    NewOrderPage.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    /**
     * Save the new Order.
     */
    NewOrderPage.prototype.saveOrder = function () {
        console.log("[NewOrderPage] saveOrder : Saving new order -> " + this.newOrder);
        if (this.updateCall) {
            console.log("[NewOrderPage] saveOrder : update");
            // this is an update of an existing order
            this.updateOrder(this.newOrder, this.orderToUpdate);
        }
        else {
            this.currentOrders.push(this.newOrder);
            this.ordersService.saveOrders(this.currentOrders);
        }
        this.dismiss();
    };
    /**
     * update an existing order.
     * @param newOrder {string} the new order which will replace the old one.
     * @param oldOrder {string} the old order.
     */
    NewOrderPage.prototype.updateOrder = function (newOrder, oldOrder) {
        console.log("[NewOrderPage] updateOrder : Saving new order -> " + newOrder);
        // delete the order
        var index = this.currentOrders.indexOf(oldOrder, 0);
        if (index > -1) {
            this.currentOrders[index] = newOrder;
        }
        // save the new list
        this.ordersService.saveOrders(this.currentOrders);
    };
    NewOrderPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["n" /* Component */])({
            selector: 'page-neworder',template:/*ion-inline-start:"/home/monf/Projects/kalliope-app/kalliope/src/pages/NewOrder/NewOrder.html"*/'<ion-header>\n    <ion-toolbar color="green_material">\n        <ion-title>\n            New order\n        </ion-title>\n        <ion-buttons start>\n            <button ion-button (click)="dismiss()">\n                <span ion-text color="light" showWhen="ios">Cancel</span>\n                <ion-icon name="md-close" showWhen="android,windows"></ion-icon>\n            </button>\n        </ion-buttons>\n    </ion-toolbar>\n</ion-header>\n\n<ion-content class="main_color" padding>\n\n    <ion-item>\n        <ion-label color="green_material" stacked>Order</ion-label>\n        <ion-textarea [(ngModel)]="newOrder" type="text"></ion-textarea>\n    </ion-item>\n\n    <div padding>\n        <button ion-button block color="green_material" (click)="saveOrder()">{{buttonText}}</button>\n    </div>\n</ion-content>'/*ion-inline-end:"/home/monf/Projects/kalliope-app/kalliope/src/pages/NewOrder/NewOrder.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* ViewController */],
            __WEBPACK_IMPORTED_MODULE_0__orders_orders_service__["a" /* OrdersService */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */]])
    ], NewOrderPage);
    return NewOrderPage;
}());

//# sourceMappingURL=NewOrder.component.js.map

/***/ }),

/***/ 346:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ChatService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

/**
 * Manage the Services related to the chat Page
 * @class ChatService
 */
var ChatService = /** @class */ (function () {
    /**
     * @constructor
     */
    function ChatService() {
    }
    /**
     * Save the message list using the local storage
     * @param chatMessages {Array<ChatMessage>} the list of chat message to save.
     */
    ChatService.prototype.saveChatMessages = function (chatMessages) {
        return localStorage.setItem('chatMessages', JSON.stringify(chatMessages));
    };
    /**
     * Retrieve the message list using from the local storage.
     * @return chatMessages {Array<ChatMessage>} the list of chat message previously saved into the local storage.
     */
    ChatService.prototype.loadChatMessages = function () {
        return JSON.parse(localStorage.getItem('chatMessages'));
    };
    /**
     * clear the whole local storage
     * Used for debug
     */
    ChatService.prototype.clearStorage = function () {
        localStorage.clear();
        console.log('all keys are cleared');
    };
    ChatService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
        __metadata("design:paramtypes", [])
    ], ChatService);
    return ChatService;
}());

//# sourceMappingURL=chat.service.js.map

/***/ }),

/***/ 347:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ChatMessage; });
/**
 * Model Class to define a Chat Message.
 * @class ChatMessage
 */
var ChatMessage = /** @class */ (function () {
    /**
     * @constructor
     * @param values {Object} the corresponding Javascript Object
     */
    function ChatMessage(values) {
        if (values === void 0) { values = {}; }
        Object.assign(values);
    }
    return ChatMessage;
}());

//# sourceMappingURL=ChatMessage.js.map

/***/ }),

/***/ 348:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return VoiceService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_Rx__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_rxjs_Rx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_native_http__ = __webpack_require__(349);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(1);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/**
 *
 * The Service Class to manage Voice operations.
 * @class VoiceService
 */
var VoiceService = /** @class */ (function () {
    /**
     * Voice Constructor
     * @constructor
     * @param httpService {HTTP} the ionic native HTTP service - cordova plugin
     */
    function VoiceService(httpService) {
        this.httpService = httpService;
    }
    /**
     * Upload a file to the Kalliope Core API (/synapses/start/audio)
     * @param voiceFile {FileEntry} the media file (audio) to upload
     * @param settings {Settings} settings to access the api
     * @return {Promise<HTTPResponse>} the HTTP response after uploading the file onto the Kalliope Core.
     */
    VoiceService.prototype.postVoice = function (voiceFile, settings) {
        console.log("[VoiceService] postVoice: URL -> " + settings.url + ",user: " + settings.username + ",pass:" + settings.password);
        console.log("[VoiceService] postVoice: voiceFile.fullpath -> " + voiceFile);
        this.httpService.useBasicAuth(settings.username, settings.password);
        this.httpService.setHeader(settings.url, "Content-Type", "multipart/form-data");
        var url_to_call = "http://" + settings.url + "/synapses/start/audio";
        var data = this.httpService.uploadFile(url_to_call, {}, {}, voiceFile, 'file');
        console.log("[VoiceService] : postVoice: data -> " + data);
        return data;
    };
    VoiceService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["B" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__ionic_native_http__["a" /* HTTP */]])
    ], VoiceService);
    return VoiceService;
}());

//# sourceMappingURL=voice.service.js.map

/***/ }),

/***/ 353:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SynapsesService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(90);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__serialization_Serialization__ = __webpack_require__(693);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__models_orderResponse__ = __webpack_require__(141);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_geofence__ = __webpack_require__(697);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__settings_settings_service__ = __webpack_require__(45);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







/**
 * Service to manage the Synapse operations using the Kalliope Core API
 * @class SynapsesService
 */
var SynapsesService = /** @class */ (function () {
    /**
     * @constructor
     * @param http {Http}
     */
    function SynapsesService(http, settingsService) {
        this.settingsService = settingsService;
        this.subscritionDone = false; // True if synapse has already subscribed to geofence event.
        this.settings = settingsService.getDefaultSettings();
        this.http = http;
    }
    SynapsesService.prototype.setGeofence = function (synapses) {
        var _this = this;
        if (this.geofence == null) {
            this.geofence = new __WEBPACK_IMPORTED_MODULE_5__ionic_native_geofence__["a" /* Geofence */]();
            this.geofence.initialize().then(function (initStatus) {
                console.log("[SynapsesService] Geofence Plugin has been initialized", initStatus);
                _this.initGeolocationSynapses(synapses);
            }).catch(function (error) {
                console.warn("[SynapsesService] failed to initialize geofence" + error);
            });
        }
    };
    SynapsesService.prototype.initGeolocationSynapses = function (synapses) {
        synapses.filter(function (syn) { return syn.signal.name == 'geolocation'; }).forEach(this.initGeolocationTrigger.bind(this));
    };
    SynapsesService.prototype.initGeolocationTrigger = function (geolocationSynapse) {
        // casting signal to geolocation
        var geolocation = geolocationSynapse.signal;
        var fence = this.buildGeofence(geolocationSynapse.name, geolocation);
        this.geofence.addOrUpdate(fence).then(function () { return console.log('[Geolocation] Geofence ' + geolocationSynapse.name + ' added'); }, function (err) { return console.log('[Geolocation] Geofence ' + geolocationSynapse.name + ' failed to add'); });
    };
    SynapsesService.prototype.buildGeofence = function (synapseName, geolocation) {
        return {
            id: synapseName,
            latitude: geolocation._getLatitude(),
            longitude: geolocation._getLongitude(),
            radius: geolocation._getRadius(),
            transitionType: 1,
        };
    };
    /**
     * Access the Kalliope Core API to get the list of synapses (/synapses).
     * @param settings {Settings} the settings to access the Kalliope Core API
     * @return {Observable<Array<Synapse>>}
     */
    SynapsesService.prototype.getSynapses = function (settings) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]();
        headers.append('Authorization', 'Basic ' + btoa(settings.username + ':' + settings.password));
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */]({ headers: headers });
        return this.http.get('http://' + settings.url + '/synapses', options)
            .map(function (res) { return __WEBPACK_IMPORTED_MODULE_3__serialization_Serialization__["a" /* Serialization */].JSONToSynapse(res.json()); });
    };
    /**
     * Run a synapse from using the Kalliope Core API (/synapses/start/id/)
     * @param synapse {Synapse} the synapse to run
     * @param settings {Settings} the settings to access the Kalliope Core API
     * @return {Observable<OrderResponse>}
     */
    SynapsesService.prototype.runSynapse = function (synapse, settings) {
        return this.runSynapseByName(synapse.name, settings, synapse.signal);
    };
    /**
     * Run a synapse by name from using the Kalliope Core API (/synapses/start/id/)
     * @param synapseName {string} the synapse name to run
     * @param settings {Settings} the settings to access the Kalliope Core API
     * @return {Observable<OrderResponse>}
     */
    SynapsesService.prototype.runSynapseByName = function (synapseName, settings, signal) {
        if (signal === void 0) { signal = undefined; }
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]();
        headers.append('Authorization', 'Basic ' + btoa(settings.username + ':' + settings.password));
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */]({ headers: headers });
        var param_dict = {
            mute: settings.mute,
            parameters: {} // "parameters" defined by the kalliopeCore API
        };
        if (signal != undefined) {
            for (var _i = 0, _a = signal.params; _i < _a.length; _i++) {
                var param = _a[_i];
                param_dict.parameters[param.name] = param.value;
            }
        }
        var body = JSON.stringify(param_dict); // Stringify payload
        return this.http.post('http://' + settings.url + '/synapses/start/id/' + synapseName, body, options)
            .map(function (res) { return __WEBPACK_IMPORTED_MODULE_4__models_orderResponse__["a" /* OrderResponse */].responseToObject(res.json()); });
    };
    SynapsesService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */],
            __WEBPACK_IMPORTED_MODULE_6__settings_settings_service__["a" /* SettingsService */]])
    ], SynapsesService);
    return SynapsesService;
}());

//# sourceMappingURL=synapses.service.js.map

/***/ }),

/***/ 354:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Param; });
/**
 * The model class corresponding to Parameters
 * @class Param
 */
var Param = /** @class */ (function () {
    /**
     * @constructor
     * @param name {string} the name of the param
     * @param value {string} the value of the param
     */
    function Param(name, value) {
        if (value === void 0) { value = ''; }
        this.name = name;
        this.value = value;
    }
    /**
     * Convert a Param to a string
     * @return {string} The string corresponding to the Param
     */
    Param.prototype.toString = function () {
        return this.name + "->" + this.value;
    };
    return Param;
}());

//# sourceMappingURL=Param.js.map

/***/ }),

/***/ 355:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Signal; });
/**
 * The model class corresponding to the Signal
 * @class Signal
 */
var Signal = /** @class */ (function () {
    /**
     * @constructor
     * @param name {string} the  name/type of the Signal
     * @param params {Array<Param>} the list of Param
     */
    function Signal(name, params) {
        this.name = name;
        this.params = params;
        this.name = name;
        this.params = params;
    }
    /**
     * Convert a Signal to String
     * @return {string} The string corresponding to the order
     */
    Signal.prototype.toString = function () {
        return "Name/Type: " + this.name + ", params -> " + this.params;
    };
    return Signal;
}());

//# sourceMappingURL=Signal.js.map

/***/ }),

/***/ 357:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GeolocationPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_leaflet__ = __webpack_require__(698);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_leaflet___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_leaflet__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_platform_browser__ = __webpack_require__(34);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/**
 * UI Component and Behaviour for the Synapse page
 * @class
 */
var GeolocationPage = /** @class */ (function () {
    /*TODO manage geolocation in synapse page within a tab */
    /**
     * @constructor
     * @param public navCtrl {NavController}
     * @param private navParams {NavParams} Navigation parameters.
     * @param public meta {Meta} Provide metadata.
     */
    function GeolocationPage(navCtrl, navParams, platform, meta) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.meta = meta;
        this.geolocationSynapse = navParams.get("geofenceSynapse");
        this.geolocationSignal = this.geolocationSynapse.signal;
        this._radius = this.geolocationSignal._getRadius();
        this._latLng = __WEBPACK_IMPORTED_MODULE_2_leaflet___default.a.latLng(this.geolocationSignal._getLatitude(), this.geolocationSignal._getLongitude());
        /*
        * Back to Synapse page when pressing the "hard" back button on the phone.
        * */
        platform.registerBackButtonAction(function () {
            _this.navCtrl.pop();
        }, 1);
    }
    GeolocationPage.prototype.ionViewDidEnter = function () {
        this.loadMap();
    };
    Object.defineProperty(GeolocationPage.prototype, "radius", {
        get: function () {
            return this._radius;
        },
        set: function (value) {
            this._radius = value;
            this.circle.setRadius(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GeolocationPage.prototype, "latLng", {
        get: function () {
            return this._latLng;
        },
        set: function (value) {
            this._latLng = value;
            this.circle.setLatLng(value);
        },
        enumerable: true,
        configurable: true
    });
    GeolocationPage.prototype.loadMap = function () {
        this.map = __WEBPACK_IMPORTED_MODULE_2_leaflet___default.a.map("map", {
            touchZoom: true,
            inertia: true,
            dragging: true,
            doubleClickZoom: true,
            tap: true,
        });
        __WEBPACK_IMPORTED_MODULE_2_leaflet___default.a.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(this.map);
        this.circle = __WEBPACK_IMPORTED_MODULE_2_leaflet___default.a.circle(this.latLng, {
            radius: this.radius,
            color: '#009688',
            fillColor: '#009688',
            fillOpacity: 0.3
        })
            .addTo(this.map); // bindpopup does not work as expected for this circle ! :(
        var icon = __WEBPACK_IMPORTED_MODULE_2_leaflet___default.a.icon({
            iconUrl: "assets/marker/kalliopeBrain.png",
            shadowUrl: "assets/marker/marker-shadow.png",
            iconSize: [100, 100],
            shadowSize: [50, 64],
        });
        __WEBPACK_IMPORTED_MODULE_2_leaflet___default.a.marker(this.latLng, { icon: icon }).addTo(this.map).bindPopup(String(this.geolocationSynapse.name));
        this.map.locate({ setView: true,
            maxZoom: 18,
            timeout: 100000,
            maximumAge: 5000,
        });
        this.map.on('locationfound', this.onLocationFound.bind(this));
        this.map.on('locationerror', this.onLocationError.bind(this));
    };
    GeolocationPage.prototype.onLocationError = function (e) {
        alert("onLocationError :" + e.message);
    };
    GeolocationPage.prototype.onLocationFound = function (e) {
        var icon = __WEBPACK_IMPORTED_MODULE_2_leaflet___default.a.icon({
            iconUrl: "assets/marker/user-marker.png",
            shadowUrl: "assets/marker/marker-shadow.png",
            iconSize: [50, 50],
            shadowSize: [30, 22],
        });
        this.marker = __WEBPACK_IMPORTED_MODULE_2_leaflet___default.a.marker(e.latlng, { icon: icon }).addTo(this.map).bindPopup("You");
    };
    GeolocationPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({template:/*ion-inline-start:"/home/monf/Projects/kalliope-app/kalliope/src/pages/synapses/geolocation.html"*/'<ion-header>\n    <ion-toolbar color="green_material">\n        <button ion-button menuToggle>\n            <ion-icon name="menu"></ion-icon>\n        </button>\n        <ion-title>{{geolocationSynapse.name}}</ion-title>\n    </ion-toolbar>\n</ion-header>\n\n<ion-content class="main_color" padding>\n    <div id="map">\n    </div>\n</ion-content>\n'/*ion-inline-end:"/home/monf/Projects/kalliope-app/kalliope/src/pages/synapses/geolocation.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_3__angular_platform_browser__["e" /* Meta */]])
    ], GeolocationPage);
    return GeolocationPage;
}());

//# sourceMappingURL=geolocation.component.js.map

/***/ }),

/***/ 360:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(361);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(365);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 365:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_component__ = __webpack_require__(402);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_http__ = __webpack_require__(90);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_status_bar__ = __webpack_require__(358);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_splash_screen__ = __webpack_require__(359);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_NewOrder_NewOrder_component__ = __webpack_require__(252);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_orders_orders_component__ = __webpack_require__(140);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_chat_chat_component__ = __webpack_require__(91);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_settings_settings_component__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_synapses_synapses_component__ = __webpack_require__(251);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_chat_bubble_bubble_component__ = __webpack_require__(699);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__pages_synapses_geolocation_component__ = __webpack_require__(357);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__pages_orders_orders_service__ = __webpack_require__(81);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__pages_chat_chat_service__ = __webpack_require__(346);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__pages_synapses_synapses_service__ = __webpack_require__(353);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__pages_settings_settings_service__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__pages_chat_voice_service__ = __webpack_require__(348);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__ionic_native_http__ = __webpack_require__(349);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__ionic_native_local_notifications__ = __webpack_require__(356);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__ionic_native_media__ = __webpack_require__(351);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__ionic_native_file__ = __webpack_require__(352);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
// Core







// Pages







// Services





// ionic Cordova plugins




var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["L" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_11__pages_synapses_synapses_component__["a" /* SynapsesPage */],
                __WEBPACK_IMPORTED_MODULE_10__pages_settings_settings_component__["a" /* SettingsPage */],
                __WEBPACK_IMPORTED_MODULE_8__pages_orders_orders_component__["a" /* OrdersPage */],
                __WEBPACK_IMPORTED_MODULE_9__pages_chat_chat_component__["a" /* ChatPage */],
                __WEBPACK_IMPORTED_MODULE_7__pages_NewOrder_NewOrder_component__["a" /* NewOrderPage */],
                __WEBPACK_IMPORTED_MODULE_12__pages_chat_bubble_bubble_component__["a" /* Bubble */],
                __WEBPACK_IMPORTED_MODULE_13__pages_synapses_geolocation_component__["a" /* GeolocationPage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_4__angular_http__["c" /* HttpModule */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["e" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */], {}, {
                    links: []
                }),
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_11__pages_synapses_synapses_component__["a" /* SynapsesPage */],
                __WEBPACK_IMPORTED_MODULE_10__pages_settings_settings_component__["a" /* SettingsPage */],
                __WEBPACK_IMPORTED_MODULE_8__pages_orders_orders_component__["a" /* OrdersPage */],
                __WEBPACK_IMPORTED_MODULE_9__pages_chat_chat_component__["a" /* ChatPage */],
                __WEBPACK_IMPORTED_MODULE_7__pages_NewOrder_NewOrder_component__["a" /* NewOrderPage */],
                __WEBPACK_IMPORTED_MODULE_13__pages_synapses_geolocation_component__["a" /* GeolocationPage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_5__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_6__ionic_native_splash_screen__["a" /* SplashScreen */],
                __WEBPACK_IMPORTED_MODULE_17__pages_settings_settings_service__["a" /* SettingsService */],
                __WEBPACK_IMPORTED_MODULE_16__pages_synapses_synapses_service__["a" /* SynapsesService */],
                __WEBPACK_IMPORTED_MODULE_18__pages_chat_voice_service__["a" /* VoiceService */],
                __WEBPACK_IMPORTED_MODULE_14__pages_orders_orders_service__["a" /* OrdersService */],
                __WEBPACK_IMPORTED_MODULE_15__pages_chat_chat_service__["a" /* ChatService */],
                __WEBPACK_IMPORTED_MODULE_21__ionic_native_media__["a" /* Media */],
                __WEBPACK_IMPORTED_MODULE_22__ionic_native_file__["a" /* File */],
                __WEBPACK_IMPORTED_MODULE_19__ionic_native_http__["a" /* HTTP */],
                __WEBPACK_IMPORTED_MODULE_20__ionic_native_local_notifications__["a" /* LocalNotifications */],
                { provide: __WEBPACK_IMPORTED_MODULE_0__angular_core__["v" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* IonicErrorHandler */] }
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 402:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__pages_synapses_synapses_component__ = __webpack_require__(251);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__pages_chat_chat_component__ = __webpack_require__(91);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__pages_orders_orders_component__ = __webpack_require__(140);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pages_settings_settings_component__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ionic_angular__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_status_bar__ = __webpack_require__(358);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_splash_screen__ = __webpack_require__(359);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var MyApp = /** @class */ (function () {
    function MyApp(platform, statusBar, splashScreen) {
        this.platform = platform;
        this.statusBar = statusBar;
        this.splashScreen = splashScreen;
        this.rootPage = __WEBPACK_IMPORTED_MODULE_0__pages_synapses_synapses_component__["a" /* SynapsesPage */];
        this.initializeApp();
        // used for an example of ngFor and navigation
        this.pages = [
            { title: 'Chat', component: __WEBPACK_IMPORTED_MODULE_1__pages_chat_chat_component__["a" /* ChatPage */] },
            { title: 'Orders', component: __WEBPACK_IMPORTED_MODULE_2__pages_orders_orders_component__["a" /* OrdersPage */] },
            { title: 'Synapses', component: __WEBPACK_IMPORTED_MODULE_0__pages_synapses_synapses_component__["a" /* SynapsesPage */] },
            { title: 'Settings', component: __WEBPACK_IMPORTED_MODULE_3__pages_settings_settings_component__["a" /* SettingsPage */] }
        ];
        // comment this in prod! for testing only in order to clean the local storage at every new load
        // localStorage.clear();
    }
    MyApp.prototype.initializeApp = function () {
        var _this = this;
        this.platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            _this.statusBar.styleDefault();
            _this.splashScreen.hide();
        });
    };
    MyApp.prototype.openPage = function (page) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        this.nav.setRoot(page.component);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_4__angular_core__["_13" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_5_ionic_angular__["i" /* Nav */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_5_ionic_angular__["i" /* Nav */])
    ], MyApp.prototype, "nav", void 0);
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_4__angular_core__["n" /* Component */])({template:/*ion-inline-start:"/home/monf/Projects/kalliope-app/kalliope/src/app/app.html"*/'<ion-menu [content]="content">\n    <ion-header>\n        <ion-toolbar color="green_material">\n            <ion-title>Menu</ion-title>\n        </ion-toolbar>\n    </ion-header>\n\n    <ion-content>\n        <ion-list>\n            <button menuClose ion-item *ngFor="let p of pages" (click)="openPage(p)">\n                {{p.title}}\n            </button>\n        </ion-list>\n    </ion-content>\n\n</ion-menu>\n\n<ion-nav id="nav" [root]="rootPage" #content></ion-nav>\n'/*ion-inline-end:"/home/monf/Projects/kalliope-app/kalliope/src/app/app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_5_ionic_angular__["l" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_6__ionic_native_status_bar__["a" /* StatusBar */],
            __WEBPACK_IMPORTED_MODULE_7__ionic_native_splash_screen__["a" /* SplashScreen */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 403:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MatchedSynapse; });
/**
 * Model Class to define the MatchedSynapses
 * Corresponding to the Kalliope Core API response.
 * @class MatchedSynapse
 */
var MatchedSynapse = /** @class */ (function () {
    /**
     * @constructor
     * @param values {Object}
     */
    function MatchedSynapse(values) {
        if (values === void 0) { values = {}; }
        Object.assign(values);
    }
    return MatchedSynapse;
}());

//# sourceMappingURL=MatchedSynapses.js.map

/***/ }),

/***/ 404:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NeuronModule; });
/**
 * Model Class to define the NeuronModule
 * @class NeuronModule
 */
var NeuronModule = /** @class */ (function () {
    /**
     * @constructor
     * @param values {Object}
     */
    function NeuronModule(values) {
        if (values === void 0) { values = {}; }
        Object.assign(values);
    }
    return NeuronModule;
}());

//# sourceMappingURL=NeuronModule.js.map

/***/ }),

/***/ 45:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SettingsService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_Rx__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_rxjs_Rx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(90);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/**
 * Service class to manage the settings.
 * @class SettingsService
 */
var SettingsService = /** @class */ (function () {
    /**
     * @constructor
     * @param httpService {Http} Service to handle the HTTP requests
     */
    function SettingsService(httpService) {
        this.httpService = httpService;
    }
    /**
     * Provide the remote Kalliope Core version
     * @param settings {Settings} the model Settings to access API
     * @return {Observable<R>}
     */
    SettingsService.prototype.getVersion = function (settings) {
        console.log("[SettingsService] getVersion: URL -> " + settings.url + ",user: " + settings.username, ",pass:" + settings.password);
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]();
        headers.append('Authorization', 'Basic ' + btoa(settings.username + ':' + settings.password));
        headers.append('Content-Type', 'application/json');
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */]({
            headers: headers
        });
        var url_to_call = "http://" + settings.url + "/";
        return this.httpService.get(url_to_call, options)
            .map(function (res) { return res.json(); })
            .timeout(5000);
    };
    /**
     * Log the Error into the console
     * @param error
     * @return {any}
     */
    SettingsService.prototype.logError = function (error) {
        console.error("[SettingsService] logError: error -> " + error);
        return __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__["Observable"].throw(error.json().error || 'Server error');
    };
    /**
     * Log the Kalliope Version
     * @param version
     */
    SettingsService.prototype.saveVersion = function (version) {
        console.log("[SettingsService] saveVersion: kalliope Core version -> " + version);
    };
    /**
     * Retrieve the Settings
     * @return {Settings}
     */
    SettingsService.prototype.getDefaultSettings = function () {
        return JSON.parse(localStorage.getItem('settings'));
    };
    /**
     * Save the Settings into the local storage
     * @param settings {Settings}
     */
    SettingsService.prototype.setDefaultSettings = function (settings) {
        return localStorage.setItem('settings', JSON.stringify(settings));
    };
    /**
     * Remove the Settings from the local storage
     * @return
     */
    SettingsService.prototype.detroyDefaultSettings = function () {
        return localStorage.removeItem('settings');
    };
    SettingsService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["B" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]])
    ], SettingsService);
    return SettingsService;
}());

//# sourceMappingURL=settings.service.js.map

/***/ }),

/***/ 56:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SettingsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__orders_orders_component__ = __webpack_require__(140);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__settings_service__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__settings__ = __webpack_require__(692);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_angular__ = __webpack_require__(29);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





/**
 * UI Component and Behaviour to handle the Settings Page
 * define and test the Kalliope Core API URL.
 * @class SettingsPage
 */
var SettingsPage = /** @class */ (function () {
    /**
     * @constructor
     * @param public navCtrl {NavController}
     * @param public loadingCtrl {LoadingController} Controller to handle the Loading UI element
     * @param private SettingsService {SettingsService} Service to manage the Settings model
     * @param public toastCtrl {ToastController} Controller to handle the Toast UI Element.
     */
    function SettingsPage(navCtrl, loadingCtrl, settingsService, toastCtrl) {
        this.navCtrl = navCtrl;
        this.loadingCtrl = loadingCtrl;
        this.settingsService = settingsService;
        this.toastCtrl = toastCtrl;
        this.settingsOK = false;
        this.settings = this.settingsService.getDefaultSettings();
        if (this.settings == null) {
            this.settings = new __WEBPACK_IMPORTED_MODULE_2__settings__["a" /* Settings */]();
        }
        // prepare a loader for waiting durring the connection
        this.createLoader();
    }
    /**
     * Method to test the Kalliope Core connection
     */
    SettingsPage.prototype.testConnection = function () {
        var _this = this;
        console.log("[SettingsPage] testConnection: Testing connection with URL -> " + this.settings.url);
        this.loader.present();
        this.settingsService.getVersion(this.settings)
            .subscribe(function (data) { return _this.connectionSuccess(data); }, function (error) { return _this.connectonFailled(error); });
    };
    /**
     * The connection to the Kalliope Core API is OK.
     * @param data {Object} the Javascript Object of the Kalliope Core response
     */
    SettingsPage.prototype.connectionSuccess = function (data) {
        console.log("[SettingsPage] connectionSuccess: Connection to Kalliope API server OK");
        console.log("[SettingsPage] connectionSuccess: The datas -> " + data);
        this.loader.dismiss();
        this.presentToast("Connection Success: Kalliope version ->" + data["Kalliope version"]);
        this.settingsOK = true;
    };
    /**
     * the connection fails, display an error into the console.
     * @param error {string}
     */
    SettingsPage.prototype.connectonFailled = function (error) {
        console.log("[SettingsPage] connectonFailled: error -> " + error);
        this.loader.dismiss();
        this.presentToast("Connection failled: " + error);
        this.createLoader();
    };
    // TODO Refactoring the following method already exist
    /**
     * Display a message at the bottom of the screen during 3000ms
     * @param message_to_print {string} the message to display
     */
    SettingsPage.prototype.presentToast = function (message_to_print) {
        var toast = this.toastCtrl.create({
            message: message_to_print,
            duration: 3000,
            position: 'bottom'
        });
        toast.present();
    };
    /**
     * Define and save the default settings.
     */
    SettingsPage.prototype.saveSettings = function () {
        this.settingsService.setDefaultSettings(this.settings);
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_0__orders_orders_component__["a" /* OrdersPage */]);
    };
    /**
     * Prepare a loader object
     */
    SettingsPage.prototype.createLoader = function () {
        this.loader = this.loadingCtrl.create({
            content: "Please wait..."
        });
    };
    /**
     * Show a toast to explain what is the mute flag
     */
    SettingsPage.prototype.showInfoMute = function () {
        var toast = this.toastCtrl.create({
            message: "If true, Kalliope will be muted on the server side",
            duration: 5000,
            position: 'bottom'
        });
        toast.present();
    };
    /**
     * A setting has been updated from the client page, save the new status
     */
    SettingsPage.prototype.settingsUpdated = function () {
        console.log("[SettingsPage] settings updated");
        this.settingsService.setDefaultSettings(this.settings);
    };
    SettingsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_3__angular_core__["n" /* Component */])({
            selector: 'page-settings',template:/*ion-inline-start:"/home/monf/Projects/kalliope-app/kalliope/src/pages/settings/settings.html"*/'<ion-header>\n    <ion-toolbar color="green_material">\n        <button ion-button menuToggle>\n            <ion-icon name="menu"></ion-icon>\n        </button>\n        <ion-title>Settings</ion-title>\n    </ion-toolbar>\n</ion-header>\n\n<ion-content class="main_color" padding>\n    <ion-card>\n        <ion-card-header>\n            Kalliope server\n        </ion-card-header>\n        <ion-card-content>\n            <ion-list>\n                <ion-item>\n                    <ion-label stacked>URL</ion-label>\n                    <ion-input [(ngModel)]="settings.url" type="text"></ion-input>\n                </ion-item>\n\n                <ion-item>\n                    <ion-label stacked>Username</ion-label>\n                    <ion-input [(ngModel)]="settings.username" type="text"></ion-input>\n                </ion-item>\n\n                <ion-item>\n                    <ion-label stacked>Password</ion-label>\n                    <ion-input [(ngModel)]="settings.password" type="password"></ion-input>\n                </ion-item>\n            </ion-list>\n            <button *ngIf="!settingsOK" ion-button block color="green_material" (click)="testConnection()">Test connection\n            </button>\n            <button *ngIf="settingsOK" ion-button block color="secondary" (click)="saveSettings()">Save</button>\n        </ion-card-content>\n    </ion-card>\n\n    <ion-card>\n        <ion-card-header>\n            Options\n        </ion-card-header>\n        <ion-card-content>\n            <ion-item>\n                <ion-label>Mute <ion-badge color="green_material" (click)="showInfoMute()">?</ion-badge></ion-label>\n                <ion-toggle color="green_material" [(ngModel)]="settings.mute" (ionChange)="settingsUpdated()"></ion-toggle>\n            </ion-item>\n        </ion-card-content>\n    </ion-card>\n</ion-content>\n\n'/*ion-inline-end:"/home/monf/Projects/kalliope-app/kalliope/src/pages/settings/settings.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4_ionic_angular__["j" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["f" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_1__settings_service__["a" /* SettingsService */],
            __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["m" /* ToastController */]])
    ], SettingsPage);
    return SettingsPage;
}());

//# sourceMappingURL=settings.component.js.map

/***/ }),

/***/ 692:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Settings; });
/**
 * The model class corresponding to the Settings.
 * @class Settings
 */
var Settings = /** @class */ (function () {
    function Settings(values) {
        if (values === void 0) { values = {}; }
        // url of kalliope api server
        this.url = 'localhost:5000';
        this.username = '';
        this.password = '';
        // mute flag to mute kalliope
        this.mute = false;
        // geolocation flag to manage geolocation signals from kalliope brain
        this.geolocation = false;
        Object.assign(values);
    }
    return Settings;
}());

//# sourceMappingURL=settings.js.map

/***/ }),

/***/ 693:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Serialization; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_Rx__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_rxjs_Rx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__models_Param__ = __webpack_require__(354);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__models_Order__ = __webpack_require__(694);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__models_Synapse__ = __webpack_require__(695);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__models_Geolocation__ = __webpack_require__(696);





/**
 * Manage the global serialization of the Synapse object coming from the Kalliope Core API
 * @class Serialization
 */
var Serialization;
(function (Serialization) {
    /**
     * Serialization from a Javascript Object to a Synapse model
     * @param responseJSON {Object} the Javascript Object
     * @return {Array<Synapse>} the list of Synapse
     */
    function JSONToSynapse(responseJSON) {
        var synapses = [];
        if ('synapses' in responseJSON) {
            var synapsesJSON = responseJSON['synapses'];
            for (var _i = 0, synapsesJSON_1 = synapsesJSON; _i < synapsesJSON_1.length; _i++) {
                var synap = synapsesJSON_1[_i];
                if ('name' in synap) {
                    if ('signals' in synap) {
                        for (var _a = 0, _b = synap['signals']; _a < _b.length; _a++) {
                            var signal = _b[_a];
                            if ('name' in signal) {
                                if ('order' === signal.name) {
                                    if (signal.parameters)
                                        synapses.push(new __WEBPACK_IMPORTED_MODULE_3__models_Synapse__["a" /* Synapse */](synap['name'], new __WEBPACK_IMPORTED_MODULE_2__models_Order__["a" /* Order */](signal.parameters, new Array())));
                                }
                                else if ('geolocation' == signal.name) {
                                    synapses.push(new __WEBPACK_IMPORTED_MODULE_3__models_Synapse__["a" /* Synapse */](synap['name'], new __WEBPACK_IMPORTED_MODULE_4__models_Geolocation__["a" /* Geolocation */](signal.name, Serialization._getArrayParamFromObjectParameters(signal.parameters))));
                                }
                            }
                        }
                    }
                }
            }
        }
        return synapses;
    }
    Serialization.JSONToSynapse = JSONToSynapse;
    function _getArrayParamFromObjectParameters(params) {
        return Object.keys(params).map(function (p) { return new __WEBPACK_IMPORTED_MODULE_1__models_Param__["a" /* Param */](p, params[p]); });
    }
    Serialization._getArrayParamFromObjectParameters = _getArrayParamFromObjectParameters;
})(Serialization || (Serialization = {}));
//# sourceMappingURL=Serialization.js.map

/***/ }),

/***/ 694:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Order; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Param__ = __webpack_require__(354);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Signal__ = __webpack_require__(355);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();


/**
 * The model class corresponding to the Order
 * @class Order
 */
var Order = /** @class */ (function (_super) {
    __extends(Order, _super);
    /**
     * @constructor
     * @param value {string} the order value
     * @param params {Array<Param>} the list of Param
     */
    function Order(value, params) {
        var _this = this;
        var valueNotSpaceBracket = Order._RemoveSpacesInBrackets(value);
        var extractedParams = Order._getParamBetweenBracketsList(valueNotSpaceBracket);
        _this = _super.call(this, "order", params.concat(extractedParams)) || this;
        _this.value = value;
        return _this;
    }
    /**
     * Retrieve the list of Param from a given order
     * @param sentence {string} the sentence
     * @return {Array} the list of Param
     * @private
     */
    Order._getParamBetweenBracketsList = function (sentence) {
        var regexp = new RegExp(/((?:{{\s*)[\w\.]+(?:\s*}}))/g);
        var paramBetweenBracketsList = [];
        var matchingWordList = sentence.match(regexp);
        if (matchingWordList != null) {
            paramBetweenBracketsList = matchingWordList
                .map(function (b) { return b.replace('{{', '').replace('}}', ''); })
                .map(function (b) { return new __WEBPACK_IMPORTED_MODULE_0__Param__["a" /* Param */](b); });
        }
        return paramBetweenBracketsList;
    };
    /**
     * Convert an Order to String
     * @return {string} The string corresponding to the order
     */
    Order.prototype.toString = function () {
        return "Order : value -> " + this.value +
            ", params -> " + this.params;
    };
    Order._RemoveSpacesInBrackets = function (value) {
        return value.replace(/\s+(?=[^{\}\}]*\}\})/g, '');
    };
    return Order;
}(__WEBPACK_IMPORTED_MODULE_1__Signal__["a" /* Signal */]));

//# sourceMappingURL=Order.js.map

/***/ }),

/***/ 695:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Synapse; });
/**
 * The model Class
 * @class Synapse
 */
var Synapse = /** @class */ (function () {
    /*
     * Attributes :
     * public name:string
     * public signals: any // TODO should be an array ... did not find out how to bind objects
     *
     * */
    /**
     * @constructor
     * @param name {string} the name of the Synapse
     * @param signal {any} the Order corresponding
     */
    function Synapse(name, signal) {
        this.name = name;
        this.signal = signal;
    }
    /**
     * Convert a Synapse to a String
     * @return {string} The string corresponding to the Synapse
     */
    Synapse.prototype.toString = function () {
        return "Synapse : name -> " + this.name +
            ", signal -> " + this.signal;
    };
    return Synapse;
}());

//# sourceMappingURL=Synapse.js.map

/***/ }),

/***/ 696:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Geolocation; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Signal__ = __webpack_require__(355);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

/**
 * The model class corresponding to the Order
 * @class Order
 */
var Geolocation = /** @class */ (function (_super) {
    __extends(Geolocation, _super);
    /**
     * @constructor
     * @param params {Array<Param>} the list of Param
     */
    function Geolocation(name, params) {
        return _super.call(this, name, params) || this;
    }
    Geolocation.prototype._getLatitude = function () {
        return this.params.find(function (p) { return p.name == 'latitude'; }).value;
    };
    Geolocation.prototype._getLongitude = function () {
        return this.params.find(function (p) { return p.name == 'longitude'; }).value;
    };
    Geolocation.prototype._getRadius = function () {
        return this.params.find(function (p) { return p.name == 'radius'; }).value;
    };
    return Geolocation;
}(__WEBPACK_IMPORTED_MODULE_0__Signal__["a" /* Signal */]));

//# sourceMappingURL=Geolocation.js.map

/***/ }),

/***/ 699:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Bubble; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__models_ChatMessage__ = __webpack_require__(347);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/**
 * Model Class to define a bubble .
 * @class Bubble
 */
var Bubble = /** @class */ (function () {
    function Bubble() {
    }
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["E" /* Input */])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__models_ChatMessage__["a" /* ChatMessage */])
    ], Bubble.prototype, "chatMessage", void 0);
    Bubble = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["n" /* Component */])({
            selector: 'chat-bubble',template:/*ion-inline-start:"/home/monf/Projects/kalliope-app/kalliope/src/pages/chat/bubble/bubble.html"*/'\n<div class="bubble {{chatMessage.sender}}">\n    {{chatMessage.message}}\n</div>\n<div class="containerdivNewLine "></div>\n'/*ion-inline-end:"/home/monf/Projects/kalliope-app/kalliope/src/pages/chat/bubble/bubble.html"*/
        }),
        __metadata("design:paramtypes", [])
    ], Bubble);
    return Bubble;
}());

//# sourceMappingURL=bubble.component.js.map

/***/ }),

/***/ 81:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OrdersService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__models_orderResponse__ = __webpack_require__(141);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Rx__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_Rx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(90);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_core__ = __webpack_require__(1);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/**
 * The Service Class to manage Orders operations.
 * @class OrdersService:
 */
var OrdersService = /** @class */ (function () {
    /**
     * @constructor
     * @param httpService {HTTP}
     */
    function OrdersService(httpService) {
        this.httpService = httpService;
    }
    /**
     * POST the given order to Kalliope Core API (/synapses/start/order)
     * @param order {string} the order to send to the Kalliope Core API
     * @param settings {Settings} the Settings to access the Kalliope Core API
     * @return {Observable<OrderResponse>} The OrderResponse provided by the Kalliope Core.
     */
    OrdersService.prototype.postOrder = function (order, settings) {
        console.log("[OrdersService] call postOrder with URL: " + settings.url
            + ",user: " + settings.username, ",pass:" + settings.password, ",mute:" + settings.mute);
        var headers = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Headers */]();
        headers.append('Authorization', 'Basic ' + btoa(settings.username + ':' + settings.password));
        headers.append('Content-Type', 'application/json');
        var options = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["d" /* RequestOptions */]({
            headers: headers
        });
        var order_dict = {
            "order": order,
            "mute": settings.mute
        };
        var body = JSON.stringify(order_dict); // Stringify payload
        var url_to_call = "http://" + settings.url + "/synapses/start/order";
        var data = this.httpService.post(url_to_call, body, options).map(function (res) { return __WEBPACK_IMPORTED_MODULE_0__models_orderResponse__["a" /* OrderResponse */].responseToObject(res.json()); });
        return data;
    };
    // Local Storage management ---------------------------
    /**
     * Saving the order list to the local storage.
     * @param orders {Array<string>} the
     */
    OrdersService.prototype.saveOrders = function (orders) {
        return localStorage.setItem('orders', JSON.stringify(orders));
    };
    /**
     * load the previous orders.
     * @return {Array<string>} the list of the previously given orders
     */
    OrdersService.prototype.loadOrders = function () {
        return JSON.parse(localStorage.getItem('orders'));
    };
    OrdersService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_3__angular_core__["B" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__angular_http__["b" /* Http */]])
    ], OrdersService);
    return OrdersService;
}());

//# sourceMappingURL=orders.service.js.map

/***/ }),

/***/ 91:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ChatPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__settings_settings_component__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__settings_settings_service__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__orders_orders_service__ = __webpack_require__(81);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__chat_service__ = __webpack_require__(346);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__models_ChatMessage__ = __webpack_require__(347);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_ionic_angular__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__voice_service__ = __webpack_require__(348);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__models_orderResponse__ = __webpack_require__(141);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_native_media__ = __webpack_require__(351);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ionic_native_file__ = __webpack_require__(352);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_rxjs_Observable__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_11_rxjs_Observable__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};













/**
 * @class ChatPage: Components and behaviour Handlers of the Chat page.
 * */
var ChatPage = /** @class */ (function () {
    /**
     * Chat Page constructor
     * @constructor
     * @param public navCtrl {NavController}
     * @param private navParams {NavParams}
     * @param private ordersService {OrdersService} the service managing the orders
     * @param public loadingCtrl {LoadingController} the controller to provide the Loading component
     * @param public toastCtrl {ToastController} the controller to provide the toast component
     * @param public settingsService {SettingsService} the service managing the settings
     * @param private voiceService {VoiceService} the service managing the captured voice (audio)
     * @param private chatService {ChatService} the service managing the chat
     *
     */
    function ChatPage(navCtrl, navParams, ordersService, loadingCtrl, toastCtrl, settingsService, voiceService, chatService, media, file, platform, changeDetector) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.ordersService = ordersService;
        this.loadingCtrl = loadingCtrl;
        this.toastCtrl = toastCtrl;
        this.settingsService = settingsService;
        this.voiceService = voiceService;
        this.chatService = chatService;
        this.media = media;
        this.file = file;
        this.platform = platform;
        this.changeDetector = changeDetector;
        this.isRecording = false;
        this.countDown = 10;
        this.chatInput = "";
        /*
        * Back to Synapse page when pressing the "hard" back button on the phone.
        * */
        platform.registerBackButtonAction(function () {
            _this.navCtrl.pop();
        }, 1).bind(this);
        // chatService.clearStorage();
        // TODO: idea -> for each message put date over the chat bubbles ?
        // load settings from storage
        this.settings = settingsService.getDefaultSettings();
        if (this.settings == null) {
            console.log("Settings not loaded. Redirect to settings page");
            this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_0__settings_settings_component__["a" /* SettingsPage */]);
        }
        else {
            console.log("Settings loaded. Url: " + this.settings.url);
        }
        // load the default chatMessages
        this.chatMessages = chatService.loadChatMessages();
        if (this.chatMessages == null) {
            // no chat message yet. start a new list
            this.chatMessages = [];
        }
        var responseFromGeolocation = navParams.get('responseFromGeolocation');
        if (responseFromGeolocation != null) {
            var geofence = navParams.get('geofence');
            var myOrder = new Date().toLocaleString() + " ***Geolocation signal*** " + geofence.id + " --> [latitude: " + geofence.latitude + ", longitude: " + geofence.longitude + ", radius: " + geofence.radius + "]";
            this.loadNewMessage(responseFromGeolocation, myOrder);
        }
        var responseFromSynapsePage = navParams.get('responseFromSynapsePage');
        if (responseFromSynapsePage != null) {
            var synapseOrder = navParams.get('synapseOrder');
            var myOrder = synapseOrder.value + ':  [' + synapseOrder.params.join("][") + "]";
            this.loadNewMessage(responseFromSynapsePage, myOrder);
        }
        var orderFromOrderPage = navParams.get('orderFromOrderPage');
        if (orderFromOrderPage != null) {
            this.newMessage = orderFromOrderPage;
            this.sendMessage();
        }
    }
    ChatPage.prototype.ngOnInit = function () {
        this.scrollToBottom();
    };
    /**
     * Implement this interface to get notified after every check of your component's view.
     */
    ChatPage.prototype.ngAfterViewChecked = function () {
        this.scrollToBottom();
        this.changeDetector.detectChanges();
    };
    /**
     * Automatic scroll down the chat to last message
     */
    ChatPage.prototype.scrollToBottom = function () {
        try {
            this.content.scrollToBottom(300); // ms animation to scroll
        }
        catch (err) { }
    };
    /**
     * Display the User ("Me") and Kalliope interactions into the chat page.
     * @param orderResponse {OrderResponse} the OrderResponse coming back from the kalliopeCore.
     * @param myOrder {string} the order provided by the user, undefined if user recorded an audio order.
     */
    ChatPage.prototype.loadNewMessage = function (orderResponse, myOrder) {
        console.log("[ChatPage] loadNewMessage: OrderResponse -> " + JSON.stringify(orderResponse));
        console.log("[ChatPage] loadNewMessage: myOrder -> " + myOrder);
        // add the user order
        var myMessage = new __WEBPACK_IMPORTED_MODULE_4__models_ChatMessage__["a" /* ChatMessage */]();
        myMessage.sender = "me";
        if (myOrder !== undefined) {
            myMessage.message = myOrder;
        }
        else {
            myMessage.message = orderResponse.userOrder;
        }
        this.chatMessages.push(myMessage);
        // add each generated answer
        for (var _i = 0, _a = orderResponse.matchedSynapses; _i < _a.length; _i++) {
            var matchedSynapse = _a[_i];
            for (var _b = 0, _c = matchedSynapse.neuronModuleList; _b < _c.length; _b++) {
                var neuronModule = _c[_b];
                var chatMessage = new __WEBPACK_IMPORTED_MODULE_4__models_ChatMessage__["a" /* ChatMessage */]();
                chatMessage.sender = "you";
                chatMessage.message = neuronModule.generatedMessage;
                this.chatMessages.push(chatMessage);
            }
        }
        // save the new chatMessage list
        this.chatService.saveChatMessages(this.chatMessages);
    };
    // Loader management ---------------------------
    /**
     * Using the {LoadingCtrl} display a waiting message during 3000ms.
     */
    ChatPage.prototype.startLoader = function () {
        // prepare loader
        this.loader = this.loadingCtrl.create({
            content: "Please wait...",
            duration: 3000
        });
        // start waiting gif
        this.loader.present();
    };
    /**
     * Send the message provided by the user.
     */
    ChatPage.prototype.sendMessage = function () {
        var _this = this;
        if (this.newMessage != null) {
            //start the loader
            this.startLoader();
            // execute the order
            this.ordersService.postOrder(this.newMessage, this.settings).subscribe(function (orderResponse) { return _this.processOrderResponse(orderResponse, _this.newMessage); }, function (error) { return _this.handleError(error); });
        }
    };
    // Screen ---------------------------
    /**
     * Display a provided error using the {ToastController}
     * @param error {string} the error to display
     */
    ChatPage.prototype.handleError = function (error) {
        this.presentToast(error);
        console.log(error);
    };
    /**
     * Displays the message at the bottom of the screen for 3000ms.
     * @param message_to_print {string} the message to display
     */
    ChatPage.prototype.presentToast = function (message_to_print) {
        var toast = this.toastCtrl.create({
            message: message_to_print,
            duration: 3000,
            position: 'bottom'
        });
        toast.present();
    };
    /**
     * Remove all displayed messages from the chat page.
     */
    ChatPage.prototype.cleanMessages = function () {
        this.chatMessages = [];
        this.chatService.saveChatMessages(this.chatMessages);
    };
    // Start Process ---------------------------
    /**
     * Processing the OrderResponse message provided by the Kalliope Core API.
     * @param orderResponse {OrderResponse} the OrderResponse provided by Kalliope Core
     * @param sentMessage {string} the message written by the user
     */
    ChatPage.prototype.processOrderResponse = function (orderResponse, sentMessage) {
        // reload the list with the response
        this.loadNewMessage(orderResponse, sentMessage);
    };
    ChatPage.prototype.recordVoice = function () {
        var _this = this;
        // Note : To be verified if it works on iOS : check official ionic doc
        this.recordFile = this.media.create(this.file.externalCacheDirectory + 'sound_file.mp3');
        this.isRecording = true;
        this.recordFile.startRecord();
        this.presentToast("Start recording");
        this.currTimeout = __WEBPACK_IMPORTED_MODULE_11_rxjs_Observable__["Observable"].interval(1000).subscribe(function (v) {
            _this.countDown--;
            if (_this.countDown == 0) {
                _this.stopRecordVoice();
                _this.presentToast("Stop recording after 10 seconds");
            }
        });
    };
    ChatPage.prototype.stopRecordVoice = function () {
        var _this = this;
        this.currTimeout.unsubscribe();
        this.countDown = 10;
        this.recordFile.stopRecord();
        this.isRecording = false;
        //this.recordFile.play();
        //start the loader
        this.startLoader();
        this.voiceService.postVoice(this.file.externalCacheDirectory + 'sound_file.mp3', this.settings).then(function (response) {
            console.log("[Chat] stopRecordVoice -> audio response :  " + response.data);
            _this.processOrderResponse(__WEBPACK_IMPORTED_MODULE_8__models_orderResponse__["a" /* OrderResponse */].responseToObject(JSON.parse(response.data)), undefined);
        });
    };
    /**
     *  When a chatMessage has been clicked it updates the value in the input
     * @param {ChatMessage} chatMessage which is clicked
     */
    ChatPage.prototype.clickedChatMessage = function (chatMessage) {
        this.chatInput = chatMessage.message;
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_5__angular_core__["_13" /* ViewChild */])('content'),
        __metadata("design:type", Object)
    ], ChatPage.prototype, "content", void 0);
    ChatPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_5__angular_core__["n" /* Component */])({
            selector: 'page-chat',template:/*ion-inline-start:"/home/monf/Projects/kalliope-app/kalliope/src/pages/chat/chat.html"*/'<ion-header>\n    <ion-toolbar color="green_material">\n        <button *ngIf="!isRecording" ion-button menuToggle>\n            <ion-icon name="menu"></ion-icon>\n        </button>\n        <ion-title *ngIf="!isRecording">Chats</ion-title>\n        <ion-title *ngIf="isRecording" text-center>RECORDING</ion-title>\n        <ion-buttons *ngIf="!isRecording" end>\n            <button ion-button icon-only color="royal" (click)="cleanMessages()">\n                <ion-icon name="trash"></ion-icon>\n            </button>\n        </ion-buttons>\n    </ion-toolbar>\n</ion-header>\n\n<ion-content #content class="main_color" padding>\n    <div *ngIf="!isRecording" >\n        <div *ngFor="let chatMessage of chatMessages" >\n            <chat-bubble [chatMessage]="chatMessage" (click)="clickedChatMessage(chatMessage)"></chat-bubble>\n        </div>\n    </div>\n    <ion-grid fixed *ngIf="isRecording" style="height: 100%">\n        <ion-row justify-content-center align-items-center style="height: 100%">\n            <div style="font-size: 80px">{{this.countDown}}</div>\n        </ion-row>\n        <ion-row justify-content-center align-items-center style="height: 100%">\n            <button ion-button icon-only round large color="green_material" style="font-size: 60px" (click)="stopRecordVoice()">\n                <ion-icon name="pause"></ion-icon>\n            </button>\n        </ion-row>\n    </ion-grid>\n</ion-content>\n\n\n<ion-footer *ngIf="!isRecording">\n    <ion-toolbar>\n        <ion-input [(ngModel)]="newMessage" placeholder="Chat Here !" value="{{chatInput}}"></ion-input>\n        <ion-buttons end>\n            <button ion-button icon-right color="green_material" (click)="sendMessage()">\n                <ion-icon name="send"></ion-icon>\n            </button>\n                <button ion-button icon-only icon-right color="green_material" (click)="recordVoice()">\n                    <ion-icon name="mic"></ion-icon>\n                </button>\n        </ion-buttons>\n    </ion-toolbar>\n</ion-footer>\n\n'/*ion-inline-end:"/home/monf/Projects/kalliope-app/kalliope/src/pages/chat/chat.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_6_ionic_angular__["j" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_6_ionic_angular__["k" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__orders_orders_service__["a" /* OrdersService */],
            __WEBPACK_IMPORTED_MODULE_6_ionic_angular__["f" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_6_ionic_angular__["m" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_1__settings_settings_service__["a" /* SettingsService */],
            __WEBPACK_IMPORTED_MODULE_7__voice_service__["a" /* VoiceService */],
            __WEBPACK_IMPORTED_MODULE_3__chat_service__["a" /* ChatService */],
            __WEBPACK_IMPORTED_MODULE_9__ionic_native_media__["a" /* Media */],
            __WEBPACK_IMPORTED_MODULE_10__ionic_native_file__["a" /* File */],
            __WEBPACK_IMPORTED_MODULE_6_ionic_angular__["l" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_5__angular_core__["k" /* ChangeDetectorRef */]])
    ], ChatPage);
    return ChatPage;
}());

//# sourceMappingURL=chat.component.js.map

/***/ })

},[360]);
//# sourceMappingURL=main.js.map