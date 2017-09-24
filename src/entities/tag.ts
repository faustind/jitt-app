

export class Tag implements ITag{
  title: string;
}



export interface ITag{
  title: string,
  description?: string,
}


export const TAGS: ITag[] = [
  {
    title: 'General',
    description: 'IT and Computer science related',
  },
  {
    title: 'Programing',
    description: 'Algorithms and Programing languages'
  },
  {
    title: 'Database',
    description: 'RDBMs, OODBMs and other Databases'
  },
  {
    title: 'Network',
    description: 'Network technologies, protocols'
  },
  {
    title: 'Security',
    description: 'Cyber threat, Cyber Security'
  },
  {
    title: 'Hardware',
    description: 'Computer Hardware technologies'
  },
  {
    title: 'Software',
    description: 'Computer Software technologies'
  },
  {
    title: 'Management',
    description: 'IT Business related'
  },
  {
    title: 'Mathematics',
    description: 'Mathematics vocabulary'
  }
]
