import scoringRules from "@/src/services/scoring-rules-services";
import { useQuery } from "@tanstack/react-query";

export const useScoringRules = () => {
  const allScoringRules = useQuery({
    queryKey: ["allScoringRules"],
    queryFn: scoringRules,
    staleTime: 1000 * 60 * 60 * 24, //24horas
  });

  return {
    allScoringRules,
  };
};
