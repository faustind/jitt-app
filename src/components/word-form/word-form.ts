import { Component, EventEmitter, Input, Output, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, FormArray} from '@angular/forms';
import { ToastController, AlertController } from 'ionic-angular';


import { TAGS } from '../../entities/mock-data'
import { JittWord, IDefinition, ITag} from '../../providers/db/db'

@Component({
  selector: 'word-form',
  templateUrl: 'word-form.html'
})
export class WordFormComponent implements OnChanges{

  @Input() wordInput: JittWord;

  @Output() onUpdatedWordInput = new EventEmitter<JittWord>();

  TAGS = TAGS;
  wordForm: FormGroup;


  constructor(
    private fb: FormBuilder,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController
  ){
    this.createForm();
  }

  ngOnChanges(){
    if(this.wordForm.dirty) this.confirmChange();
    else this.resetWordForm();
  }

  createForm(){
    this.wordForm = this.fb.group({
      word: '',
      kana: '',
      translation: '',
      definitions: this.fb.array([]),
      tags: [],
    })
  }

  resetWordForm(){
    this.wordForm.reset({
      word: this.wordInput.word || '',
      kana: this.wordInput.kana || '',
      translation: this.wordInput.translation || '',
    })
    this.wordForm.get('tags').setValue(this.wordInput.tags || [])
    if(this.wordInput.definitions){
      const dfs = this.wordInput.definitions
      this.setDefinitions(dfs)
    }
  }

  /**
   * a reference to the definitions FormArray
   * for manipulations of its items
  */
  get definitions(): FormArray {
    return this.wordForm.get('definitions') as FormArray;
  }

  /**
  * add a new definition FormGroup to the definitions
  * FormArray
  */
  addDefinition() {
    this.definitions.push(this.fb.group({
      content: '',
      source: '',
      language: ''
    }))
  }

  /**
   * remove a definition FormGroup to the definitions
   * FormArray
  */
  removeDefinition(index: number) {
    this.definitions.removeAt(index);
  }

  /**
   * Replaces the definitions FormArray with a new FormArray
   * initialized by an array of word definition FormGroup
  */
  setDefinitions(definitions: IDefinition[]){
    // map each definition to a definiton fromGroup
    const definitionsFormGroups = definitions.map(definition => {
      return this.fb.group({
        content: definition.content || '',
        source: definition.source || '',
        language: definition.language || ''
      });
    });
    // make a formArray from the definitions formGroups
    const definitionFormArray = this.fb.array(definitionsFormGroups);
    // set the wordForm `definitions` control with the definitionFormArray
    this.wordForm.setControl('definitions', definitionFormArray);
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

    const definitionsDeepCopy: IDefinition[] = wordFormValue.definitions;


    console.log(tagsDeepCopy);

    const persistWord = new JittWord();
    persistWord.word = wordFormValue.word as string,
    persistWord.kana = wordFormValue.kana as string,
    persistWord.translation = wordFormValue.eng_translation as string

    persistWord.definitions = persistWord.definitions.concat(definitionsDeepCopy);
    persistWord.tags = persistWord.tags.concat(tagsDeepCopy);

    return persistWord;
  }

 // form buttons handlers
  /**
   * clears the form
  */
  revert(){
    this.resetWordForm();
  }

  /**
   * submit the word to the jitt server
  */
  onSubmit(){
    // submit to server
    // update words and definitons with ids from the server
    // save word and its definitions
  }


  /**
   * save the word locally
   * remove it from the list
  */
  onSaveLocal(){
    let toSave = this.preparePersistWord();
    toSave.local = true;
    // toSave.save()
    //   .then(id => this.presentToast(`You successfuly saved ${toSave.word} to your dictionary`))
    //   .catch( err => console.log("error while saving word" + err) );
  }

  presentToast(message: string){
    const toast = this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: 'bottom',
      cssClass: 'collaboration-toast'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast: '+ message);
    });

    toast.present();
  }

    /**
     * confirm removal of a word from edit list
    */
    confirmChange() {
      const alert = this.alertCtrl.create({
        title: 'Discard Changes ?',
        message: 'Humn... I\'m confused ',
        buttons: [
          {
            text: 'Discard and switch',
            handler: () => {
              console.log('Discard and switch');
            }
          },
          {
            text: 'Save for Later',
            handler: () => {
              // mark as edit later
              console.log('Save and switch');
              let persistWord = this.preparePersistWord();
              persistWord.edit = true;
            //  persistWord.save().then(id => persistWord.id = id);
              // emit the updated status.
              this.onUpdatedWordInput.emit(persistWord);
              console.log(`word-form: changed state of ${persistWord.word}`);
              this.resetWordForm();
            }
          }
        ]
      });
      alert.present();
    }


  /** compareFn for tags control */
  tagsControl(t1: ITag, t2: ITag): boolean {
    return t1 && t2 ? t1.title === t2.title : t1 === t2;
  }
}
