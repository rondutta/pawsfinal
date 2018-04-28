import React, { Component } from 'react';
import { View, Image, Text, 
    StyleSheet, Button, 
    TouchableOpacity, Platform,
    Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import {deletePost} from '../../store/actions/index';
import MapView from 'react-native-maps';

class PostDetails extends Component {
    
    state = {
        viewMode: 'portrait'
    }

    constructor(props){
        super(props);
        Dimensions.addEventListener('change',this.updateStyles);
    }

    componentWillUnmount(){
        Dimensions.removeEventListener('change', this.updateStyles);
    }

    updateStyles = dims => {
        this.setState({
            viewMode: dims.window.height > 500 ? 'portrait' : 'landscape'
        });
    }

    itemDeletedHandler = ()=>{
        this.props.onDeletePost(this.props.selectedPost.key);
        this.props.navigator.pop();
    }
    
    render(){
        return(
            <View style={[styles.container,
                this.state.viewMode === 'portrait'
                ? styles.portraitContainer
                : styles.landscapeContainer
            ]}
            >
            <View style={styles.postDetailContainer}>  
              <View style={styles.subContainer}>
                <Image source={this.props.selectedPost.image} 
                style={styles.postImage} />
              </View>
              <Text> Posted at</Text>
              <View style={styles.subContainer}>
              <MapView
                initialRegion={{
                    ...this.props.selectedPost.location,
                    latitudeDelta: 0.0122,
                    longitudeDelta:
                    Dimensions.get("window").width /
                    Dimensions.get("window").height *
                    0.0122
                }}
                style={styles.map}
                >
                <MapView.Marker coordinate={this.props.selectedPost.location} />
              </MapView>
          </View>
          </View>
          <View style={styles.subContainer}>
          <View>
            <Text style={styles.textStyle}>
              {this.props.selectedPost.name}
            </Text>
            </View>  
          <View>
                 <TouchableOpacity onPress={this.itemDeletedHandler}>
                   <View style={styles.deleteButton}>
                      <Icon size={50} name="md-trash" color="red"/>
                   </View>
                  </TouchableOpacity>
          </View>
          </View>
          </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        margin: 20,
        flex: 1
    },
    postImage:{
        width: '100%',
        height: '100%'
    },
    textStyle:{
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 30
    },
    deleteButton:{
        alignItems: 'center'
    },
    portraitContainer: {
        flexDirection: 'column'
    },
    landscapeContainer: {
        flexDirection: 'row'
    },
    postDetailContainer: {
        flex: 2
    },
    map: {
        ...StyleSheet.absoluteFillObject
    },
    subContainer: {
        flex: 1
    }
});

 const mapDispatchToProps = (dispatch)=>{
     return {
         onDeletePost:(key) => dispatch(deletePost(key)) 
     }
 }
 
export default connect(null,mapDispatchToProps)(PostDetails);

