import React, { useContext } from 'react';
import { Entypo } from '@expo/vector-icons';

import { Context } from '../context/BlogContext';
import BlogForm from '../components/BlogForm';


const BlogCreateScreen = ({ navigation }) => {
 const { addBlogPost } = useContext(Context);

 return(
    <>
        <BlogForm onSubmit={(title, author, content)=>{

                addBlogPost(title, author, content, ()=>navigation.navigate('BlogList'))}
        } />
    </>

 );
        
   
}

BlogCreateScreen.navigationOptions = {
    title: 'Create Blog',
    tabBarIcon: <Entypo name="circle-with-plus" size={24} color="black" />
}


export default BlogCreateScreen;