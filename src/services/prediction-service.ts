import { Prediction } from "../interfaces/prediction";
import { sportPredictionApi } from "./api/sport-prediction-api";



export const getAllPredictionByParticipant = async (id:number) => {

    try {

        const { data } = await sportPredictionApi.get<Prediction[]>(`/predictions/${id}`)

        const predictionsByParticipant = data;

        return {
            predictionsByParticipant
        }

    } catch (error) {
        console.error(error);
    }

}

export const createPrediction = async (prediction: Prediction) => {

    try {
        const { data } = await sportPredictionApi.post<Prediction[]>(`/predictions`, prediction)

        const predictions = data;

        // console.log(`predictions`, predictions);

        return {predictions};


    } catch (error) {
        console.error(error);
    }

}
