import Dexie from 'dexie';

export class AppDatabase extends Dexie {

  jittWords: Dexie.Table<JittWord, number>;
  jp_definitions: Dexie.Table<IDefinition, number>;
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
          jittWords: '++id,_id,&word,kana,eng_translation,eng_definitions,jp_definitions,bookmark,edit,memo,tags',
          jp_definitions: '++id,_id,wordId,content,source,popularity',
          eng_definitions: '++id,_id,wordId,content,source,popularity',
          tags: 'id,_id,&title,description'
        });
        // This will make it possible to call loadDefinitions()
        // directly on retrieved database objects.
        db.jittWords.mapToClass(JittWord);
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
  _id?: number,
  id?: number,
  title: string,
  description: string
}

/* This is a 'physical' class that is mapped to
    * the jittWords table. We can have methods on it that
    * we could call on retrieved database objects.
    */
export class JittWord {
    _id: number; // id on the server
    id: number;
    word: string;
    kana: string;
    eng_translation: string;
    memo: string;

    bookmark: boolean; // is in the bookmarks
    edit: boolean;  // still being edited
    local: boolean; // never been posted to server

    tags: ITag[]; // retrieval and persisting are handled by dexie
    jp_definitions: IDefinition[];
    eng_definitions: IDefinition[];

    constructor(word: string, kana: string, eng_translation: string, _id?: number) {
        this.word = word;
        this.kana = kana;
        this.eng_translation = eng_translation;
        if (_id) this._id = _id;

        // definitions are to be saved manually, making them non-enumerable
        // will prevent dexie from handling them.
        Object.defineProperties(this, {
            eng_definitions: {value: [], enumerable: false, writable: true },
            jp_definitions: {value: [], enumerable: false, writable: true },
            tags: {value: [], enumerable: true, writable: true}
        });
    }

    /**
     * load the definitions for this word
    */
    async loadDefinitions() {
        [this.eng_definitions, this.jp_definitions] = await Promise.all([
            db.eng_definitions.where('WordId').equals(this.id).toArray(),
            db.jp_definitions.where('WordId').equals(this.id).toArray(),
          ]);
    }

    /**
     * Persist the word and its definitions to local database
     * return a promise that resoleve with the id of the persisted word
    */
    save() {
        return db.transaction('rw', db.jittWords, db.jp_definitions, db.eng_definitions, async() => {

            // Add or update our selves.
            // put handle new addition as well as updates
            // If add, record this.id.
            this.id = await db.jittWords.put(this);

            // TODO: handle errors here
            try{
              await Promise.all ([
                  Promise.all(this.eng_definitions.map(def => {def.wordId = this.id; db.eng_definitions.put(def)})),
                  Promise.all(this.jp_definitions.map(def => {def.wordId = this.id; db.jp_definitions.put(def)}))
              ]);
            } catch(err){
              console.log("couldn't save definitions: "+ err.stac?err.stack:'');
            }

            return this.id;

        });
    }

}

export var db = new AppDatabase();
