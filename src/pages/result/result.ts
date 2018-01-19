import { Component } from '@angular/core';
import { NavController, NavParams, MenuController, ModalController, ToastController, PopoverController } from 'ionic-angular';

import { JittWord } from '../../providers/db/db';

import { MemoFormComponent } from '../../components/memo-form/memo-form';
import { OptionsFormComponent } from '../../components/options-form/options-form';
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
    public popoverCtrl: PopoverController,
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
        (results) => {
          results.forEach((result, index, results) => {
            // look for results that have been saved locally for update
            this.db.find(result.word)
            .then(inDb => {
              // TODO: if result in local, update local with changes from server.
              // For now, only one match is returned per word from the dbProvider.
              // Because, of the unique constraint on db.words.word and full match search
              if(inDb){
                 result.id = inDb[0].id;              // set the result local id
                 result.bookmark = inDb[0].bookmark;  // and set its bookmark value
                 result.save();
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
        // TODO: Inform user that no match was found for the search
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

  showOptions(){
    let optionsPopover = this.popoverCtrl.create(OptionsFormComponent);
  optionsPopover.present();
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
