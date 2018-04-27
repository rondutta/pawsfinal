import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';

const listItem = (props) => (
 <TouchableOpacity onPress={props.onItemPressed}>   
 <View style={styles.listItems}>
     <Image resizeMode="cover" source={props.getImage} style={styles.imageStyle}/>
     <Text>{props.getPost}</Text> 
 </View>
 </TouchableOpacity>
)

const styles = StyleSheet.create({
    listItems:{
        width : '100%',
        padding: 10,
        margin: 5,
        backgroundColor: '#eee',
        flexDirection: 'row',
        alignItems: 'center'
    },
    imageStyle:{
        marginRight: 8,
        height: 60,
        width: 60
    }
});
 
export default listItem;