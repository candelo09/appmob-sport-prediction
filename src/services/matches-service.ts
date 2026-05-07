import { Match } from "../interfaces/matchs";
import { sportPredictionApi } from "./api/sport-prediction-api";

export const getAllMatches = async () => {
  try {
    const { data } = await sportPredictionApi.get<Match[]>("matchs");

    const matchs = data;

    // console.log(`matchs`, matchs);

    return matchs;
  } catch (error) {
    console.error(error);
  }
};

export const getMatchesByDate = async (
  matchDateStart: string,
  matchDateEnd: string,
) => {
  try {
    const { data } = await sportPredictionApi.get<Match[]>(
      `matchs/by/matchfordate/${matchDateStart}/${matchDateEnd}`,
    );

    const matchs = data;

    // console.log(`matchs`, matchs);

    return matchs;
  } catch (error) {
    console.error(error);
  }
};

export const getMatchesById = async (matchId: number) => {
  try {
    const { data } = await sportPredictionApi.get<any[]>(`matchs/${matchId}`);

    const matchs = data;

    // console.log(`matchs`, matchs);

    return matchs;
  } catch (error) {
    console.error(error);
  }
};

export const saveMatch = async (match: Match) => {
  try {
    const { data } = await sportPredictionApi.post<Match>("matchs", match);

    const dataMatch: Match = data;

    return dataMatch;
  } catch (error) {
    console.error(error);
  }
};

export const updateMatch = async (id: number, match: Match) => {
  try {
    const { data } = await sportPredictionApi.patch<Match>(
      `matchs/${id}`,
      match,
    );

    const dataMatch: Match = data;

    return dataMatch;
  } catch (error) {
    console.error(error);
  }
};
