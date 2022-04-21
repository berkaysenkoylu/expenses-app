import { StyleSheet, Text, View, Pressable } from 'react-native';
import React from 'react';
import { FontAwesome } from '@expo/vector-icons';

import CategoryToIconMap from '../utils/utility';

const TransactionItem = props => {
    const transactionData = props.data || {};
    const transactionIcon = CategoryToIconMap[transactionData.category];

    return (
        <View style={styles.transactionItem}>
            <View style={{ flex: 2 }}>
                <FontAwesome name={transactionIcon.icon} size={25} color={transactionIcon.color || '#5fb8de'} />
            </View>

            <Text style={{ flex: 5, marginLeft: 3 }}>{transactionData.name}</Text>
            <Text style={{ flex: 5 }}>{(new Date(transactionData.date)).toLocaleDateString('en-GB')}</Text>
            <Text style={{ flex: 3 }}>{transactionData.amount}</Text>
        </View>
    )
}

export default TransactionItem;

const styles = StyleSheet.create({
    transactionItem: {
        width: '80%',
        alignSelf: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'white',
        paddingVertical: 12,
        paddingLeft: 5,
        borderRadius: 8,
        marginBottom: 5, // Only for last child
        backgroundColor: 'white',
        shadowOffset: {
            width: 0,
            height: 1
        },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 5,
        borderRadius: 8
    },
    pressed: {
        opacity: 0.5
    }
});