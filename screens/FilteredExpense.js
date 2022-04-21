import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { DrawerActions } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { VictoryPie, VictoryChart, VictoryBar, VictoryTheme } from 'victory-native';

import Colors from '../utils/Colors';
import CategoryToIconMap from '../utils/utility';
import FilteredTransactionList from '../components/FilteredTransactionList';
import FilteredTransactionGraphs from '../components/FilteredTransactionGraphs';

const Drawer = createDrawerNavigator();

const FilteredExpense = props => {
    const transactions = useSelector(state => state.transactions.transactionList);
    const selectedDate = props.date;

    const filteredTransactions = transactions.filter(transaction => {
        let transactionData = new Date(transaction.date);
        let month = transactionData.toLocaleString('default', { month: 'long' }).toLowerCase();
        let year = transactionData.getFullYear().toString();

        return selectedDate.month === month && selectedDate.year === year;
    });

    const pieChartData = {};
    filteredTransactions.forEach(transaction => {
        pieChartData[transaction.category] = {
            amount: transaction.amount,
            color: CategoryToIconMap[transaction.category].color
        };
    });

    return (
        <Drawer.Navigator screenOptions={{
            headerStyle: {
                backgroundColor: Colors.blue300
            },
            headerLeft: () => {
                return (
                    <TouchableOpacity  onPress={() => props.navigation.goBack()}>
                        <Ionicons name="arrow-back-outline" size={25} color="white" style={{marginLeft: 10}} />
                    </TouchableOpacity>
                );
            },
            headerRight: () => {
                return (
                    <TouchableOpacity onPress={() => props.navigation.dispatch(DrawerActions.openDrawer())}>
                        <Ionicons name="reorder-three-outline" size={30} color="white" style={{marginRight: 10}} />
                    </TouchableOpacity>
                );
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold',
            },
            sceneContainerStyle: {
                backgroundColor: 'white'
            },
            drawerPosition: 'right',
            drawerContentStyle: {
                backgroundColor: Colors.blue300,
            },
            drawerActiveTintColor: 'white'
        }}>
            <Drawer.Screen name='Transaction List' options={{
                drawerIcon: ({color, size}) => <Ionicons name='list' color={color} size={size} />
            }}>
                {
                    props => <FilteredTransactionList
                        {...props}
                        transactionList={filteredTransactions}
                    />
                }
            </Drawer.Screen>
            <Drawer.Screen name='Transaction Graphs' component={FilteredTransactionGraphs} options={{
                drawerIcon: ({color, size}) => <Ionicons name='stats-chart' color={color} size={size} />
            }} />
        </Drawer.Navigator>
        // <View style={styles.mainContainer}>
        //     <Text>Filtered Expenses</Text>

        //     {/* <VictoryPie
        //         labelRadius={({ innerRadius }) => innerRadius + 40}
        //         radius={100}
        //         width={300}
        //         data={Object.keys(pieChartData).map(catData => {
        //             return {
        //                 x: catData,
        //                 y: pieChartData[catData].amount
        //             }
        //         })}
        //         colorScale={Object.keys(pieChartData).map(catData => pieChartData[catData].color)}
        //     /> */}

        //     <VictoryChart theme={VictoryTheme.material} domainPadding={{ x: 20 }}>
        //         <VictoryBar
        //             style={{ data: { fill: "#c43a31" } }}
        //             data={[
        //                 { x:0, y:0 },
        //                 { x: 'Luxury', y:2 },
        //                 { x: 'Market', y:4 },
        //                 { x: 'Restaurant', y:3 },
        //             ]}
        //         />
        //     </VictoryChart>
        // </View>
    );
}

export default FilteredExpense;

const styles = StyleSheet.create({
    mainContainer: {
        alignItems: 'center',
    },
    pieChartContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    }
});