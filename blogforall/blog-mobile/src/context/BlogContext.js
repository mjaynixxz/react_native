import React from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import dataContext from './dataContext';
import axios from 'axios';


const blogReducer = (state, action) => {
    const { type, payload } = action;

    switch(type) {
        case 'getPost':
            return payload;
        case 'addPost':
            return [ ...state, payload ];
        case 'deletePost':
            return state.filter(post => post.id !== payload);
        case 'editPost':
            return state.map(blog => blog.id === payload.id ? payload : blog);
        default:
            return state;
    }
}

const getBlogPost = dispatch => async () => {
    
    
    try{
    const token = await AsyncStorage.getItem('token');
    
    const config = {
        headers: {
            'x-auth-token': token
        }
    }
    
    const response = await axios.get('https://thawing-stream-76349.herokuapp.com/api/blogs/me', config)
    dispatch({
        type: 'getPost',
        payload: response.data
    })
    } catch(err) {
        console.log('Something went wrong')
    }
}

const addBlogPost = dispatch => async (title, author, content, callback) => {
    try {
        const token = await AsyncStorage.getItem('token')

        const config = {
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': token
            }
        }

        const body = JSON.stringify({ title, author, content })

        const response = await axios.post('https://thawing-stream-76349.herokuapp.com/api/blogs', body, config)
        
        dispatch({
            type: 'addPost',
            payload: response.data
        })
        callback && callback();
    } catch (err) {
        console.log('Something went wrong')
    }
};

const deleteBlogPost = dispatch => async (id) => {
   try {
    const token = await AsyncStorage.getItem('token');
    
    
    const config = {
        headers: {
            'x-auth-token': token
        }
    }

    await axios.delete(`https://thawing-stream-76349.herokuapp.com/api/blogs/delete/${id}`, config)
    
    dispatch({
        type: 'deletePost',
        payload: id
    })
    c
   } catch (err) {
       console.log('Something went wrong')
   }
}




export const { Context, Provider } = dataContext(blogReducer, { addBlogPost, deleteBlogPost, getBlogPost }, []);