import { Component } from '@angular/core';

/**
 * Generated class for the WordItemComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'word-item',
  templateUrl: 'word-item.html'
})
export class WordItemComponent {

  text: string;

  constructor() {
    console.log('Hello WordItemComponent Component');
    this.text = 'Hello World';
  }

}
