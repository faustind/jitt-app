import { Component, Input, Output, EventEmitter } from '@angular/core';
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
  @Output() onBookmark = new EventEmitter<boolean>();
  @Output() onMemo = new EventEmitter<boolean>();
  @Output() onAdd = new EventEmitter<boolean>();

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

  showDefinitionForm(){
    this.onAdd.emit();
  }

  toogleBookmark(){
    this.onBookmark.emit();
  }

  showMemoForm(){
    this.onMemo.emit();
  }
}
