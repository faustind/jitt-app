import { Component, Input, OnInit } from '@angular/core';
import {IDefinition } from '../../providers/db/db';
import { ApiProvider } from '../../providers/api/api.provider';
import { dbProvider } from '../../providers/db/db.provider';


@Component({
  selector: 'definition',
  templateUrl: 'definition.html',
})
export class DefinitionComponent implements OnInit{


  @Input() definition: IDefinition;

  constructor(
    private api: ApiProvider,
    private db: dbProvider
  ) {
    console.log('Hello DefinitionComponent Component');
  }

  ngOnInit(){
  }

  onLike(){
    let unlike = false;
    if (this.definition.liked){
      // first increment the likes for the user eyes
      this.definition.likes --;
      this.definition.liked = false;
      unlike = true;
    } else {
      this.definition.likes ++;
      this.definition.liked = true;
    }


          // keep the local id
          let id = 0;
          if (this.definition.defId){
            id = this.definition.defId;
          }
          // increment likes on servers and update this definition with the values from server
          this.api.likeDefinition(this.definition.id, unlike)
          .then(def => { def.liked = !unlike; this.definition = def});
          // if the definition is in local db, update it
          if (id){
            this.definition.defId = id;
            this.db.saveDefinition(this.definition)
          }

          console.log(this.definition);
  }

}
