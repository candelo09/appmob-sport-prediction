import { useAuthContext } from "@/src/context/AuthContext";
import { Participant } from "@/src/interfaces/participants";
import {
  allParticipant,
  deleteParticipant,
  saveParticipant,
  updateParticipant,
} from "@/src/services/participant-service";
import {
  getAllPredictionByMatch,
  getAllPredictionByParticipant,
  getAllPredictionByParticipantAndMatch,
} from "@/src/services/prediction-service";
import { useQuery } from "@tanstack/react-query";

export const useParticipant = (id: number) => {
  const predictionByIdQuery = useQuery({
    queryKey: ["getPredictionById"],
    queryFn: () => getAllPredictionByParticipant(id),
    // staleTime: 1000 * 60 * 60 * 24 //24horas
  });

  return {
    predictionByIdQuery,
  };
};

export const useAllParticipants = () => {
  const findallParticipant = useQuery({
    queryKey: ["allParticipant"],
    queryFn: () => allParticipant(),
    // staleTime: 1000 * 60 * 60 * 24 //24horas
  });

  return {
    findallParticipant,
  };
};

export const usePredictionByMatch = (id: number) => {
  const predictionByIdQuery = useQuery({
    queryKey: ["getPredictionByMatch"],
    queryFn: () => getAllPredictionByMatch(id),
    // staleTime: 1000 * 60 * 60 * 24 //24horas
  });

  return {
    predictionByIdQuery,
  };
};

export const usePredictionByParticipantAndMatch = (
  user_id: number,
  match_id: number,
) => {
  const predictionByIdQuery = useQuery({
    queryKey: ["prediction", user_id, match_id],
    queryFn: () => getAllPredictionByParticipantAndMatch(user_id, match_id),
    enabled: !!user_id && !!match_id,
    // staleTime: 1000 * 60 * 60 * 24 //24horas
  });

  return {
    predictionByIdQuery,
  };
};

// export const useCreatePrediction = (prediction: Prediction) => {
//     const predictionQuery = useQuery({
//         queryKey: ['createPrediction'],
//         queryFn: () => createPrediction(prediction),
//         // staleTime: 1000 * 60 * 60 * 24 //24horas
//     })

//     return {
//         predictionQuery
//     }
// }

export default function useCreateParticipant() {
  //   const { createPrediction } = useCreatePrediction();

  const { user } = useAuthContext();

  function toCreateParticipant(body_participant: Participant) {
    // const participant: Participant = {
    //   fullname: `${body_participant.firstname} ${body_participant.surname}`,
    //   email: body_participant.email,
    //   phone: body_participant.phone,
    //   perfil: body_participant.perfil,
    //   password: body_participant.password,
    //   created_at: body_participant.created_at,
    //   id: undefined,
    //   firstname: body_participant.firstname,
    //   surname: body_participant.surname,
    // };

    saveParticipant(body_participant);
    // alert("Participante creado con exito");
  }

  function toUpdateParticipant(body_participant: Participant) {
    // const participantId: Participant = {
    //   fullname: `${user?.firstname} ${user?.surname}`,
    //   email: `${user?.email}`,
    //   phone: `${user?.phone}`,
    //   perfil: `${user?.perfil}`,
    //   password: ".",
    //   created_at: user?.created_at,
    //   id: user?.id,
    //   firstname: `${user?.firstname}`,
    //   surname: `${user?.surname}`,
    // };

    updateParticipant(body_participant.id || 0, body_participant);
  }

  function toDeleteParticipant(id: number) {
    return deleteParticipant(id);
  }

  return { toCreateParticipant, toUpdateParticipant, toDeleteParticipant };
}
