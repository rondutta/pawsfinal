import React, { Component } from 'react';
import { View, Image, Button, StyleSheet} from 'react-native';
import doggoImage from '../../../assets/dogwall.jpg';

class PickImage extends Component {
    render(){
        return (
            <View style={styles.container}>
                <View style={styles.placeholder}>
                    <Image source={doggoImage} style={styles.imageContainer} />
                </View>
                <View style={styles.button}>
                 <Button title = "Pick Image" onPress = {()=>alert("Image Picker Button")}/>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    placeholder:{
        borderWidth: 1,
        borderColor: '#2c3e50',
        backgroundColor: '#eee',
        width: '80%',
        height: 200    
    },
    button:{
        margin: 10,
        padding: 10
    },
    imageContainer:{
        width: '100%',
        height: '100%'
    },
    container:{
        width:'100%',
        alignItems: 'center'
    }
});


export default PickImage;