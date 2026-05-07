import { Match } from "@/src/interfaces/matchs";
import {
  getAllMatches,
  getMatchesByDate,
  getMatchesById,
  saveMatch,
  updateMatch,
} from "@/src/services/matches-service";
import { useQuery } from "@tanstack/react-query";

import moment from "moment";

export const useMatchs = () => {
  const allMatchsQuery = useQuery({
    queryKey: ["allMatchs"],
    queryFn: getAllMatches,
    // staleTime: 1000 * 60 * 60 * 24, //24horas
  });

  return {
    allMatchsQuery,
  };
};

export const useMatchsByDate = (matchDateStart: Date, matchDateEnd: Date) => {
  const formatDateStart = moment(matchDateStart).format("YYYY-MM-DD 00:00:00");
  const formatDateEnd = moment(matchDateEnd).format("YYYY-MM-DD 24:00:00");

  const matchsByDateQuery = useQuery({
    queryKey: ["matchByDate"],
    queryFn: () => getMatchesByDate(formatDateStart, formatDateEnd),
    // staleTime: 1000 * 60 * 60 * 24 //24horas
  });

  // console.log(matchsByDateQuery);

  return {
    matchsByDateQuery,
  };
};

export const useMatchsById = (matchId: number) => {
  const matchsByIdQuery = useQuery({
    queryKey: ["matchs", matchId],
    queryFn: () => getMatchesById(matchId),
    staleTime: 1000 * 60 * 60, //1hora
  });

  // console.log(matchsByIdQuery);

  return { matchsByIdQuery };
};

export default function useMatch() {
  function toCreateMatch(bodyMatch: Match) {
    saveMatch(bodyMatch);
  }

  function toUpdateMatch(bodyMatch: Match) {
    updateMatch(bodyMatch.id || 0, bodyMatch);
  }

  return { toCreateMatch, toUpdateMatch };
}
