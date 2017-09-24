import { Injectable } from '@angular/core';
// import { Http } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { IJittWord } from '../../entities/word';


@Injectable()
export class LocalProvider {

  bookmarks: IJittWord[] = [];
  localJitts: IJittWord[] = [];
  continueLaters: IJittWord[] = [];
  constructor(){}

  /**
   * add the passed array of words to the bookmark list
   * returns a promise that resolve to true if successfully added
   * and false otherwise
  */
  addBookmarks(words: IJittWord[]): Observable<boolean>{
    if(this.bookmarks = this.bookmarks.concat(words)){
      console.log("localProvider added to bookmarks: " + JSON.stringify(this.bookmarks))
      return Observable.of(true);
    } else {
      console.log("localProvider couldn't add to bookmarks: " + JSON.stringify(this.bookmarks))
      return Observable.of(false);
    }
  }


  /**
   * return an observable of all bookmarks
  */
  getbookmarks(): Observable<IJittWord[]>{
    return Observable.of(this.bookmarks)
  }


  /**
   * add the passed array of words to the localJitts list
   * returns a promise that resolve to true if successfully added
   * and false otherwise
  */
  addLocals(words: IJittWord[]): Observable<boolean>{
    if(this.localJitts = this.localJitts.concat(words)){
      return Observable.of(true);
    } else {
      return Observable.of(false);
    }
  }


  /**
   * return an observable of all localJitts
  */
  getLocals(): Observable<IJittWord[]>{
    return Observable.of(this.localJitts)
  }

}
