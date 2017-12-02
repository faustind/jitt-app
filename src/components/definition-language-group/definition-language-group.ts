import { Component, Input, OnInit } from '@angular/core';
import {IDefinition } from '../../providers/db/db';

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
  @Input() definitions: IDefinition[];

  content: string;
  title: string;

  showIcon: string = 'md-eye';
  showDefinitions: boolean = true;

  public static ENGLISH: string = "en";
  public  static JAPANESE: string = "jp"

  constructor() { }

  ngOnInit(){
    //console.log(this.language);
    this.setContent();
  }

  compareDefinitions(def1, def2){
    if ( parseInt(def1.likes) > parseInt(def2.likes)) {
        return -1; // def1 comes first
    } else if (parseInt(def1.likes) < parseInt(def2.likes)){
        return 1; // def2 comes first
    } else {
      return 0; // relative order of def1 and def2 unchanged
    }
  }

  setContent(): void{
    //this.definitions.sort(this.compareDefinitions)
    console.log("definition-language-group.setContent()");
    if(this.language === DefinitionLanguageGroupComponent.ENGLISH){
      this.title = "English";
    } else {
      this.title = "日本語";
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
