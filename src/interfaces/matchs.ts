export interface Matchs {
  item: {
    id: string;
    date: string;
    stadium: string;
    teamA: Teams;
    teamB: Teams;
  };
}

export interface Teams {
  flag: string;
  name: string;
}

export interface Match {
  id: number;
  match_date: Date;
  stage: string;
  home_score: number;
  away_score: number;
  homeTeam: Team;
  awayTeam: Team;
  stadium: string;
  group: Group;
}

export interface Team {
  id: number;
  name: string;
  flag: string;
  group: Group;
}

export interface Group {
  id: number;
  letter: string;
}
