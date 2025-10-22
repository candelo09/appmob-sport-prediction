import { Match } from "./matchs";
import { Participant } from "./participants";

export interface Prediction {
    id:                   number;
    predicted_home_score: number;
    predicted_away_score: number;
    created_at:           Date;
    participantId:        Participant;
    matchId:              Match;
}

