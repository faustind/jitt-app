import { Component } from '@angular/core';
import { NavController, NavParams, MenuController } from 'ionic-angular';

import { Observable } from 'rxjs/Observable'
import  'rxjs/add/operator/switchMap';
import  'rxjs/add/observable/of';
import  'rxjs/add/operator/take';

import { TAGS } from '../../entities/mock-data';

import { ResultProvider } from '../../providers/result/result';

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
  private result$: Observable<any>;
  private selectedResult: any;
  private searchedWord: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public menuCtrl: MenuController,
  ) { }

  ionViewWillEnter(){
    this.result$ = Observable.of([
      {
        word: '再帰的',
        kana: 'さいきてき',
        definition: '再帰的はあるものを定義するにあたってそれ自身を定義に含むものを言う',
        eng_translation: 'Recursive',
        eng_definition: 'Recursive is said of something that is used in its own definition',
        tags: [TAGS[1], TAGS[6]],
        comment: '数学では <recursion> または　<induction> の訳として < 帰納 (きのう)> を使うことがある',
        isBookmarked: true,
      },
      {
        word: '外部割込み',
        kana: 'がいぶわりこみ',
        definition: '周辺装置の読み書きによって起こる割り込みのこと',
        eng_translation: 'External Interrupt',
        eng_definition: 'An external interrupt is a computer system interrupt that happens as a result of outside interference, whether that’s from the user, from peripherals, from other hardware devices or through a network',
        tags: [TAGS[5],TAGS[1]],
        isBookmarked: false,
      }
    ])
  }

  ionViewDidEnter(){
    this.menuCtrl.enable(true, 'result-list');
  }

  /**
   * get results from result provider
  */
  getResults(word: string): any{

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

}
