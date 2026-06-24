import { ParticipantGroupStanding } from "../interfaces/participant-group-standing";
import { sportPredictionApi } from "./api/sport-prediction-api";

export const getByParticipantGroupStanding = async (
  participantId: number,
  groupId: number,
) => {
  try {
    const { data } = await sportPredictionApi.get<ParticipantGroupStanding[]>(
      `participant-group-standings/${participantId}/${groupId}`,
    );

    const groupStanding = data;

    // console.log(`groupStanding`, groupStanding);

    return groupStanding;
  } catch (error) {
    console.error(error);
  }
};
