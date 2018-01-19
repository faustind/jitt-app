import { Component } from '@angular/core';
import { NavController, NavParams, MenuController, ModalController, ToastController } from 'ionic-angular';

import { JittWord } from '../../providers/db/db';

import { MemoFormComponent } from '../../components/memo-form/memo-form';
import { DefinitionFormComponent } from '../../components/definition-form/definition-form';
import  'rxjs/add/observable/of';
import  'rxjs/add/operator/take';


import { ApiProvider } from '../../providers/api/api.provider';
import { dbProvider } from '../../providers/db/db.provider'


@Component({
  selector: 'bookmark',
  templateUrl: 'bookmark.html',
})
export class BookmarkPage {

  private results: JittWord[];
  private selectedResult: JittWord;
  private searchedWord: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public menuCtrl: MenuController,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    private db: dbProvider
  ) { }

  ionViewWillEnter(){ }

  ionViewDidEnter(){
    this.menuCtrl.enable(true, 'result-list');
    this.db.getBookmarked()
    .then(
      (results) => {
        results.forEach((result, index, results) => {
          result.loadMemo();
          result.loadDefinitions();
          result.orderDefinitions;
        })
        this.results = results;
      })
    .catch(err => console.log(err))
  }

  /**
   * get results from db Provider provider
  */
  getResults(word: string): any{
    this.db.findInLocals(word)
    .then(
      (results) => {
        results.forEach((result, index, results) => {
          result.loadMemo();
          result.loadDefinitions();
          result.orderDefinitions;
        })
        this.results = results;
      })
    .catch(err => console.log(err))
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
    if(ev.key == "Enter" &&
      this.searchedWord && this.searchedWord.trim().length > 1
    ){
      this.getResults(this.searchedWord.trim());
    }
  }

  /**
   * Bookmarks the selectedResult and save it to the local db
  */
  toogleBookmark(){
    if(this.selectedResult){
      if (!this.selectedResult.bookmark){
        this.selectedResult.bookmark = true;
        this.selectedResult.save();
      } else {
        this.selectedResult.bookmark = false;
        this.selectedResult.save();
      }
    }
  }

  showMemoForm(){
    if(this.selectedResult){
      let memoModal = this.modalCtrl.create(MemoFormComponent, { word: this.selectedResult });

      memoModal.onDidDismiss(memo => {
        if (memo && memo.content.length > 0){
          console.log('memo saved ' + JSON.stringify(memo));
          this.selectedResult.memo = memo.content;
          this.presentToast("Your memo has been successfuly saved !");
        } else if( typeof memo == "undefined") {
          this.selectedResult.memo = "";
          console.log('Memo has not been saved.');
        }
      });
      memoModal.present();

    } else {
      console.log('No word selected');
    }
  }

  showDefinitionForm(){
    if(this.selectedResult){
      let definitionModal = this.modalCtrl.create(DefinitionFormComponent, { word: this.selectedResult });

      definitionModal.onDidDismiss(definition => {
        if (definition && definition.defId){
          console.log('definition as been saved on jitt');
          if(this.selectedResult.definitions){
              this.selectedResult.definitions.push(definition);
          } else {
            this.selectedResult.definitions = [];
            this.selectedResult.definitions[0]=definition;
          }

          this.presentToast("Thank you for your contribution !");
        } else { console.log('Definition has not been saved.') }
      });
      definitionModal.present();

    } else {
      console.log('No word selected');
    }
  }

  compareFn(wd: JittWord): boolean{
    return wd && this.selectedResult ? wd.word === this.selectedResult.word : wd === this.selectedResult;
  }


  presentToast(message: any){
    let toast = this.toastCtrl.create({
      message: message,
      duration: 2000,
      position: 'bottom'
    });
    toast.present();
  }

}
