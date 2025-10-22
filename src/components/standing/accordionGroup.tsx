

import { useGroups } from '@/hooks/use-group';

import { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { List } from 'react-native-paper';
import DataTableStanding from './dataTableStanding';

export default function AccordionGroup() {

    // const [expanded, setExpanded] = useState(true);

    const { allGroupsQuery } = useGroups();

    // console.log('allGroupsQuery ', allGroupsQuery.data);


    // const handlePress = () => setExpanded(!expanded);

    const [isLoading, setIsLoading] = useState(true);



    useEffect(() => {
        if (allGroupsQuery) {
            const timeout = setTimeout(() => setIsLoading(false), 1000);
            return () => clearTimeout(timeout);
        }
    }, [allGroupsQuery]);

    if (isLoading) {

        return (
            <View style={styles.loadingContainer}>
                <View style={styles.middle}>
                    <ActivityIndicator size="large" color="#0000ff" />
                    <Text style={{ color: '#fff', fontWeight: 800 }}>Por favor espera un momento...</Text>
                </View>
            </View>
        )

    } else {
        return (

            <List.Section titleStyle={{ color: '#fff', fontSize: 20 }} title="">
                {allGroupsQuery.data?.map((item) => (
                    <List.Accordion
                        key={item.id}
                        title={`Grupo ${item.letter}`}
                    // left={props => <MaterialIcons name="category" size={24} color="black" />}
                    >
                        <View style={{ backgroundColor: '#f1f3f2ff' }}>
                            <DataTableStanding groupId={item.id}></DataTableStanding>
                        </View>
                    </List.Accordion>

                ))}

            </List.Section>


        )
    }



}

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: 'space-between',
        padding: 20,
        margin: 10,
    },
    contentContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    middle: {
        flex: 0.3,
        // backgroundColor: 'beige',
    },
});