import { getFinalsMatches } from "@/src/services/finals-service";
import { useQuery } from "@tanstack/react-query";

export const useFinals = () => {
  const finalsQuery = useQuery({
    queryKey: ["finalsMatches"],
    queryFn: getFinalsMatches,
  });

  return {
    finalsQuery,
  };
};
