import { useState } from 'react';
import { Provider } from 'react-redux';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { store } from './store/store';

import Colors from './utils/Colors';
import IconButton from './components/UI/IconButton';
import AllExpenses from './screens/AllExpenses';
import FilterExpenses from './screens/FilterExpenses';
import InputExpense from './components/InputExpense';

const Tab = createBottomTabNavigator();


const App = () => {
    const [isExpenseModalVisible, setIsExpenseModalVisible] = useState(false);
    const [selectedTransactionId, setSelectedTransactionId] = useState();

    const modalClosedHandler = () => {
        setIsExpenseModalVisible(false);
        setSelectedTransactionId(null);
    }

    const onTransactionEditedHandler = (id) => {
        setSelectedTransactionId(id);
        setIsExpenseModalVisible(true);
    }

    return (
        <>
            <StatusBar style='light' />
            <Provider store={store}>
                <NavigationContainer>
                    <Tab.Navigator initialRouteName='AllExpenses' screenOptions={{
                        sceneContainerStyle: {
                            backgroundColor: Colors['blue700'] // NOT WORKING for some reason
                        },
                        headerStyle: {
                            backgroundColor: Colors['blue300']
                        },
                        headerTintColor: '#fff',
                        headerTitleStyle: {
                            fontWeight: 'bold',
                        },
                        headerTitleAlign: 'left',
                        tabBarStyle: {
                            backgroundColor: Colors['blue300'],
                        },
                        tabBarInactiveTintColor: Colors['blue900'],
                        tabBarActiveTintColor: '#fff',
                        headerRight: () => <IconButton
                            name='add-outline'
                            color='white'
                            size={24}
                            customStyle={{marginRight: 10}}
                            pressed={() => setIsExpenseModalVisible(true)}
                        />
                    }}>
                        <Tab.Screen name='AllExpenses' options={{
                            title: 'All Expenses',
                            tabBarIcon: ({color, size}) => <Ionicons name='md-hourglass-outline' size={size} color={color} />
                        }}>
                            {
                                () => <AllExpenses onTransactionEdited={onTransactionEditedHandler} />
                            }
                        </Tab.Screen>
                        <Tab.Screen name='FilterExpenses' component={FilterExpenses} options={{
                            title: 'Filter Expenses',
                            headerShown: false,
                            tabBarIcon: ({color, size}) => <Ionicons name='funnel-outline' size={size} color={color} />
                        }} />
                    </Tab.Navigator>
                </NavigationContainer>
                {isExpenseModalVisible ?
                    <InputExpense
                        visible={isExpenseModalVisible}
                        modalClosed={modalClosedHandler}
                        transactionToEditId={selectedTransactionId}
                    /> : null}
            </Provider>
        </>
    );
}

export default App;

const styles = StyleSheet.create({
    
});
