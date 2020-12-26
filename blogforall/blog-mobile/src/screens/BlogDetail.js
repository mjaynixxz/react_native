import React, { useContext } from 'react';
import { ScrollView, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { EvilIcons } from '@expo/vector-icons'
import { Context } from '../context/BlogContext';


const BlogDetailScreen = ({ navigation }) => {
    const { state } = useContext(Context);

    const id = navigation.getParam('id');
    
    const blog = state.find(blog => blog._id === id);
    
    return(
      
    <ScrollView style={{ marginHorizontal: 10 }}>
    <Text style={{ fontSize: 30, fontWeight: '500', paddingVertical: 50 }}>Title:{' '}{blog?.title}</Text>
    <Text>{blog?.content}</Text>
    </ScrollView>
    
    );
}


BlogDetailScreen.navigationOptions = ({ navigation }) => {

    return {

      title: 'Blog Detail',

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
          <TouchableOpacity onPress={() => navigation.navigate('BlogEdit', { id: navigation.getParam('id') })}>
            <EvilIcons style={{ color: '#fff', marginHorizontal: 10 }} name="pencil" size={35} />
          </TouchableOpacity>
        ),
      };
}

const styles = StyleSheet.create({});

export default BlogDetailScreen;