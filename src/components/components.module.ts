import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { ReactiveFormsModule } from '@angular/forms';

import { WordItemComponent } from './word-item/word-item';
import { DefinitionComponent } from './definition/definition';
import { DefinitionLanguageGroupComponent } from './definition-language-group/definition-language-group';
import { WordDetailsComponent } from './word-details/word-details';
import { WordFormComponent } from './word-form/word-form';


@NgModule({
	declarations: [
    WordItemComponent,
    DefinitionComponent,
    DefinitionLanguageGroupComponent,
    WordDetailsComponent,
    WordFormComponent],
	imports: [ IonicModule, ReactiveFormsModule ],
	exports: [
    WordItemComponent,
    DefinitionComponent,
    DefinitionLanguageGroupComponent,
    WordDetailsComponent,
    WordFormComponent
  ]
})
export class ComponentsModule {}
