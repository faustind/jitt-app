import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Dexie } from 'dexie'
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';


import { db, JittWord, ITag, IDefinition } from './db';


@Injectable()
export class dbProvider {

  constructor(private http: Http){
    this.populateLocalDb();
  }

  /**
   * populate the localDb with data retrived from server
  */
  populateLocalDb(){
    db.on('ready', () => {

    })
  }

  /**
  * Toggle the bookmark property of the word in the db
  */
  toggleBookmark(Wordid: number): Observable<boolean>{
    return Observable.of(true);
  }


  /**
   * return all bookmarked words
  */
  getbookmarks(){

  }


  /**
   * add word to the locals list
   * returns a promise that resolve with the id of the persisted word
  */
   saveToLocals(word: JittWord){
      word.local = true;
      // return word.save();
  }


  /**
   * return an observable of all local and bookmark
  */
  getLocalsAndBookmarks() {

  }

  /**
  * return matches
  */
  find(word: string){

  }

  /**
  * return matches uniquely from locals and bookmarks
  */
  findInLocals(word : string){

  }

}
