import { StyleSheet, Text, View, Modal, TextInput } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Picker } from '@react-native-picker/picker';
import Checkbox from 'expo-checkbox';
import { useDispatch, useSelector } from 'react-redux';
import { addTransaction, editTransaction } from '../store/transactions';

import Colors from '../utils/Colors';
import IconButton from './UI/IconButton';
import CustomButton from './UI/Button';
import Datepicker from './UI/DatePicker';

const InputExpense = props => {
    const [mode, setMode] = useState('add');
    const transactions = useSelector(state => state.transactions.transactionList);
    const dispatch = useDispatch();

    const { control, handleSubmit, formState: { errors }, setValue } = useForm({
        defaultValues: {
            name: '',
            amount: '',
            installmentCount: ''
        }
    });
    const [transactionDate, setTransactionDate] = useState((new Date()).getTime());
    const [selectedCategory, setSelectedCategory] = useState('income')
    const [isInstallment, setIsInstallment] = useState(false);
    const [installmentDate, setInstallmentDate] = useState(null);
    // const [transactionToEdit, setTransactionToEdit] = useState({});

    useEffect(() => {
        let transactionToEditId = props.transactionToEditId;
        let selectedTransaction = {};

        if (transactionToEditId && transactionToEditId !== '') {
            selectedTransaction = transactions.find(transaction => transaction.id === transactionToEditId);

            // setTransactionToEdit(selectedTransaction);

            setMode('edit');

            setValue('name', selectedTransaction.name);
            setValue('amount', selectedTransaction.amount);
            setValue('installmentCount', selectedTransaction.installmentCount);
            setTransactionDate(selectedTransaction.date);
            setSelectedCategory(selectedTransaction.category);
            setIsInstallment(selectedTransaction.isInstallment);
            selectedTransaction.isInstallment && setInstallmentDate(selectedTransaction.installmentDate);

            // Populate the form fields
        }
    }, [props.transactionToEditId]);

    const onDatePickedHandler = (dateType, date) => {
        let dateData = (new Date(date)).getTime();

        if (dateType === 'transactionDate') {
            setTransactionDate(dateData);
        } else if (dateType === 'installmentStartDate') {
            setInstallmentDate(dateData);
        }
    }

    const onSubmit = (data) => {
        function guidGenerator () {
            const S4 = function () {
                return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
            };
            return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
        }

        let formData = {
            ...data,
            isInstallment: isInstallment,
            date: transactionDate,
            installmentDate: isInstallment ? installmentDate : '',
            installmentCount: isInstallment ? data.installmentCount : '',
            category: selectedCategory
        };

        if (mode === 'add') {
            dispatch(addTransaction({
                transactionData: {
                    ...formData,
                    id: guidGenerator()
                }
            }));
        } else {
            dispatch(editTransaction({
                updatedTransactionData: {
                    ...formData,
                    id: props.transactionToEditId
                }
            }));
        }

        props.modalClosed();
    };

    return (
        <View style={styles.modalContainer}>
            <Modal
                animationType='slide'
                visible={props.visible}
                transparent={true}
            >
                <View style={styles.modalView}>
                    <View style={styles.modalHeader}>
                        <Text style={styles.headerTitle}>{mode === 'add' ? 'Add Expense' : 'Edit Expense'}</Text>

                        <IconButton
                            name='close-outline'
                            color='white'
                            size={30}
                            customStyle={{
                                position: 'absolute',
                                top: 10,
                                right: 10
                            }}
                            pressed={props.modalClosed} />
                    </View>

                    <View style={styles.modalBody}>
                        <View style={styles.inputExpenseForm}>
                            <Datepicker
                                label='Transaction Date'
                                labelTextStyle={{color: 'white'}}
                                datePicked={(date) => onDatePickedHandler('transactionDate', date)}
                                initialValue={transactionDate}
                            />

                            <Controller
                                control={control}
                                rules={{
                                    required: true,
                                }}
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <TextInput
                                        style={styles.input}
                                        onBlur={onBlur}
                                        onChangeText={onChange}
                                        value={value}
                                        placeholder='Transaction Name'
                                        returnKeyType='done'
                                        placeholderTextColor='white'
                                    />
                                )}
                                name='name'
                            />
                            {errors.transactionName && <Text>This is required.</Text>}

                            <Controller
                                control={control}
                                rules={{
                                    required: true,
                                }}
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <TextInput
                                        style={styles.input}
                                        onBlur={onBlur}
                                        onChangeText={onChange}
                                        value={value}
                                        placeholder='Transaction Amount'
                                        keyboardType='numeric'
                                        returnKeyType='done'
                                        placeholderTextColor='white'
                                    />
                                )}
                                name='amount'
                            />

                            <View style={styles.checkboxRow}>
                                <Text
                                    style={{ marginRight: 8, color: 'white' }}
                                    onPress={() => setIsInstallment(prevState => !prevState)}>Is Installment?</Text>

                                <Checkbox
                                    value={isInstallment}
                                    onValueChange={setIsInstallment}
                                    color={Colors['blue300']}
                                />
                            </View>

                            {isInstallment ? <>
                                <Controller
                                    control={control}
                                    rules={{
                                        required: true,
                                    }}
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <TextInput
                                            style={styles.input}
                                            onBlur={onBlur}
                                            onChangeText={onChange}
                                            value={value}
                                            placeholder='Installment Count'
                                            keyboardType='numeric'
                                            returnKeyType='done'
                                            placeholderTextColor='white'
                                        />
                                    )}
                                    name='installmentCount'
                                /> 
                                <Datepicker
                                    label='Installment Start'
                                    labelTextStyle={{color: 'white'}}
                                    datePicked={(date) => onDatePickedHandler('installmentStartDate', date)}
                                    initialValue={installmentDate}
                                /> 
                                </> : null}

                                <View style={styles.pickerRow}>
                                    <Text style={{ flex: 2, fontSize: 16, color: 'white' }}>Category</Text>
                                    
                                    <Picker
                                        style={{ flex: 4, fontSize: 14, color: 'white' }}
                                        itemStyle={{ fontSize: 16, color: 'white' }}
                                        selectedValue={selectedCategory}
                                        onValueChange={(itemValue, itemIndex) =>
                                            setSelectedCategory(itemValue)
                                        }
                                    >
                                        <Picker.Item label="Income" value="income" />
                                        <Picker.Item label="Bill" value="bill" />
                                        <Picker.Item label="Market" value="market" />
                                        <Picker.Item label="Luxury" value="luxury" />
                                        <Picker.Item label="Transportation" value="transportation" />
                                        <Picker.Item label="Health" value="health" />
                                        <Picker.Item label="Restaurant" value="restaurant" />
                                        <Picker.Item label="Household" value="household" />
                                    </Picker>
                                </View>
                        </View>


                        <View style={styles.expenseCta}>
                            <CustomButton buttonStyling={{marginRight: 10, width: 120}} pressed={props.modalClosed}>Cancel</CustomButton>

                            <CustomButton buttonStyling={{width: 120}} pressed={handleSubmit(onSubmit)}>{mode === 'add' ? 'Add' : 'Update'}</CustomButton>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    )
}

export default InputExpense

const styles = StyleSheet.create({
    modalContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalView: {
        marginTop: 20,
        backgroundColor: Colors['blue500'],
        borderRadius: 20,
        alignItems: 'center',
        width: '100%',
        height: '100%',
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 3
        },
        shadowOpacity: 0.6,
        shadowRadius: 5,
        elevation: 5
    },
    modalHeader: {
        flex: 1,
        backgroundColor: Colors['blue300'],
        width: '100%',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    headerTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white'
    },
    modalBody: {
        flex: 11,
        backgroundColor: Colors['blue700'],
        width: '100%',
        padding: 20
    },
    inputExpenseForm: {
        marginVertical: 10
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderBottomEndRadius: 8,
        borderTopLeftRadius: 8,
        borderColor: 'white',
        color: 'white',
        width: '80%',
        alignSelf: 'center'
    },
    checkboxRow: {
        flexDirection: 'row',
        alignSelf: 'center',
        padding: 6,
        alignItems: 'center'
    },
    pickerRow: {
        width: '80%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        borderWidth: 1,
        borderColor: 'white',
        marginVertical: 8,
        padding: 5,
        borderBottomEndRadius: 8,
        borderTopLeftRadius: 8,
        height: 150,
        overflow: 'hidden'
    },
    expenseCta: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    }
});