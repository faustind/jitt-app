import Dexie from 'dexie';

export class AppDatabase extends Dexie {

  words: Dexie.Table<JittWord, number>;
  definitions: Dexie.Table<IDefinition, number>;
  tags: Dexie.Table<ITag, number>;
  memos: Dexie.Table<IMemo, number>;

    constructor() {

        super("JittDatabase");

        var db = this;

        //
        // Define tables and indexes

        db.version(1).stores({
          words: '++id,word_id,&word,kana,translation,tags,bookmark,edit,local',
          definitions: '++defId,id,word_id,content,language,source,likes,liked,contrib',
          tags: '++id,tag_id,&title',
          memos: 'word_id,content',
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
  /** id on local database */
 defId?: number,
 /** id on servers */
 id?: number,
 word_id?: number,
 content: string,
 source: string,
 likes?: number,
 /** the definition has been liked from this user*/
 liked?: boolean,
 language?: string,
 /** this definition is a contribution*/
 contrib: boolean
}

export interface IMemo {
  word_id: number,
  content: string
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
  definitions?: IDefinition[];
}

/* This is a 'physical' class that is mapped to
    * the jittWords table. We can have methods on it that
    * we could call on retrieved database objects.
    */
export class JittWord implements IJittWord{
    // properties fetchable from server
    /** @var int word_id in serever db*/
    word_id: number; // id on the server
    word: string;
    kana: string;
    translation: string;
    saved_date: string;

    /** @var int id in local db*/
    id: number;
    memo: string;
    bookmark: boolean; // is in the bookmarks
    /** @var boolean true if the word is saved for continued edition */
    edit: boolean;  // still being edited
    /** @var boolean true if the word has never been submitted to jitt servers */
    local: boolean; // never been posted to server

    tags: ITag[]; // retrieval and persisting are handled by dexie
    definitions: IDefinition[]; // handled manually


    constructor() {
        // definitions are to be saved manually, making them non-enumerable
        // will prevent dexie from handling them.
        Object.defineProperties(this, {
            definitions: {value: [], enumerable: false, writable: true },
            tags: {value: [], enumerable: true, writable: true}
        });
    }

    /** Saves or updates the word in to local db*/
    save(){
      db.transaction('rw', db.words, db.definitions, async() => {
        //Insert or update the word
        if(!this.id){
          // if no local is set, insert in localdb and get the id
          this.id = await db.words.add(this);

          // ... also save its definitions if presents
          if(this.definitions && this.definitions.length > 0)
            try{
              // TODO: move insertion of definitions to its own class method
              await Promise.all(this.definitions.map(def => {db.definitions.put(def)}))
            } catch (err){
              console.log("Error while saving definitions: " + err)
            }

        } else { // just update it
          // no need to insert definitions here
          // Because definitions manage themselves when it comes to updates
          db.words.update(this.id, this);
        }
      })

      return this.id;
    }

    /** Sets saved definitions from local db*/
    async loadDefinitions(){
        db.definitions.where('word_id')
          .equals(this.word_id)
          .toArray(defs => this.definitions = defs)
    }

    loadMemo(){
      return db.memos
      .where('word_id')
      .equals(this.word_id)
      .first( memo => {
        this.memo = memo.content;
      });
    }

    removeFromLocalDb(){

    }

}

export var db = new AppDatabase();
