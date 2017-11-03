import { Component } from '@angular/core';

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

  text: string;

  constructor() {
    console.log('Hello WordDetailsComponent Component');
    this.text = 'Hello World';
  }

  language(lang: string){
    return lang.toLowerCase();
  }

}
