import AccordionGroup from "@/src/components/standing/accordionGroup";
import { ScrollView } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";



export default function StandingsTableScreen() {


    // console.log(allGroupStandingByGroup);


    return (


        <SafeAreaProvider style={{ backgroundColor: '#071226', overflow: 'scroll' }}>
            <ScrollView>
                <SafeAreaView>

                    <AccordionGroup></AccordionGroup>


                </SafeAreaView>
            </ScrollView>
        </SafeAreaProvider>


    )

}


