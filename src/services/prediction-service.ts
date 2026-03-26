import { Prediction } from "../interfaces/prediction";
import { sportPredictionApi } from "./api/sport-prediction-api";

export const getAllPredictionByParticipant = async (id: number) => {
  try {
    const { data } = await sportPredictionApi.get<Prediction[]>(
      `/predictions/by/participant/${id}`,
    );

    const predictionsByParticipant = data;

    return {
      predictionsByParticipant,
    };
  } catch (error) {
    console.error(error);
  }
};

export const getAllPredictionByMatch = async (match_id: number) => {
  try {
    const { data } = await sportPredictionApi.get<Prediction[]>(
      `/predictions/by/match/${match_id}`,
    );

    const predictionsByMatch = data;

    return {
      predictionsByMatch,
    };
  } catch (error) {
    console.error(error);
  }
};

export const getAllPredictionByParticipantAndMatch = async (
  user_id: number,
  match_id: number,
) => {
  try {
    const { data } = await sportPredictionApi.get<Prediction>(
      `/predictions/by/participant/match/${user_id}/${match_id}`,
    );

    const betByParticipant = data;

    return betByParticipant;
  } catch (error) {
    console.error(error);
  }
};

export const createPrediction = async (prediction: Prediction) => {
  try {
    const { data } = await sportPredictionApi.post<Prediction[]>(
      `/predictions`,
      prediction,
    );

    const predictions = data;

    // console.log(`predictions`, predictions);

    return { predictions };
  } catch (error) {
    console.error(error);
  }
};

export const updatePrediction = async (
  prediction_id: number,
  prediction: Prediction,
) => {
  try {
    const { data } = await sportPredictionApi.patch<Prediction[]>(
      `/predictions/${prediction_id}`,
      prediction,
    );

    const predictions = data;

    // console.log(`predictions`, predictions);

    return { predictions };
  } catch (error) {
    console.error(error);
  }
};
