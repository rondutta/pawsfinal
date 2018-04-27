import React, { Component } from 'react';
import { View, Text, Button, StyleSheet, ScrollView, Image } from 'react-native';
import { connect } from 'react-redux';
import { addPost } from '../../store/actions/index';
import PostInput from '../../components/PostInput/PostInput';
import HeadingText from '../../components/UI/HeadingText/HeadingText';
import PickImage from '../../components/PickImage/PickImage';
import PickLocation from '../../components/PickLocation/PickLocation';
import validate from '../../utility/validation';

class SharePost extends Component {
    state = {
        controls:{
            post:{
                value:'',
                valid:false,
                touched:false,
                validationRules:{
                    notEmpty: true
                }
            }
        }
    };

    constructor(props){
        super(props);
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
    }

    onNavigatorEvent = event => {
        if (event.type === "NavBarButtonPress"){
            if (event.id === "sideDrawerToggle"){
                this.props.navigator.toggleDrawer({
                    side: "left"
                });
            }
        }
    }

    postChangeHandler = val => {
        this.setState(prevState => {
            return {
                controls: {
                    ...prevState.controls,
                    post:{
                        ...prevState.controls.post,
                        value: val,
                        valid: validate(val,prevState.controls.post.validationRules),
                        touched: true
                    }
                }
             }
        });
    }

    postAddHandler = () => {
        if(this.state.controls.post.value.trim() !== ""){
            this.props.onAddPost(this.state.controls.post.value);
        }
    }
    
    render() {
        return (
             <ScrollView>
             <View style={styles.container}>
                <Text>
                    <HeadingText style={{fontWeight:'bold'}}>
                      Share Your Pet Post Now!
                    </HeadingText>
                </Text>
                <PickImage/>
                <PickLocation/>
                <PostInput 
                postData={this.state.controls.post}
                onChangeText={this.postChangeHandler} />
                <View style={styles.button}>
                  <Button 
                  title = "Share your post" 
                  onPress={this.postAddHandler}
                  disabled={!this.state.controls.post.valid}
                  />
                </View>
             </View>   
             </ScrollView>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAddPost : (post) => dispatch(addPost(post))
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
    container:{
        flex: 1,
        alignItems: 'center'
    },
    button:{
        margin: 10,
        padding: 10
    },
    imageContainer:{
        width: '100%',
        height: '100%'
    }
});

export default connect(null,mapDispatchToProps)(SharePost);