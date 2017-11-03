import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';

import { JittWord } from '../db/db'
/*
  Generated class for the ResultProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ResultProvider {

  words: JittWord[];

  constructor(public http: Http) {
    console.log('Hello ResultProvider Provider');
  }

  /**
  * return observable of results for the word in parameter
  */
  getResults(word: string){
    console.log("resultProvider: fetching results...");
    // filter those word, translation, definitions contains the given word
  }

}
