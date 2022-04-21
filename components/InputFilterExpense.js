import { StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import { Picker } from '@react-native-picker/picker';

import CustomButton from './UI/Button';

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const YEARS = [];

for (let i = 2020; i <= (new Date()).getFullYear(); i++) {
    YEARS.push(i.toString());
}

YEARS.reverse();

const InputFilterExpenses = props => {
    const [selectedMonth, setSelectedMonth] = useState('january');
    const [selectedYear, setSelectedYear] = useState('2022');

    const onSubmitHandler = () => {
        props.selectedDate({
            month: selectedMonth,
            year: selectedYear
        });

        props.navigation.navigate('FilteredExpense');
    }

    return (
        <View style={styles.container}>
            <View style={styles.datePickerContainer}>
                <Picker
                    style={{ flex: 4, fontSize: 14 }}
                    itemStyle={{ fontSize: 16 }}
                    selectedValue={selectedMonth}
                    onValueChange={(itemValue, itemIndex) =>
                        setSelectedMonth(itemValue)
                    }
                >
                    {MONTHS.map(month => {
                        return <Picker.Item key={month} label={month} value={month.toLowerCase()} />
                    })}
                </Picker>
                <Picker
                    style={{ flex: 4, fontSize: 14 }}
                    itemStyle={{ fontSize: 16 }}
                    selectedValue={selectedYear}
                    onValueChange={(itemValue, itemIndex) =>
                        setSelectedYear(itemValue)
                    }
                >
                    {YEARS.map(year => {
                        return <Picker.Item key={year} label={year} value={year} />
                    })}
                </Picker>
            </View>

            <CustomButton buttonStyling={{marginTop: 10, width: 120, alignSelf: 'center'}} pressed={onSubmitHandler}>Submit</CustomButton>
        </View>
    );
}

export default InputFilterExpenses;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10
    },
    datePickerContainer: {
        alignSelf: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '90%',
        height: 160,
        backgroundColor: 'white',
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 1
        },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 5,
        borderRadius: 8
    }
});