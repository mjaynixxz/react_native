import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import {  Entypo, Feather } from '@expo/vector-icons'
import { Context } from '../context/BlogContext';



const BlogListScreen = ({ navigation }) => {
    const { state, getBlogPost, deleteBlogPost } = useContext(Context);
    const [count, setCount] = useState(0);
    useEffect(() => {
        getBlogPost();

        const listener = navigation.addListener('didFocus', () => {
            getBlogPost();
        })


        return () => {
            listener.remove();
        }

    }, []);

    return(
    <View style={styles.container}>
        <Text></Text>
        
        
        <FlatList 
        data={state}
        extraData={state}
        contentContainerStyle={{
            flexGrow: 1,
            }}
        keyExtractor={blog => blog._id}
        renderItem={({item})=> {
    
        return (
            
            <TouchableOpacity onPress={()=> navigation.navigate('BlogDetail', { id: item._id })}>
                <View style={styles.row}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.title}>{item.author}</Text>
                <TouchableOpacity onPress={()=> {
                    deleteBlogPost(item._id);
                    setCount(count + 1)
                
                }}>
                <Entypo style={styles.icon} name='trash' />
                </TouchableOpacity>
                </View>
            </TouchableOpacity>
            );
        }}
        />
          </View>
           );
}

BlogListScreen.navigationOptions = ({ navigation }) => {
    return {
        title: 'Blog List',

        headerStyle: {
            backgroundColor: '#0090fc',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
            textAlign: 'center',
            alignSelf: 'center',
            justifyContent: 'center'
          },
        
    
        headerRight: () => (
          <TouchableOpacity onPress={() => navigation.navigate('BlogCreate')}>
            <Feather style={{ color: '#fff', marginHorizontal: 10 }} name="plus" size={30} />
          </TouchableOpacity>
        ),
        
      };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 10,
        elevation: 10,
        backgroundColor: '#fff'
    },
    row: {
        flexDirection: 'row',
        justifyContent: "space-between",
        paddingVertical: 20,
        borderBottomWidth: 1,
        borderColor: '#0090fc',
        flex: 1,
        width: '90%',
        paddingHorizontal: 15
    },
    title: {
        fontSize: 18
    },
    icon: {
        fontSize: 30
    }
});

export default BlogListScreen;