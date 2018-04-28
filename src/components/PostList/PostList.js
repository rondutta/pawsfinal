import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import {OptimizedFlatList} from 'react-native-optimized-flatlist';
import ListItem from '../ListItem/ListItem';

const postList = (props) => {
    return(
        <OptimizedFlatList
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