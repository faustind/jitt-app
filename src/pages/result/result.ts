import { Component } from '@angular/core';
import { NavController, NavParams, MenuController } from 'ionic-angular';

import { ComponentsModule } from '../../components/components.module';

import { Observable } from 'rxjs/Observable'
import  'rxjs/add/operator/switchMap';
import  'rxjs/add/observable/of';
import  'rxjs/add/operator/take';


import { ResultProvider } from '../../providers/result/result';


@Component({
  selector: 'page-result',
  templateUrl: 'result.html',
  providers: [ ResultProvider ]
})
export class ResultPage {

  private result$: Observable<any>;
  private selectedResult: any;
  private searchedWord: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public menuCtrl: MenuController,
    private resultsProvider: ResultProvider
  ) { }

  ionViewWillEnter(){
    //log the word passed by navigation from the homePage
    console.log(this.navParams.get('word'));

    this.searchedWord = this.navParams.get('word');
    this.getResults(this.searchedWord);

    //set the first item as selectedResult
    //this.result$.subscribe((results: any) => {this.selectedResult = results[0]}).unsubscribe();
  }

  ionViewDidEnter(){
    this.menuCtrl.enable(true, 'result-list-menu');
  }

  /**
   * get results from result provider
  */
  getResults(word: string): any{
    console.log(this.resultsProvider.getResults(word));
  //  this.result$ = this.resultsProvider.getResults(word);
    console.log(this.result$);
  }

  /**
   * sets the highlighted element on the result list
  */
  onSelect(result: any){
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

}
