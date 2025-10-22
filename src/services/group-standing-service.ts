import { GroupStanding } from "../interfaces/group-standing";
import { sportPredictionApi } from "./api/sport-prediction-api";


export const getByGroupStanding = async (groupId:number) => {

    try {
        const { data } = await sportPredictionApi.get<GroupStanding[]>(`group-standings/by/group/${groupId}`)

        const groupStanding = data;

        // console.log(`groupStanding`, groupStanding);

        return groupStanding;


    } catch (error) {
        console.error(error);
    }

}
