import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

// shared component module
import { ComponentsModule } from '../components/components.module';
// app providers
import { dbProvider } from '../providers/db/db.provider';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ResultPage } from '../pages/result/result';
import { TabsPage } from '../pages/tabs/tabs';
import { CollaborationPage } from '../pages/collaboration/collaboration';
import { BookmarkPage } from '../pages/bookmark/bookmark';
import { SettingsPage } from '../pages/settings/settings';
import { SearchSettingsPage } from '../pages/settings/search/search';

import { LocalSettingsPage } from '../pages/settings/local/local';
import { ContribSettingsPage } from '../pages/settings/contrib/contrib';
import { AboutPage } from '../pages/about/about';

import { MemoFormComponent } from '../components/memo-form/memo-form';
import { DefinitionFormComponent } from '../components/definition-form/definition-form';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ResultPage,
    TabsPage,
    CollaborationPage,
    BookmarkPage,
    SettingsPage,
    ContribSettingsPage,
    LocalSettingsPage,
    SearchSettingsPage,
    AboutPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    ComponentsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ResultPage,
    TabsPage,
    CollaborationPage,
    BookmarkPage,
    SettingsPage,
    ContribSettingsPage,
    LocalSettingsPage,
    SearchSettingsPage,
    AboutPage,
    MemoFormComponent,
    DefinitionFormComponent
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    dbProvider,
  ]
})
export class AppModule {}
