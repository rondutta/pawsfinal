import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { connect } from 'react-redux';
import { getPosts } from '../../store/actions/index';
import PostList from '../../components/PostList/PostList';

class FindPost extends Component {
    state = {
        postsLoaded : false,
        removeAnimation: new Animated.Value(1)
    }
    constructor(props){
        super(props);
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
    }

    componentDidMount() {
        this.props.onLoadPosts();
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

    itemSelectedHandler=(key)=>{
    const selPost=this.props.posts.find(post=>{
        return post.key === key;
    })   
        this.props.navigator.push({
            screen: "paws.PostScreen",
            title:selPost.name,
            passProps: {
                selectedPost: selPost 
            }
        });
    }

    postsLoadedHandler = () => {
       Animated.timing(this.state.removeAnimation,{
           toValue: 0,
           duration: 500,
           useNativeDriver: true
       }).start(()=>{
           this.setState({
               postsLoaded: true
           });
       });
    }

    render() {
        let postContent = (
            <Animated.View style={{
                opacity: this.state.removeAnimation,
                transform:[ 
                    {
                        scale: this.state.removeAnimation.interpolate({
                            inputRange: [0, 1],
                            outputRange: [10, 1]
                        })
                    }
                ]
            }}>
            <TouchableOpacity onPress={this.postsLoadedHandler}>
              <View style = {styles.searchButton}>
                 <Text style={styles.searchButtonText}> Explore Animals !</Text>
              </View>
            </TouchableOpacity>
            </Animated.View>
        );
        if(this.state.postsLoaded === true){
            postContent=(
              <PostList
               posts={this.props.posts} 
               onItemSelected={this.itemSelectedHandler}/>
            );
        }
        return (
             <View style={this.state.postsLoaded ? null : styles.buttonContainer}>
              {postContent}
             </View>
        );
    }
}

const mapStateToProps = state => {
    return{
        posts: state.posts.posts
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLoadPosts: () => dispatch(getPosts())
    }
} 

const styles = StyleSheet.create({
    buttonContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    searchButton: {
        borderColor : '#2980b9',
        borderWidth : 3,
        borderRadius : 50,
        padding : 20
    },
    searchButtonText: {
        color: '#2980b9',
        fontWeight: 'bold',
        fontSize: 30
    }
});

export default connect(mapStateToProps,mapDispatchToProps)(FindPost);