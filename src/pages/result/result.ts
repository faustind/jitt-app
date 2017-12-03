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
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    private apiProvider: ApiProvider,
    private db: dbProvider
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
      this.apiProvider.getResults(word)
      .then(
        // if a word in results is in db, use it as a
        // replacement for the result from server
        (results) => {
          results.forEach((result, index, results) => {
            this.db.find(result.word)
            .then(inDb => {
              // TODO: if found update local with changes from server.
              // For now, only one match is returned per word from the dbProvider.
              // Because, of the unique constraint on db.words.word and full match search
              if(inDb){
                inDb[0].loadDefinitions();
                result = inDb[0];
              }
            })
            .catch(err => console.log(err)); // do nothing
            result.loadMemo();
            result.orderDefinitions();
          })
        this.results = results;
      })
      .catch(err => {
        // TODO: look for partial matches in local db for the searchedWord
        // TODO: Inform user that no match was found for his word
        console.log("Error :" + err);
      });
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
        } else { console.log('Memo has not been saved.') }
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
          this.selectedResult.definitions.push(definition);
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
