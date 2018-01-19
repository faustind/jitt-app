import { Component } from '@angular/core';
import { TranslateService } from 'ng2-translate';
import { ViewController } from 'ionic-angular';

@Component({
  selector: 'options-form',
  templateUrl: 'options-form.html',
})
export class OptionsFormComponent {
  language: string;
  english = "en";
  japanese = "ja"
  constructor (public translate: TranslateService, public viewCtrl: ViewController){
    this.language = this.translate.currentLang;
  }

  onLanguageSelected($event){
    console.log($event);
    if (typeof $event !== 'undefined'
        && $event !== this.translate.currentLang){
      this.translate.use($event);
      this.viewCtrl.dismiss();
    }
  }
}
