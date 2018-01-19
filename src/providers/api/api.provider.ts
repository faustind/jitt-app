import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { JittWord, IDefinition } from '../db/db';
import { api } from './config';

@Injectable()
export class ApiProvider {

  constructor(public http: Http) {
    console.log('Hello ResultProvider Provider');
  }

  getResults(word: string): Promise<JittWord[]>{
    return this.http.get(api.host + api.matchWordUrl + word)
    .toPromise()
    .then(response => {
      console.log(response.json().data);
      return response.json().data
        .map(wordData => { // map each word data to a JittWord object
          return Object.assign(new JittWord(), wordData);
        })
    })
  }

  /** @return \JittWord[] */
  getAllWords(){}

  /**
  * Increments the likes of definition with id defId on server
  * If unlike is set to true, definition.likes will be decremented.
  * @param int defId server id of the definition
  * @param boolean unlike, defaults to false
  * @return IDefinition
  */
  likeDefinition(defId: number, unlike = false){
    let url = api.host + api.likeDefinitionUrl + defId;
    url += unlike ? "/true" : "";

    return this.http.get(url)
    .toPromise()
    .then(response => {return response.json().data.definition as IDefinition})
  }

  submitDefinition(def: IDefinition){

    let data = new FormData();
    data.set('definition', JSON.stringify(def));

    return this.http
    .post(api.host + api.addDefinitionUrl, data)
    .toPromise()
    .then(res => {return res.json().data.definition as IDefinition})
    .catch(err => {
      console.error('Error while submiting the definition ' +  err);
      return Promise.reject(err);
    });
  }

  getTags(){
    return this.http.get(api.host + api.tagsUrl)
    .toPromise()
    .then(response => {
      //console.log(response.json().data);
      return response.json().data
    })
  }

  /** @return a promise that resolve with the saved word on server */
  submitWord(word: JittWord): Promise<JittWord>{
    let data = new FormData();
    data.set('word', JSON.stringify(word.toJson()));

    return this.http
    .post(api.host + api.addWordUrl, data)
    .toPromise()
    .then(res => {return Object.assign(new JittWord(), res.json().data.word)})
    .catch(err => {
      console.error('Error while submiting the word ' +  err);
      return Promise.reject(err);
    });
  }

}
