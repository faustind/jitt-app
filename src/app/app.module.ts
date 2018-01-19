import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpModule, Http } from '@angular/http';

import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { TranslateModule, TranslateLoader, TranslateStaticLoader} from 'ng2-translate';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

// shared component module
import { ComponentsModule } from '../components/components.module';
// app providers
import { dbProvider } from '../providers/db/db.provider';
import { ApiProvider } from '../providers/api/api.provider';

import { MyApp } from './app.component';
import { ResultPage } from '../pages/result/result';
import { TabsPage } from '../pages/tabs/tabs';
import { CollaborationPage } from '../pages/collaboration/collaboration';
import { BookmarkPage } from '../pages/bookmark/bookmark';


import { MemoFormComponent } from '../components/memo-form/memo-form';
import { OptionsFormComponent } from '../components/options-form/options-form'
import { DefinitionFormComponent } from '../components/definition-form/definition-form';


@NgModule({
  declarations: [
    MyApp,
    ResultPage,
    TabsPage,
    CollaborationPage,
    BookmarkPage,

  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    TranslateModule.forRoot({
            provide: TranslateLoader,
            useFactory: (createTranslateLoader),
            deps: [Http]
        }),
    ComponentsModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ResultPage,
    TabsPage,
    CollaborationPage,
    BookmarkPage,
    OptionsFormComponent,
    MemoFormComponent,
    DefinitionFormComponent
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    dbProvider,
    ApiProvider
  ]
})
export class AppModule {}


export function createTranslateLoader(http: Http) {
  return new TranslateStaticLoader(http, 'assets/i18n', '.json');
}
