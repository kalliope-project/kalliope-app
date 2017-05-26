import { Component } from '@angular/core';

import { SynapsesPage } from '../synapses/synapses';
import { SettingsPage } from '../settings/settings';
import { HomePage } from '../home/home';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = SynapsesPage;
  tab3Root = SettingsPage;

  constructor() {

  }
}
