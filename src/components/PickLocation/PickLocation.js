import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, Dimensions} from 'react-native';
import MapComponent from 'react-native-maps';

class PickLocation extends Component {
    state = {
        currentLocation:{
            latitude: 13.0827,
            longitude: 80.2707,
            latitudeDelta: 0.0122,
            longitudeDelta: Dimensions.get('window').width / Dimensions.get('window').height * 0.0122
        },
        locationChosen: false
    }
    pickLocationHandler = (event)=>{
        const coords = event.nativeEvent.coordinate;
        this.map.animateToRegion({
            ...this.state.currentLocation,
            latitude: coords.latitude,
            longitude: coords.longitude,
        });
        this.setState(prevState=>{
            return {
                currentLocation:{
                    ...prevState.currentLocation,
                    latitude: coords.latitude,
                    longitude: coords.longitude,
                },
                locationChosen:true
            }
        });
    }
    getLocationHandler = () => {
        navigator.geolocation.getCurrentPosition(pos=>{
            const coordEvent = {
                nativeEvent:{
                    coordinate:{
                        latitude: pos.coords.latitude,
                        longitude: pos.coords.longitude,
                    }
                }
            }
            this.pickLocationHandler(coordEvent)
        },
            err=>{
            console.log(err);
            alert('Failed to pick location. Please choose manually.')
        });
    }
    render(){
        let marker = null;
        if(this.state.locationChosen){
            marker = <MapComponent.Marker coordinate={this.state.currentLocation}/>
        }
        return(
            <View style={styles.container}>
                <View style={styles.placeholder}>
                 <MapComponent 
                 initialRegion={this.state.currentLocation}
                 onPress={this.pickLocationHandler}
                 ref = {ref => this.map = ref}
                 style={styles.map}>
                  {marker}
                 </MapComponent>
                </View>
                <View style={styles.button}>
                 <Button title = "Locate Me" onPress = {this.getLocationHandler}/>
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
    container:{
        width: '100%',
        alignItems: 'center'
    },
    map:{
        width: '100%',
        height: 250
    }
});

export default PickLocation;
