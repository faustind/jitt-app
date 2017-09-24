import { IJittWord } from '../../entities/word';
import { TAGS } from '../../entities/tag';

export const WORDS: IJittWord[] = [
  {
    word: '再帰的',
    kana: 'さいきてき',
    definition: '再帰的はあるものを定義するにあたってそれ自身を定義に含むものを言う',
    eng_translation: 'Recursive',
    eng_definition: 'Recursive is said of something that is used in its own definition',
    tags: [TAGS[1], TAGS[6]]
  }
]
