import dataContext from './dataContext';
import axios from 'axios';


const blogReducer = (state, action) => {
    const { type, payload } = action;

    switch(type) {
        case 'getPost':
            return payload;
        default:
            return state;
    }
}

const getBlogPost = dispatch => async () => {
    
    try{
     
    const response = await axios.get('https://thawing-stream-76349.herokuapp.com/api/blogs')
    console.log(response)
    
    dispatch({
        type: 'getPost',
        payload: response.data
    })
    } catch(err) {
        console.log('Something went wrong')
    }
}


export const { Context, Provider } = dataContext(blogReducer, { getBlogPost }, []);