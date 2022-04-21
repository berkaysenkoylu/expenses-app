import { StyleSheet, View, FlatList } from 'react-native';
import React from 'react';

import ShowTotal from './ShowTotal';
import TransactionItem from './TransactionItem';

const TransactionList = props => {
    const renderItem = ({ item }) => {
        return <TransactionItem
            data={item}
            transactionEdit={() => props.transactionEdited(item.id)}
        />;
    }

    return (
        <View style={styles.transactionListContainer}>
            <ShowTotal
                customStyle={{ marginBottom: 10 }}
                title='Total'
                amount={1099.60}
            />

            <View style={styles.transactionListBody}>
                <FlatList
                    alwaysBounceVertical={false}
                    data={props.transactionList}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                />
            </View>
        </View>
    );
}

export default TransactionList;

const styles = StyleSheet.create({
    transactionListContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: 12
    },
    transactionBody: {
        flex: 12,
        paddingVertical: 10,
        width: '100%',
        alignItems: 'center'
    }
});