import { Ranking } from "../interfaces/ranking";
import { sportPredictionApi } from "./api/sport-prediction-api";

export const getRankingParticipants = async () => {

    try {
        const { data } = await sportPredictionApi.get<Ranking[]>(`/rankings`)

        const rankings = data;

        // console.log(`rankings`, rankings);

        return rankings;


    } catch (error) {
        console.error(error);
    }

}