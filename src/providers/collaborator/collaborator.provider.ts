import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { ICollaborator, ANONYMOUS_COLLABORATOR } from '../../entities/collaborator';
@Injectable()
export class collaboratorProvider {

  collaborator: ICollaborator = ANONYMOUS_COLLABORATOR;

  constructor(){}

  /**
   * sets a new collaborator
  */
  setCollaborator(user: ICollaborator): Observable<ICollaborator>{
    //TODO: save the user online and offline Databases
    return Observable.of(this.collaborator = user);
  }

  /**
   * returns true if the current user is not in the jittDatabase.
  */
  isAnonym(): boolean{
    return this.collaborator === ANONYMOUS_COLLABORATOR;
  }

}
