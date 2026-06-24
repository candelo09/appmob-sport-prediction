export interface ParticipantGroupStanding {
  participant_id: number;
  group_id: number;
  group_name: string;
  team_id: number;
  team_name: string;
  points: number;
  goals_for: number;
  goals_against: number;
  goal_difference: number;
}
