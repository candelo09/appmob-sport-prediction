import { Match } from "../interfaces/matchs";
import { Podium } from "../interfaces/podium";
import { sportPredictionApi } from "./api/sport-prediction-api";
import { getAllMatches } from "./matches-service";

export const FINAL_PHASES = [
  "Diciseisavos",
  "Octavos",
  "Cuartos",
  "Semifinal",
  "Tercer Puesto",
  "Final",
] as const;

export type FinalPhase = (typeof FINAL_PHASES)[number];

const normalizeText = (value: string) =>
  value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

export const getFinalPhase = (match_phase: string): FinalPhase | undefined => {
  const normalizedMatchPhase = normalizeText(match_phase);

  console.log("normalizedMatchPhase ", normalizedMatchPhase);

  if (normalizedMatchPhase.includes("round_32")) return "Diciseisavos";
  if (normalizedMatchPhase.includes("round_16")) return "Octavos";
  if (normalizedMatchPhase.includes("quarter")) return "Cuartos";
  if (normalizedMatchPhase.includes("semi")) return "Semifinal";
  if (
    normalizedMatchPhase.includes("third_place") ||
    normalizedMatchPhase.includes("3 puesto") ||
    normalizedMatchPhase.includes("tercero")
  ) {
    return "Tercer Puesto";
  }
  if (normalizedMatchPhase.includes("final")) return "Final";

  return undefined;
};

export const getFinalsMatches = async () => {
  const matches = await getAllMatches();

  // console.log("matches ", matches);

  return (matches || []).filter((match: Match) =>
    getFinalPhase(match.match_phase),
  );
};

export const savePodium = async (podium: Podium) => {
  try {
    const { data } = await sportPredictionApi.post<Podium[]>(`/podium`, podium);

    const resPodium = data;

    // console.log(`predictions`, predictions);

    return { resPodium };
  } catch (error) {
    console.error(error);
  }
};

export const getPodiumByParticipant = async (id_participant: number) => {
  try {
    const { data } = await sportPredictionApi.get<Podium>(
      `podium/${id_participant}`,
    );

    const podiumParticipant = data;

    // console.log(`matchs`, matchs);

    return podiumParticipant;
  } catch (error) {
    console.error(error);
  }
};
