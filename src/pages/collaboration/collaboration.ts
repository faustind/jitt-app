import { Component } from '@angular/core';
import { NavController, MenuController, AlertController, ToastController } from 'ionic-angular';

import { dbProvider } from '../../providers/db/db.provider';
import { ApiProvider } from '../../providers/api/api.provider'
import { JittWord } from '../../providers/db/db'

import { TAGS } from '../../entities/mock-data'


@Component({
  selector: 'page-contact',
  templateUrl: 'collaboration.html'
})
export class CollaborationPage {

  readonly TAGS = TAGS;

  private editList: JittWord[] = [];
  private wordToAdd: JittWord;
//  private wordForm: FormGroup;

  /**
  * a map of each word in editList[] to its latest value in the form
  */
  editListFormValues: Map<JittWord, any> = new Map()

  /**
  * ngModel binding for the add word bar
  */
  inputWord: string;

  /**
  * the word that is being edited
  */
  editingWord: JittWord;
  editedWordIndex: number;

  showContinueLater: boolean = false;

  constructor(
    public navCtrl: NavController,
    public MenuCtrl: MenuController,
    public alertCtrl: AlertController,
    private localDb: dbProvider,
    public toastCtrl: ToastController
  ) { }

  ionViewDidEnter(){
    // keeps the menu open on large view ports
    this.MenuCtrl.enable(true, 'menu');
  }

  /**
  * push word to editList
  */
  addToEditList(){
    if (this.inputWord.trim() !== ''){
      this.wordToAdd = new JittWord();
      this.wordToAdd.word = this.inputWord;
      //push the word object to edit list
      this.editList.push(this.wordToAdd);

      if(this.editList.length == 1) this.editingWord = this.editList[0];

      // clear the input field
      this.inputWord = '';
      this.wordToAdd = null;

      //log the current edit list
      console.log("collaboration.addToEditList: ");
      console.log(this.editList);
    }
  }

  /**
  * push word to editList when enter key is pressed
  */
  onKeyUp(event: any): void{
    if(event.key == "Enter"){
      this.addToEditList();
    }
  }

  /*
  * Removes item from the editing list
  * TODO: if the word is selected, clear the form
  */
  removeFromEditingList(wordToRemove: JittWord){
    console.log("removing " + wordToRemove+ " from editList");
    // get the index in editList
    const index = this.editList.findIndex((wd)=>{
      return wordToRemove.word == wd.word});

    // if there is save form.value for this word, remove it
    // if ( this.editListFormValues.has(this.editList[index])){
    //   this.editListFormValues.delete(this.editList[index])
    // }


    // remove from edit list
    this.editList.splice(index, 1);

    // if this word is currently selected in the form,
    // reset it with the next word in editList
    if(Object.is(this.editingWord, wordToRemove)){
      (this.editList.length > 0) ? this.onSelectEditingWord(this.editList[0]) : this.editingWord = null;
    }

  }

  showUserDetails(){
    console.log("collaboration.showUserDetails: showing user details")
  }

  /**
  * updates editingWord
  */
  onSelectEditingWord(selectedWord: JittWord){
    // get the index of the word currently in wordForm
    this.editedWordIndex = this.editList.indexOf(this.editingWord);
    // change the word in wordForm to selectedWord
    this.editingWord = selectedWord;
  }

  /**
   * shows or hide words in continue later
  */
  toggleContinueLater(){
  // fetch all continueLaters from localDb
  // and add them to the head of editList
    console.log("collaboration.toggleContinueLater : toggle");

   }

  /**
   * confirm removal of a word from edit list
  */
  confirmRemoval(editWord: JittWord) {
    const alert = this.alertCtrl.create({
      title: 'Confirm removal',
      message: 'Do you want to quit editing '+ editWord.word +' word forever ?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Yes, I quit',
          handler: () => {
            this.removeFromEditingList(editWord);
            console.log('yes clicked');
          }
        }
      ]
    });
    alert.present();
  }

  onUpdatedWordInput(editedWord: JittWord){
    // update the previously seclected word with values from the wordForm
    this.editList[this.editedWordIndex] = editedWord;
  }

}
