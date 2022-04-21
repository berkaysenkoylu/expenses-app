import { StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Colors from '../utils/Colors';
import FilteredExpense from './FilteredExpense';
import InputFilterExpenses from '../components/InputFilterExpense';

const Stack = createNativeStackNavigator();

const FilterExpenses = () => {
    const [date, setDate] = useState();

    const onDateSelectHandler = (dateData) => {
        setDate(dateData)
    }

    return (
        <Stack.Navigator screenOptions={{
            sceneContainerStyle: {
                backgroundColor: Colors['blue700'] // NOT WORKING for some reason
            },
            headerStyle: {
                backgroundColor: Colors['blue300']
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold',
            },
            headerTitleAlign: 'left',
        }} >
            <Stack.Screen
                name='Filter'
                options={{
                    title: 'Filter'
                }}
            >
                {
                    props => <InputFilterExpenses
                        {...props}
                        selectedDate={onDateSelectHandler}
                    />
                }
            </Stack.Screen>

            <Stack.Screen
                name='FilteredExpense'
                options={{
                    headerShown: false
                }}
            >
                {
                    props => <FilteredExpense
                        {...props}
                        date={date}
                    />
                }
            </Stack.Screen>
        </Stack.Navigator>
    );
}

export default FilterExpenses;

const styles = StyleSheet.create({

});