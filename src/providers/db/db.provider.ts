import { Injectable } from '@angular/core';

import { Dexie } from 'dexie'


import { db, JittWord, ITag, IDefinition, IMemo } from './db';


@Injectable()
export class dbProvider {

  constructor(){ }
  /**
  * return full matches of word kana or translation for given word
  */
  find(word: string): Promise<JittWord[]>{
    return db.words
      .where('word').equalsIgnoreCase(word)
      .or('kana').equals(word)
      .or('translation').equalsIgnoreCase(word)
      .toArray(results => {
        return results.length == 0
        ?  Promise.reject("No match found in local db")
        :  Promise.resolve(results);
      });
  }

  /**
  * return matches uniquely from locals and bookmarks
  */
  findInLocals(word : string){

  }

  saveMemo(memo: IMemo): Promise<number>{
    return db.transaction('rw', db.memos, async()=> {
      // memo with same word_id is replaced by the new insertion
      return db.memos.put(memo);
    })
  }

  deleteMemo(memo: IMemo){
    return db.transaction('rw', db.memos, async()=> {
      // memo with same word_id is replaced by the new insertion
      return db.memos.delete(memo.word_id);
    })
  }

  getMemo(wordId: number){
    return db.memos
    .where('word_id')
    .equals(wordId)
    .first( memo => {
      return memo;
    });
  }

  saveDefinition(def: IDefinition){
    return db.transaction('rw', db.definitions, async() => {
      return db.definitions.put(def);
    })
  }

}
