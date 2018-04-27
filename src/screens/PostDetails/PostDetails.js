import React, { Component } from 'react';
import { View, Image, Text, StyleSheet, Button, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import {deletePost} from '../../store/actions/index';

class PostDetails extends Component {
    itemDeletedHandler = ()=>{
        this.props.onDeletePost(this.props.selectedPost.key);
        this.props.navigator.pop();
    }
    render(){
        return(
            <View style={styles.container}>
            <View>
              <Image source={this.props.selectedPost.image} style={styles.postImage} />
              <Text style={styles.textStyle}>{this.props.selectedPost.name}</Text>
            </View>
            <View>
                 <TouchableOpacity onPress={this.itemDeletedHandler}>
                   <View style={styles.deleteButton}>
                      <Icon size={50} name="md-trash" color="red"/>
                   </View>
                  </TouchableOpacity>
             </View>
         </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        margin: 20
    },
    postImage:{
        width: "100%",
        height: 300
    },
    textStyle:{
        fontWeight:"bold",
        textAlign:"center",
        fontSize: 30
    },
    deleteButton:{
        alignItems: "center"
    }
});

 const mapDispatchToProps = (dispatch)=>{
     return {
         onDeletePost:(key) => dispatch(deletePost(key)) 
     }
 }
 
export default connect(null,mapDispatchToProps)(PostDetails);

