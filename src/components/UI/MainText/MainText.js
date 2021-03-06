import React from 'react';
import { StyleSheet,Text } from 'react-native';

const MainText = (props) => {
    return (
        <Text style={styles.textStyle}>{props.children}</Text>
    );
}

const styles = StyleSheet.create({
    textStyle:{
        color:'#eee',
        backgroundColor: 'transparent'
    }
});
 
export default MainText;