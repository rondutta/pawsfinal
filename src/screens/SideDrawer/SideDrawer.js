import React, { Component } from 'react';
import { View, Text, Dimensions, StyleSheet, Platform } from 'react-native';
import CustomButton from '../../components/UI/CustomButton/CustomButton';
import { Button, SocialIcon } from 'react-native-elements';

class SideDrawer extends Component {
    logoutHandler = ()=>{
        alert("Really log out?");
    }
    render(){
        return(
            <View style={[styles.container,{width: Dimensions.get("window").width * 0.8}]}>
              <Button
              raised
              icon={{name:'ios-log-out', type:'ionicon'}} 
              title="Log Out "
              backgroundColor="#29aaf4"
              width="60%"
              onPress={this.logoutHandler}
              style={styles.button}/>
              <SocialIcon title='Like Us !' button type='facebook' style={{width:'60%'}}/>
              <SocialIcon title='Follow Us !' button type='twitter' style={{width:'60%'}}/>
              <SocialIcon title='Follow Us !' button type='instagram' style={{width:'60%'}}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container :{
        paddingTop: 30,
        backgroundColor: 'white',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        width:'100%'
    },
    button:{
        marginBottom: 30,
        width: '100%',
        flex: 1,
        flexDirection: 'row',
        alignItems:'center'
    }
})

export default SideDrawer;