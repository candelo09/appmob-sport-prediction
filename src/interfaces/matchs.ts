export interface Matchs {

    item: {
        id: string;
        date: string;
        stadium: string;
        teamA: Teams;
        teamB: Teams;
    }

}

export interface Teams {
    flag: string;
    name: string;
}


export interface Match {

    item: {

        id: number;
        match_date: Date;
        stage: string;
        home_score: null;
        away_score: null;
        homeTeam: Team;
        awayTeam: Team;
        stadium: string;

    }

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