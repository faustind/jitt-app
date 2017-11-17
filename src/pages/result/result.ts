import { Component } from '@angular/core';
import { NavController, NavParams, MenuController } from 'ionic-angular';

import {JittWord } from '../../providers/db/db';
import { ComponentsModule } from '../../components/components.module';

import { Observable } from 'rxjs/Observable'
import  'rxjs/add/operator/switchMap';
import  'rxjs/add/observable/of';
import  'rxjs/add/operator/take';


import { ApiProvider } from '../../providers/api/api.provider';

@Component({
  selector: 'page-result',
  templateUrl: 'result.html',
  providers: [ ApiProvider ]
})
export class ResultPage {

  private results: JittWord[];
  private selectedResult: JittWord;
  private searchedWord: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public menuCtrl: MenuController,
    private apiProvider: ApiProvider
  ) { }

  ionViewWillEnter(){
    // log the word passed by navigation from the homePage
    // console.log(this.navParams.get('word'));

    // this.searchedWord = this.navParams.get('word');
    // this.getResults(this.searchedWord);

    // set the first item as selectedResult
    // this.result$.subscribe((results: any) => {this.selectedResult = results[0]}).unsubscribe();
  }

  ionViewDidEnter(){
    this.menuCtrl.enable(true, 'result-list-menu');
  }

  /**
   * get results from result provider
  */
  getResults(word: string): any{
    // console.log(this.resultsProvider.getResults(word));
    this.apiProvider.getResults(word).then(
      results => this.results = results
    );
    console.log(this.results);
  }

  /**
   * sets the highlighted element on the result list
  */
  onSelectWord(result: JittWord){
    this.selectedResult = result;
  }

  /**
  * event handler for the searchbar
  */
  onInput(ev){
    // if "Enter" key is pressed
    if(ev.key == "Enter" && this.searchedWord.trim() !== ''){
      this.getResults(this.searchedWord);
    }
  }

  showSettings(){
    console.log("result.showSettings: showing settings");
  }

  //TODO: import types definitions
  bookmark(wd: any){
    wd.isBookmarked = true;
  }

  compareFn(wd: JittWord): boolean{
    return wd && this.selectedResult ? wd.word === this.selectedResult.word : wd === this.selectedResult;
  }

}
