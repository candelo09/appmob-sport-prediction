import { MatchFinal } from "../interfaces/matchs";
import { Teams } from "../interfaces/team";
import { sportPredictionApi } from "./api/sport-prediction-api";

export const allTeams = async () => {
  try {
    const { data } = await sportPredictionApi.get<Teams[]>("teams");

    const dataTeams: Teams[] = data;

    return dataTeams;
  } catch (error) {
    console.error(error);
  }
};

export const allTeamsFinales = async () => {
  try {
    const { data } = await sportPredictionApi.get<MatchFinal[]>("finales");

    const matchs = data;

    // console.log(`matchs`, matchs);

    return matchs;
  } catch (error) {
    console.error(error);
  }
};

export const teamByPhaseFinales = async (team_id: number) => {
  try {
    const { data } = await sportPredictionApi.get<MatchFinal>(
      `finales/by/team/phase/${team_id}`,
    );

    const qualifiedTeam = data;

    // console.log(`qualifiedTeam`, qualifiedTeam);

    return qualifiedTeam;
  } catch (error) {
    console.error(error);
  }
};

export const saveTeamsFinales = async (matchFinal: MatchFinal) => {
  try {
    const { data } = await sportPredictionApi.post<MatchFinal[]>(
      "finales",
      matchFinal,
    );

    const matchs = data;

    // console.log(`matchs`, matchs);

    return matchs;
  } catch (error) {
    console.error(error);
  }
};
