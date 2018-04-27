import React, {Component} from 'react';
import {StyleSheet, Text, View, TextInput, Button} from 'react-native';
import {connect} from 'react-redux';

import PostInput from './src/components/PostInput/PostInput';
import PostList from './src/components/PostList/PostList';
import PostDetails from './src/components/PostDetails/PostDetails';
import {addPost, deletePost, selectPost, deselectPost} from './src/store/actions/index';

class App extends Component {
    postHandler = (post) => {
        this.props.onAddPost(post);
        console.log("Post Added to Posts");
    }
    postDeleteHandler = () => {
        this.props.onDeletePost();
    }
    modalClosedHandler = () => {
        this.props.onDeselectPost();
    }
    postSelectedHandler = (key) => {
        this.props.onSelectPost(key);
    }
    render() {
        return (
            <View style={styles.container}>
                <PostDetails
                    selectedPost={this.props.selectedPost}
                    onItemDeleted={this.postDeleteHandler}
                    onModalClosed={this.modalClosedHandler}/>
                <PostInput onPostAdded={this.postHandler}/>
                <PostList posts={this.props.posts} onItemSelected={this.postSelectedHandler}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 25,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'flex-start'
    }
});

const mapStateToProps = state => {
    return {posts: state.posts.posts, selectedPost: state.posts.selectedPost};
};

const mapDispatchToProps = dispatch => {
    return {
        onAddPost: (name) => dispatch(addPost(name)),
        onDeletePost: () => dispatch(deletePost()),
        onSelectPost: (key) => dispatch(selectPost(key)),
        onDeselectPost: () => dispatch(deselectPost())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);