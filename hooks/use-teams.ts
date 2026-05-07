import { allTeams } from "@/src/services/teams-service";

import { useQuery } from "@tanstack/react-query";

export const useAllTeams = () => {
  const findallTeam = useQuery({
    queryKey: ["allTeam"],
    queryFn: () => allTeams(),
    // staleTime: 1000 * 60 * 60 * 24 //24horas
  });

  return {
    findallTeam,
  };
};
