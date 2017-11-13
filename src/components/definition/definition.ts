import { Component, Input, OnInit } from '@angular/core';
import {IDefinition } from '../../providers/db/db';

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


  @Input() definition: IDefinition;

  constructor() {
    console.log('Hello DefinitionComponent Component');
  }

  ngOnInit(){
  }

}
