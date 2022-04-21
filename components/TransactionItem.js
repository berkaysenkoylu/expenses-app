import { StyleSheet, Text, View, Pressable } from 'react-native';
import React from 'react';
import { FontAwesome } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import { removeTransaction } from '../store/transactions';

import CategoryToIconMap from '../utils/utility';

const TransactionItem = props => {
    const dispatch = useDispatch();
    const transactionData = props.data || {};
    const transactionIcon = CategoryToIconMap[transactionData.category];

    const onTransactionDeletedHandler = () => {
        dispatch(removeTransaction({ removedId: transactionData.id }))
    }

    return (
        <Pressable style={styles.transactionItem} onPress={props.transactionEdit}>
            <View style={{ flex: 2 }}>
                <FontAwesome name={transactionIcon.icon} size={25} color={transactionIcon.color || '#5fb8de'} />
            </View>

            <Text style={{ flex: 5, marginLeft: 3 }}>{transactionData.name}</Text>
            <Text style={{ flex: 5 }}>{(new Date(transactionData.date)).toLocaleDateString('en-GB')}</Text>
            <Text style={{ flex: 3 }}>{transactionData.amount}</Text>
            <View style={{ backgroundColor: '#b51f1f', alignItems: 'center', borderRadius: 20, height: 20, width: 20, marginRight: 3 }}>
                <Pressable android_ripple={{ color: '#dddddd' }} style={({ pressed }) => pressed && styles.pressed} onPress={onTransactionDeletedHandler} >
                    <FontAwesome name='remove' size={18} color='white' />
                </Pressable>
            </View>
        </Pressable>
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
        paddingVertical: 15,
        paddingLeft: 5,
        borderRadius: 8,
        marginBottom: 5 // Only for last child
    },
    pressed: {
        opacity: 0.5
    }
});