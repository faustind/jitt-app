import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';

import { JittWord } from '../db/db'


const WORDS: JittWord[] = [
  new JittWord("職務分掌","しょくむぶんしょう","Segregation of duties"),
  new JittWord("下位互換","かいごかん","Backward compatibility"),
  new JittWord("解像度","かいぞうど","Resolution")
]

@Injectable()
export class ResultProvider {

  words: JittWord[];

  constructor(public http: Http) {
    console.log('Hello ResultProvider Provider');
  }

  /**
  * return observable of results for the word in parameter
  */
  getResults(word: string): Observable<JittWord[]>{
    console.log("resultProvider: fetching results...");
    return Observable.of(WORDS);
  }

}
