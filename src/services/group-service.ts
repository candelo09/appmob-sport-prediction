import { sportPredictionApi } from "./api/sport-prediction-api";


export const getAllGroup = async () => {

    try {
        const { data } = await sportPredictionApi.get<any[]>('groups')

        const group = data;

        // console.log(`group`, group);

        return group;


    } catch (error) {
        console.error(error);
    }

}
