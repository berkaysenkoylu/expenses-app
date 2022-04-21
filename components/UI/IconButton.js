import { StyleSheet, Pressable } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';

const IconButton = props => {
    return (
        <Pressable onPress={props.pressed} style={[props.customStyle, ({ pressed }) => pressed && { opacity: 0.4 }]}>
            <Ionicons name={props.name} size={props.size} color={props.color} />
        </Pressable>
    );
}

export default IconButton;

const styles = StyleSheet.create({});