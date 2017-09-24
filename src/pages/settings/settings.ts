import { ViewChild, Component } from '@angular/core';
import {  NavController, NavParams, MenuController } from 'ionic-angular';

import { ContribSettingsPage } from './contrib/contrib';
import { SearchSettingsPage } from './search/search';
import { LocalSettingsPage } from './local/local';
import { AboutPage } from '../about/about';

@Component({
  templateUrl: 'settings.html',
})
export class SettingsPage{

  @ViewChild('content') contentNavCtrl: NavController;

  searchSettings= SearchSettingsPage;
  ContribSettings= ContribSettingsPage;
  LocalSettings= LocalSettingsPage;
  aboutPage= AboutPage;

  rootPage = this.searchSettings;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public menuCtrl: MenuController,
  ){}

  ionViewDidEnter(){
    this.menuCtrl.enable(true, 'settings-menu');
  }

  openPage(page){
    this.contentNavCtrl.setRoot(page);
  }

}
