import { Component } from '@angular/core';
import { NavParams, NavController } from 'ionic-angular';

/**
 * Generated class for the BookmarkComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'bookmark',
  templateUrl: 'bookmark.html'
})
export class BookmarkPage {

  text: string;

  constructor() {
    console.log('Hello BookmarkComponent Component');
    this.text = 'Hello World';
  }

}
