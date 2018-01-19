import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NavParams, ViewController } from 'ionic-angular';

import { dbProvider } from '../../providers/db/db.provider';
import { JittWord, IDefinition } from '../../providers/db/db';
import { ApiProvider } from '../../providers/api/api.provider';

/**
 * Generated class for the DefinitionFormComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'definition-form',
  templateUrl: 'definition-form.html',
  providers: [ ApiProvider ]
})
export class DefinitionFormComponent {

  word: JittWord;
  def: IDefinition =  <IDefinition>{};

  constructor(
    public navParams: NavParams,
    public viewCtrl: ViewController,
    private db: dbProvider,
    private api: ApiProvider
  ) {
    this.word = this.navParams.get('word');
    this.setDef();
  }

  setDef(){
    this.def = <IDefinition>{
      word_id: this.word.word_id,
      content: '',
      language: 'english',
      source: '',
      likes: 1,
      contrib: true
    }
  }

  onCancelDefinition(){
    this.viewCtrl.dismiss();
  }

  onSaveDefinition(){
    // save to the server
    // save locally
    // exit
    this.api.submitDefinition(this.def)
    .then( dfn => {
      this.def = dfn;
        this.def.contrib = true; // mark it as a contribution
        this.db.saveDefinition(this.def)
          .catch(err => console.error(`Error while saving definition locally ${err}`))
          .finally(() => this.viewCtrl.dismiss(this.def))
      }
    )
    .catch(err => {console.error(err);   this.viewCtrl.dismiss();});
  }

}
