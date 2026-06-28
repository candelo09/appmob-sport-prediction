import { getFinalsMatches } from "@/src/services/finals-service";
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
