/**
* definition of the collaborator entity
*/

export class Collaborator implements ICollaborator{
  username: string;
  email: string;
}

export interface ICollaborator{
  id?: number,
  username: string,
  email: string
}

export const ANONYMOUS_COLLABORATOR: ICollaborator = {
  username: 'anonymous',
  email: ''
}
