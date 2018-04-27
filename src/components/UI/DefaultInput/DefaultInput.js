import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

const DefaultInput = (props) => {
    return (
        <TextInput 
            underlineColorAndroid = "transparent"
            {...props}
            style={[styles.input, props.style, !props.valid && props.touched ? styles.invalid : null]}
        />
    );
}

const styles = StyleSheet.create({
    input:{
        width: '100%',
        borderWidth: 1,
        borderColor: '#eee',
        padding: 5,
        marginTop: 10,
        marginBottom: 10
    },
    invalid:{
        backgroundColor:'#ff7979',
        borderColor:'red'
    }
});
 
export default DefaultInput;