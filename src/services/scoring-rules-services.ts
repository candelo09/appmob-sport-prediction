import { ScoringRules } from "../interfaces/scoring-rules";
import { sportPredictionApi } from "./api/sport-prediction-api";

export default async function scoringRules() {
  try {
    const { data } =
      await sportPredictionApi.get<ScoringRules[]>("scoring-rules");

    const scoringRules: ScoringRules[] = data;

    return scoringRules;

    // console.log(`authUser`, authUser);
  } catch (error) {
    console.error(error);
  }

  // console.log(authLogin.email);
  // console.log(authLogin.password);

  // if (authLogin.email !== 'crisannpc@gmail.com' && authLogin.password !== '1234') {

  //     throw new Error("Credenciales Incorrectas");

  // } else {
  //     return {
  //         "email": "crisannpc@gmail.com",
  //         "name": "Cristhian Candelo",
  //     };
  // }
}
