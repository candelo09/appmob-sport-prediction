export interface GroupStanding {
    id:              number;
    matches_played:  number;
    wins:            number;
    draws:           number;
    losses:          number;
    goals_for:       number;
    goals_against:   number;
    goal_difference: number;
    points:          number;
    team:            Team;
}

export interface Team {
    id:   number;
    name: string;
    flag: string;
}