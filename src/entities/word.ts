/**
* definition of the Word entity
*/

import { Tag } from './tag';

export class JittWord implements IJittWord{

  word: string;
  kana: string;
  definition: string;
  eng_translation: string;
  eng_definition: string;
  tags: Tag[];

  constructor(){}
}

export interface IJittWord{

  id?: number,
  word: string,
  kana: string,
  definition: string,
  eng_translation: string,
  eng_definition: string,
  tags: Tag[],

  // optional properties

  /**
  * Optional user added comment
  */
  comment?: string,

  /**
  * Optional is in user bookmarks
  */
  isBookmarked?: boolean,

  /**
  * Optional is available only locally
  */
  isLocal?: boolean,

  /**
  * Has been verified by at least one registered jitt collaborator
  */
  isJittVerified?: boolean,

  /**
  * associated form has all field filled
  */
  isAllFilled?: boolean,

  /**
  * associated form has been opened for edition
  */
  hasBeenTouched?: boolean,

  /**
   * the word is marked for continued edition
  */
  isContinueLater?: boolean,

  /**
   * controling wether the word is showed or not
  */
  isHidden?: boolean
}
