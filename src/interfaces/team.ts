export interface Teams {
  id: number;
  name: string;
  flag: string;
  group: Group;
}

export interface Group {
  id: number;
  letter: string;
}
