import { Component } from '@angular/core';
import { FormBuilder, FormGroup} from '@angular/forms';
import { NavController, MenuController, AlertController } from 'ionic-angular';

import { LocalProvider } from '../../providers/local/local.provider';

import { ITag, TAGS } from '../../entities/tag';
import { IJittWord, JittWord } from '../../entities/word';

@Component({
  selector: 'page-contact',
  templateUrl: 'collaboration.html'
})
export class CollaborationPage {

  readonly TAGS = TAGS;

  private editList: IJittWord[] = [];
  private wordToAdd: IJittWord;
  private wordForm: FormGroup;

  /**
  * a map of each word in editList[] to its latest value in the form
  */
  editListFormValues: Map<IJittWord, any> = new Map()

  /**
  * ngModel binding poind for the add word bar
  */
  wordAdd: string;

  /**
  * the word that is being edited
  */
  private editingWord: IJittWord;

  showContinueLater: boolean = false;

  continueLatersTotal: number = 0;

  constructor(
    public navCtrl: NavController,
    public MenuCtrl: MenuController,
    public alertCtrl: AlertController,
    private fb: FormBuilder,
    private localProvider: LocalProvider
  ) { this.createForm() }

  ionViewDidEnter(){
    // keeps the menu open on large view ports
    this.MenuCtrl.enable(true, 'menu');
  }

  // form Component

    /**
    * initialize the word form with the selected word from menu
    */
    createForm(){
      this.wordForm = this.fb.group({
        word: '',
        kana: '',
        definition: '',
        eng_translation: '',
        eng_definition: '',
        tags: [],
      })
    }

    /**
     * returns a IJittWord based on the current wordForm.value
    */
    preparePersistWord(){
      const wordFormValue = this.wordForm.value;

      // deep copy of wordForm tags <-- see angular documentation on reactive forms for more ...
      const tagsDeepCopy: ITag[] = wordFormValue.tags.map(
        (tag) => { return Object.assign({}, tag)}
      );

      console.log(tagsDeepCopy);

      const persistWord: IJittWord = {
        word: wordFormValue.word as string,
        kana: wordFormValue.kana as string,
        definition: wordFormValue.definition as string,
        eng_translation: wordFormValue.eng_translation as string,
        eng_definition: wordFormValue.eng_definition as string,
        tags: tagsDeepCopy,
      };

      return persistWord;
    }
  // end form Component


  /**
  * push word to editList
  */
  addToEditList(){
    if (this.wordAdd.trim() !== ''){
      this.wordToAdd = new JittWord();
      this.wordToAdd.word = this.wordAdd;
      //push the word object to edit list
      this.editList.push(this.wordToAdd);
      // clear the input field
      this.wordAdd = '';
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
  removeFromEditingList(editWord: IJittWord){
    console.log("removing " + editWord + " from editList");

    //TODO: ask for confirmation

    // get the index in editList
    const index = this.editList.findIndex((wd)=>{
      return editWord.word == wd.word});

    // if there is save form.value for this word, remove it
    if ( this.editListFormValues.has(this.editList[index])){
      this.editListFormValues.delete(this.editList[index])
    }

    // if this word is currently selected in the form,
    // reset it with the first word in editList
    if(Object.is(this.editingWord, editWord)){
      (this.editList.length - 1 > 0) ? this.onSelectEditingWord(this.editList[0]) : this.editingWord = null;
    }

    // remove from edit list
    this.editList.splice(index, 1);
  }

  showUserDetails(){
    console.log("collaboration.showUserDetails: showing user details")
  }

  /**
  * updates this.editingWord and this.wordForm.value
  */
  onSelectEditingWord(editWord: IJittWord){

    if (this.editingWord){ // there was a word selected, save its form values
          this.editListFormValues
              // save the previously selected word form values
              .set(this.editingWord, this.wordForm.value)
    }

    // set editingWord to the newly selected word
    this.editingWord = editWord;

    // if the word has been selected then it is in editList[], find its index
    const index =  this.editList.findIndex(
     (editListWord) => {return Object.is(editListWord, editWord) }
    );

    if( !this.editListFormValues.has(editWord)){ // if it has no saved form values
      // set manually
      this.wordForm.reset({
        word: this.editingWord.word || '',
        kana: this.editingWord.kana || '',
        eng_translation: this.editingWord.eng_translation || '',
        definition: this.editingWord.definition || '',
        eng_definition: this.editingWord.eng_definition || '',
        tags: this.editingWord.tags || []
      })
      //  this.editListFormValues.set(this.editList[index], this.wordForm.value);
    } else { // it has saved form values, use them to reset this.wordForm
      this.wordForm.reset(this.editListFormValues.get(editWord))
    }
  } // <-- end onSelectEditingWord()

  onContinueLater(){

      // the word is now being added to continueLaters, increase their number
    !this.editingWord.isContinueLater? this.continueLatersTotal++ : null;


    this.editList[this.editList.indexOf(this.editingWord)] =
    this.editingWord =
    this.preparePersistWord();

    this.editingWord.isContinueLater = this.editList[this.editList.indexOf(this.editingWord)].isContinueLater = true;

    this.editingWord.isHidden =  this.editList[this.editList.indexOf(this.editingWord)].isHidden = true;

    console.log(this.editingWord, this.editList);
  }

  onSaveLocal(){
    // remove from editable list and set isLocal to true
    console.log(this.wordForm.value);
    console.log(this.editingWord);
  }

  onAddToJitt(){
    //if user is different from "anonymous" change flag to jitt verified
    // and call remove from edit list

    /* for now we show an alert */
    let confirm = this.alertCtrl.create({
      title: '登録しないと',
      message: '登録しないと、jittに追加できないですよ...',
      buttons: [
        {
          text: 'あとでする',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: '登録します',
          handler: () => {
            console.log('Agree clicked');
          }
        }
      ]
    });
    confirm.present();
  }


  /**
   * shows or hide words in continue later
  */
  toggleContinueLater(){
    //set isHidden to true for all isContinueLater==false
    // and isHidden  to false for everyfing else.
    console.log("collaboration.toggleContinueLater : toggle");


    if (this.showContinueLater){ //is continueLaters are presently displayed, hide them
      this.editList.forEach((wd) => {
        if(wd.isContinueLater){
          wd.isHidden = true;
        } else {
          wd.isHidden = false;
        }
      })
      this.showContinueLater = false;
    } else { // there are not shown, show them
      this.editList.forEach((wd) => {
        if(wd.isContinueLater){
          wd.isHidden = false;
        } else {
          wd.isHidden = true;
        }
      })
      this.showContinueLater = true;
    }
  }
}
