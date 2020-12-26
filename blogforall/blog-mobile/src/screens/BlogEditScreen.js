import React, { useContext } from 'react';
import { Context } from '../context/BlogContext';
import BlogForm from '../components/BlogForm';


const BlogEditScreen = ({ navigation }) => {
    const { state, addBlogPost } = useContext(Context)

    const id = navigation.getParam('id');
    const blogPost = state.find(blog => blog._id === id)

   return(
    <BlogForm 
    initialValues={{ title: blogPost.title, author: blogPost.author, content: blogPost.content }}
    ScreenTitle='Edit a Blog'
    onSubmit={(title, author, content) => addBlogPost(id, title, author, content, ()=> navigation.pop())}
    />
);
}



export default BlogEditScreen;