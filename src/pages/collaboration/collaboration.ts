import { Component } from '@angular/core';
import { NavController, MenuController } from 'ionic-angular';

@Component({
  selector: 'page-contact',
  templateUrl: 'collaboration.html'
})
export class CollaborationPage {

  private editList: string[] = [];
  private wordToAdd: string = '';
  private editingWord: any;


  constructor(
    public navCtrl: NavController,
    public MenuCtrl: MenuController
  ) {

  }

  ionViewDidEnter(){
    this.MenuCtrl.enable(true, 'menu');
  }

  /**
  * push word to editList
  */
  addToEditList(){
    if (this.wordToAdd.trim() !== ''){
      this.editList.push(this.wordToAdd);
      // clear the input field
      this.wordToAdd = '';
    }
  }

  /**
  * push word to editList when enter key is pressed
  */
  onKeyUp(event: any): void{
    if(event.key == "Enter" && this.wordToAdd.trim() !== ''){
      this.addToEditList();
    }
  }

  /*
  * Removes item from the editing list
  */
  removeFromEditingList(word: any){
    console.log("removing " + word + " from editList");
    this.editList.splice(this.editList.indexOf(word), 1);
  }

  showUserDetails(){
    console.log("collaboration.showUserDetails: showing user details")
  }
}
