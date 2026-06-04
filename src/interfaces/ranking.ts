import { Participant } from "./participants";

export interface Ranking {
  id: number;
  points: number;
  last_updated: Date;
  participant: Participant;
  position_rank: number;
}
