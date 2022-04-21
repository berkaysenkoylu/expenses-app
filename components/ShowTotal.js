import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const ShowTotal = props => {
    return (
        <View style={[styles.totalContainer, props.customStyle]}>
            <Text>{props.title}</Text>

            <Text>{`${props.amount.toFixed(2)} TRY`}</Text>
        </View>
    );
}

export default ShowTotal;

const styles = StyleSheet.create({
    totalContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 5,
        height: 40,
        width: '90%',
        backgroundColor: 'white',
        borderRadius: 12,
        elevation: 5,
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 1
        },
        shadowOpacity: 0.2,
        shadowRadius: 2,
    }
});