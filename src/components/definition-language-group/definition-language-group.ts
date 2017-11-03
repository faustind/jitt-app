import { Component, Input, OnInit } from '@angular/core';

/**
 * Generated class for the DefinitionLanguageGroupComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'definition-language-group',
  templateUrl: 'definition-language-group.html'
})
export class DefinitionLanguageGroupComponent implements OnInit {


  @Input() language: string;

  content: string;
  title: string;

  showIcon: string = 'md-eye';
  showDefinitions: boolean = true;

  public static ENGLISH: string = "en";
  public  static JAPANESE: string = "jp"

  constructor() {
    console.log('Hello DefinitionLanguageGroupComponent Component');

  }

  ngOnInit(){
    console.log(this.language);
    this.setContent();
  }

  setContent(): void{
    console.log("definition-language-group.setContent()");
    if(this.language === DefinitionLanguageGroupComponent.ENGLISH){
      this.title = "English";
      this.content= "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sapiente ipsum, sed esse veritatis unde provident consequuntur, assumenda minima numquam aliquam ab fuga vel quos ea perspiciatis repellendus suscipit quis, incidunt dolorum dignissimos deserunt. Reprehenderit, quasi. Sit reiciendis, at ut, perspiciatis voluptatum nisi fugit ab animi delectus excepturi, nulla reprehenderit eum!"
    } else {
      this.title = "日本語";
      this.content= "彼らも常に足からしありように出てくるだのだろばだからある程度吉利知人ありうです。しかもある程度十人も道具にして、今日にようやく願いたましと考えと、なかったたて実はご運動をさなくなら。空腹の途中へ、この一つに今日からきまっだけ、場合中にどう途中三一二度に使いかもの叫び声。"
    }
  }

  /**
   * toggle visibility of definition block items
  */
  toggleShow(): boolean{

    // toggle visibility icon
    if(this.showDefinitions){
      this.showIcon = 'md-eye-off';
    } else {
      this.showIcon = 'md-eye';
    }

    return this.showDefinitions = !this.showDefinitions;
  }
}
