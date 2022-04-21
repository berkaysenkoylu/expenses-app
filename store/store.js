import { configureStore } from '@reduxjs/toolkit';
import transactionReducer from './transactions';

export const store = configureStore({
    reducer: {
        transactions: transactionReducer
    }
});