import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { ResultPage } from '../result/result';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  private word: string;

  constructor(public navCtrl: NavController) {}

  goToResult(){
    if(this.word && this.word.trim() !== ''){
      console.log("going to result passing...'"+this.word+"'");
      this.navCtrl.push(ResultPage, { word: this.word});
    }
  }

  onKeyUp(ev){
    if(ev.key == "Enter" && this.word.trim() !== ''){
      this.goToResult();
    }
  }

}
