import { createSlice } from '@reduxjs/toolkit';

export const transactionSlice = createSlice({
    name: 'transaction',
    initialState: {
        transactionList: [{
                "amount": "199,60",
                "category": "market",
                "date": 1648685664138,
                "installmentCount": "",
                "installmentDate": "",
                "isInstallment": false,
                "name": "Grocery",
                "id": 'dumm1'
            }, {
                "amount": "900",
                "category": "luxury",
                "date": 1642623664138,
                "installmentCount": "3",
                "installmentDate": 1642623664138,
                "isInstallment": true,
                "name": "Necklace",
                "id": 'dumm2'
            }, {
                "amount": "653",
                "category": "market",
                "date": 1642623664138,
                "installmentCount": "",
                "installmentDate": "",
                "isInstallment": false,
                "name": "Grocery",
                "id": 'dumm3'
            }, {
                "amount": "88.8",
                "category": "restaurant",
                "date": 1642623664138,
                "installmentCount": "",
                "installmentDate": "",
                "isInstallment": false,
                "name": "Kebap",
                "id": 'dumm4'
            }
        ]
    },
    reducers: {
        addTransaction: (state, actions) => {
            state.transactionList = [...state.transactionList, actions.payload.transactionData];
        },
        editTransaction: (state, actions) => {
            let newData = actions.payload.updatedTransactionData;

            state.transactionList = [...state.transactionList.filter(data => data.id !== newData.id), newData];
        },
        removeTransaction: (state, actions) => {
            state.transactionList = state.transactionList.filter(data => data.id !== actions.payload.removedId);
        }
    }
});

export const { addTransaction, editTransaction, removeTransaction } = transactionSlice.actions;

export default transactionSlice.reducer;