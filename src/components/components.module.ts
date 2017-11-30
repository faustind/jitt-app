import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { ReactiveFormsModule } from '@angular/forms';

import { WordItemComponent } from './word-item/word-item';
import { DefinitionComponent } from './definition/definition';
import { DefinitionLanguageGroupComponent } from './definition-language-group/definition-language-group';
import { WordDetailsComponent } from './word-details/word-details';
import { WordFormComponent } from './word-form/word-form';
import { MemoFormComponent } from './memo-form/memo-form';
import { DefinitionFormComponent } from './definition-form/definition-form';


@NgModule({
	declarations: [
    WordItemComponent,
    DefinitionComponent,
    DefinitionLanguageGroupComponent,
    WordDetailsComponent,
    WordFormComponent,
    MemoFormComponent,
    DefinitionFormComponent],
	imports: [ IonicModule, ReactiveFormsModule ],
	exports: [
    WordItemComponent,
    DefinitionComponent,
    DefinitionLanguageGroupComponent,
    WordDetailsComponent,
    WordFormComponent,
    MemoFormComponent,
    DefinitionFormComponent
  ]
})
export class ComponentsModule {}
