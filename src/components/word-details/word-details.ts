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

}
