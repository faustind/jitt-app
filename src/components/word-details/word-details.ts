import { Component, Input } from '@angular/core';
import { JittWord } from '../../providers/db/db'
/**
 * Generated class for the WordDetailsComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'word-details',
  templateUrl: 'word-details.html'
})
export class WordDetailsComponent {

  @Input() word: JittWord;

  constructor() {
    console.log('Hello WordDetailsComponent Component');
  }

  language(lang: string){
    return lang.toLowerCase();
  }

  selectedWordDefs(lang: string){

    if (this.word.definitions && this.word.definitions.length > 0){
      if(lang == 'EN'){
        return this.word.definitions.filter(def => def.language == 'english')
      } else {
        return this.word.definitions.filter(def => def.language == 'japanese')
      }
    }
  }

}
