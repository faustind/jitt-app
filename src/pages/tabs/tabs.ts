import { Component } from '@angular/core';
import { CollaborationPage } from '../collaboration/collaboration';
import { BookmarkPage } from '../bookmark/bookmark';
import { ResultPage } from '../result/result';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = ResultPage;
  tab2Root = CollaborationPage;
  tab3Root = BookmarkPage;

  constructor() {
  }
}
