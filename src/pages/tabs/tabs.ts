import { Component } from '@angular/core';

import { CollaborationPage } from '../collaboration/collaboration';
import { BookmarkPage } from '../bookmark/bookmark';
import { HomePage } from '../home/home';
import { SettingsPage } from '../settings/settings';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = CollaborationPage;
  tab3Root = BookmarkPage;
  tab4Root = SettingsPage;

  constructor() {

  }
}
