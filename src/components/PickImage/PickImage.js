import React, { Component } from 'react';
import { View, Image, Button, StyleSheet} from 'react-native';
import ImagePicker from 'react-native-image-picker';

class PickImage extends Component {
    state = {
        pickedImage: null
    }
    imagePickedHandler = () => {
        ImagePicker.showImagePicker({title:'Pick an Image !'},res=>{
            if(res.didCancel){
                console.log('User Cancelled');
            }
            else if (res.error){
                console.log('Error',res.error);
            }
            else {
                this.setState({
                    pickedImage:{
                        uri: res.uri
                    }
                });
                this.props.onImagePick({uri:res.uri, base64: res.data});
            }
        });
    }
    render(){
        return (
            <View style={styles.container}>
                <View style={styles.placeholder}>
                    <Image source={this.state.pickedImage} style={styles.imageContainer} />
                </View>
                <View style={styles.button}>
                 <Button title = "Pick Image" onPress = {this.imagePickedHandler}/>
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