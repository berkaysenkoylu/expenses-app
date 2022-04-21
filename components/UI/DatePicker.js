import { StyleSheet, Text, View} from 'react-native';
import React, { useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';

const Datepicker = props => {
    const [date, setDate] = useState(new Date());

    const onDatePickerChanged = (event, selectedDate) => {
        setDate(selectedDate || date);

        props.datePicked(selectedDate);
    }

    return (
        <View style={styles.dateContainer}>
            <Text style={[styles.labelText, props.labelTextStyle]}>{props.label}</Text>
            
            <View style={[styles.datePicker, props.customStyle]}>
                <DateTimePicker
                    testID='dateTimePicker'
                    value={props.initialValue ? new Date(props.initialValue) : date}
                    mode={props.mode || 'date'}
                    display={props.displayMode || 'default'}
                    onChange={onDatePickerChanged}
                />
            </View>
        </View>
    );
}

export default Datepicker;

const styles = StyleSheet.create({
    dateContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'center',
        width: '80%',
        alignSelf: 'center',
        marginBottom: 12
    },
    labelText: {
        flex: 1,
        fontSize: 18,
        alignSelf: 'center'
    },
    datePicker: {
        width: '40%',
        // marginRight: 25,
        backgroundColor: 'white',
        borderRadius: 8,
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