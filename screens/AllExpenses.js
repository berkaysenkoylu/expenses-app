import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useSelector } from 'react-redux';

import TransactionList from '../components/TransactionList';

const AllExpenses = props => {
    const transactions = useSelector(state => state.transactions.transactionList);

    // console.log(transactions)

    return (
        <View style={styles.container}>
            <TransactionList
                transactionList={transactions}
                transactionEdited={props.onTransactionEdited}
            />
        </View>
    )
}

export default AllExpenses;

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});