import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NavParams, ViewController } from 'ionic-angular';

import { dbProvider } from '../../providers/db/db.provider';
import { JittWord, IMemo } from '../../providers/db/db';

/**
 * Generated class for the MemoFormComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'memo-form',
  templateUrl: 'memo-form.html'
})
export class MemoFormComponent {


  word: JittWord;
  memo: IMemo = <IMemo>{};

  constructor(
    public navParams: NavParams,
    public viewCtrl: ViewController,
    private db: dbProvider
  ) {
    this.word = this.navParams.get('word');
    this.setMemo()
  }

  ionViewWillEnter(){
    this.setMemo();
  }

  setMemo(){
    // if there is a memo for this word get it
    this.db.getMemo(this.word.word_id)
    .then(memo => {
      if(memo) { this.memo = memo }
      else { this.memo.word_id = this.word.word_id }
    })
    .catch(err => {
      console.log("No previous memo was found : " + err);
      this.memo = { word_id : this.word.word_id, content : '' }
    })
  }

  onCancelMemo(){
    this.viewCtrl.dismiss();
  }

  onSaveMemo(){
    this.memo.content = this.memo.content.trim();
    let memoId = 0;

    if (this.memo.content && this.memo.content.length > 0){
      this.db.saveMemo(this.memo)
      .then(savedMemoId => { this.viewCtrl.dismiss(this.memo)})
    }
  }

}
