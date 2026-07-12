import { Podium } from "@/src/interfaces/podium";
import {
  getFinalsMatches,
  getPodiumByParticipant,
  savePodium,
} from "@/src/services/finals-service";
import { executeFunctionCalculatePointForPhaseGroup } from "@/src/services/matches-service";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useFinals = () => {
  const finalsQuery = useQuery({
    queryKey: ["finalsMatches"],
    queryFn: getFinalsMatches,
  });

  return {
    finalsQuery,
  };
};

export const useFinalPointsPhase = () => {
  return useMutation({
    mutationFn: executeFunctionCalculatePointForPhaseGroup,

    onSuccess: (data) => {
      alert(data.message);
    },

    onError: () => {
      alert("Ocurrió un error al calcular los puntos.");
    },
  });
};

export default function usePodium() {
  function toCreatePodium(bodyPodium: Podium) {
    savePodium(bodyPodium);
  }

  // function toUpdateMatch(bodyMatch: Match) {
  //   updateMatch(bodyMatch.id || 0, bodyMatch);
  // }

  return { toCreatePodium };
}

export const usePodiumByParticipant = (id_participant: number) => {
  const podiumParticipantQuery = useQuery({
    queryKey: ["podium"],
    queryFn: () => getPodiumByParticipant(id_participant),
  });

  return {
    podiumParticipantQuery,
  };
};
