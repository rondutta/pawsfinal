import React from 'react';
import {ScrollView, StyleSheet, FlatList} from 'react-native';

import ListItem from '../ListItem/ListItem';

const postList = (props) => {
    return(
        <FlatList
         style={styles.listContainer}
         data={props.posts}
         renderItem={(info)=>(
            <ListItem 
            getPost={info.item.name}
            getImage={info.item.image} 
            onItemPressed={() => props.onItemSelected(info.item.key) }/>    
         )}
        />
    );
}
const styles = StyleSheet.create({
    listContainer: {
      width: '100%',
    },
});
 
export default postList;