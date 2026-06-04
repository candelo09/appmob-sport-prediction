import { Participant } from "../interfaces/participants";
import { sportPredictionApi } from "./api/sport-prediction-api";

export const allParticipant = async () => {
  try {
    const { data } =
      await sportPredictionApi.get<Participant[]>("participants");

    const dataParticipant: Participant[] = data;

    return dataParticipant;
  } catch (error) {
    console.error(error);
  }
};

export const saveParticipant = async (participant: Participant) => {
  try {
    const { data } = await sportPredictionApi.post<Participant>(
      "participants",
      participant,
    );

    const dataParticipant: Participant = data;

    return dataParticipant;
  } catch (error) {
    console.error(error);
  }
};

export const updateParticipant = async (
  id: number,
  participant: Participant,
) => {
  try {
    const { data } = await sportPredictionApi.patch<Participant>(
      `participants/${id}`,
      participant,
    );

    const dataParticipant: Participant = data;

    return dataParticipant;
  } catch (error) {
    console.error(error);
  }
};

export const deleteParticipant = async (id: number) => {
  try {
    const { data } = await sportPredictionApi.delete(`participants/${id}`);

    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
