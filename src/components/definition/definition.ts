import { Component, Input, OnInit } from '@angular/core';

/**
 * Generated class for the DefinitionComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'definition',
  templateUrl: 'definition.html'
})
export class DefinitionComponent implements OnInit{

  //TODO: change type to IDefinition
  @Input() definition: any;
  content: string;

  constructor() {
    console.log('Hello DefinitionComponent Component');
  }

  ngOnInit(){
    this.content = this.definition;
  }

}
