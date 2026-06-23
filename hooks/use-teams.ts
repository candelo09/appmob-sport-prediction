import { MatchFinal } from "@/src/interfaces/matchs";
import {
  allTeams,
  allTeamsFinales,
  saveTeamsFinales,
} from "@/src/services/teams-service";

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

export const useAllTeamsFinales = () => {
  const findallTeam = useQuery({
    queryKey: ["allTeamFinales"],
    queryFn: () => allTeamsFinales(),
    // staleTime: 1000 * 60 * 60 * 24 //24horas
  });

  return {
    findallTeam,
  };
};

// export const useSaveTeamsFinales = (teamFinal: MatchFinal) => {
//   const saveTeamsFinal = useQuery({
//     queryKey: ["saveTeanFinales"],
//     queryFn: () => saveTeamsFinales(teamFinal),
//     // staleTime: 1000 * 60 * 60 * 24 //24horas
//   });

//   return {
//     saveTeamsFinal,
//   };
// };

export default function useSaveTeamsFinales() {
  function toCreateTeamFinal(bodyMatchFinal: MatchFinal) {
    saveTeamsFinales(bodyMatchFinal);
  }

  return { toCreateTeamFinal };
}
