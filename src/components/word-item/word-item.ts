import { Component, Input } from '@angular/core';

import { JittWord } from '../../providers/db/db';

@Component({
  selector: 'word-item',
  templateUrl: 'word-item.html'
})
export class WordItemComponent {

  @Input() word: JittWord;

  constructor() { }

  isBookmarked(): string{
    return this.word.bookmark ? 'primary': 'divider-color';
  }

}
