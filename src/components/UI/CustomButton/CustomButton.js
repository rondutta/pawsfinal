import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet, TouchableNativeFeedback, Platform } from 'react-native';


const CustomButton = (props) => {
    const content = (
        <View style = {[styles.button,{backgroundColor:props.color}, props.disabled ? styles.disabled : null ]}>
             <Text style={props.disabled?styles.disabledText:null}>{props.children}</Text>
        </View>
    );
    if(props.disabled){
        return content;
    }
    if(Platform.OS==='android'){
        return(
            <TouchableNativeFeedback onPress={props.onPress}>
             {content}
            </TouchableNativeFeedback>
        );
    }
    else if (Platform.OS==='ios'){
        return(
        <TouchableOpacity onPress={props.onPress}>
          {content}
        </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    button:{
        padding: 12,
        margin: 5,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#636e72'
    },
    disabled:{
        backgroundColor:'#eee',
        borderColor:'#aaa',
    },
    disabledText:{
        color:'#aaa'
    }
});
 
export default CustomButton;