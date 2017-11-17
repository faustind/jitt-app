import Dexie from 'dexie';

export class AppDatabase extends Dexie {

  words: Dexie.Table<JittWord, number>;
  definitions: Dexie.Table<IDefinition, number>;
  eng_definitions: Dexie.Table<IDefinition, number>;
  tags: Dexie.Table<ITag, number>;

    constructor() {

        super("JittDatabase");

        var db = this;

        //
        // Define tables and indexes
        // `_id`--> id on the server, will be used for mutations
        //
        db.version(1).stores({
          words: '++id,word_id,&word,kana,translation,bookmark,edit,tags',
          definitions: '++defId,id,word_id,content,language,source,likes',
          tags: '++id,tag_id,&title,description',
          memos: '++id,wordId,content'
        });
        // This will make it possible to call loadDefinitions()
        // directly on retrieved database objects.
        db.words.mapToClass(JittWord);
    }
}

/* Just for code completion and compilation - defines
    * the interface of objects stored in the definitions table.
    */
export interface IDefinition {
 id?: number,
 _id?: number,
 wordId?: number,
 content: string,
 source: string,
 popularity?: number,
 language?: string
}

/* Just for code completion and compilation - defines
    * the interface of objects stored in the tags table.
    */
export interface ITag {
  tag_id?: number,
  id?: number,
  title: string,
  description?: string
}

export interface IJittWord {
  /**
   * @var number the local id
  */
  id?: number;
  /**
   * @var the id on the server
  */
  word_id?: number;
  word: string;
  kana?: string;
  translation: string;
  saved_date: string;
  tags: ITag[];
}

/* This is a 'physical' class that is mapped to
    * the jittWords table. We can have methods on it that
    * we could call on retrieved database objects.
    */
export class JittWord implements IJittWord{
    // properties fetchable from server
    word_id: number; // id on the server
    word: string;
    kana: string;
    translation: string;
    saved_date: string;

    memo: string;
    bookmark: boolean; // is in the bookmarks
    edit: boolean;  // still being edited
    local: boolean; // never been posted to server

    tags: ITag[]; // retrieval and persisting are handled by dexie
    definitions: IDefinition[];


    constructor() {
        // definitions are to be saved manually, making them non-enumerable
        // will prevent dexie from handling them.
        Object.defineProperties(this, {
            definitions: {value: [], enumerable: false, writable: true },
            tags: {value: [], enumerable: true, writable: true}
        });
    }

}

export var db = new AppDatabase();
