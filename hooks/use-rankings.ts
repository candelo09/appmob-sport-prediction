import { getRankingParticipants } from "@/src/services/ranking-service";
import { useQuery } from "@tanstack/react-query";

export const useRankgins = () => {
  const allRankingsQuery = useQuery({
    queryKey: ["allRankings"],
    queryFn: getRankingParticipants,
    // staleTime: 1000 * 60 * 60 * 24 //24horas
  });

  return {
    allRankingsQuery,
  };
};
