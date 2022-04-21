import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { VictoryPie } from 'victory-native'

const RecentExpenses = () => {
    return (
        <View>
            <VictoryPie
                colorScale={["tomato", "orange", "gold", "cyan", "navy" ]}
                data={[
                    { x: "Cats", y: 25 },
                    { x: "Dogs", y: 30 },
                    { x: "Birds", y: 15 },
                    { x: "Bats", y: 10 },
                    { x: "Lions", y: 20 },
                ]}
                />
        </View>
    );
}

export default RecentExpenses;

const styles = StyleSheet.create({});