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
