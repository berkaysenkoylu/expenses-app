import { StyleSheet, Text, View, Pressable } from 'react-native';
import React from 'react';

import Colors from '../../utils/Colors';

const Button = props => {
    return (
        <Pressable
            style={({pressed}) => [styles.button, props.buttonStyling, pressed && styles.pressed]}
            android_ripple={{color: Colors.blue100 }}
            onPress={props.pressed}
        >
            <Text style={[styles.buttonText, props.textStyling]}>{props.children}</Text>
        </Pressable>
    );
}

export default Button;

const styles = StyleSheet.create({
    button: {
        backgroundColor: Colors.blue300,
        paddingVertical: 8,
        paddingHorizontal: 15,
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 1
        },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 5,
        borderRadius: 8
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        alignSelf: 'center'
    },
    pressed: {
        opacity: 0.4
    }
});