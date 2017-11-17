import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { JittWord } from '../db/db';
import { api } from './config';

@Injectable()
export class ApiProvider {

  constructor(public http: Http) {
    console.log('Hello ResultProvider Provider');
  }

  getResults(word: string){
    return this.http.get(api.host + api.matchWordUrl + word)
    .toPromise()
    .then(response => {console.log(response.json()); return response.json().data as JittWord[]})
  }

  /** @return \JittWord[] */
  getAllWords(){

  }

}
