import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';

import dataContext from './dataContext';
import { navigate }  from '../RootNavigation';




const authReducer = (state, action) => {
    const { type, payload } = action;
    switch(type) {
        case 'signIn':
        case 'signUp':
            return { errMessage:'', token: payload }
        case 'addError':
            return { ...state, errMessage: payload }
        case 'clearError':
            return { ...state, errMessage: ''}
        case 'signOut':
            return { ...state, token: null, errMessage: '' }
        default:
            return state;
    }
}




const localSignIn = dispatch => async () => {
   const token = await AsyncStorage.getItem('token');
   if (token) {
       dispatch({ 
           type: 'signIn',
           payload: token
       })
       navigate('BlogList')
   } else {
       navigate('Signin')
   }
}

const clearErrorMessage = dispatch => () => {
    dispatch({type: 'clearError'})
}

const signup = dispatch => async ({name, email, password}) => {

    const config = {
        headers: {
          "Content-Type": "application/json"
        },
      };
    
    //   const body = JSON.stringify({ name, email, password });
    
      try {
        const response = await axios.post('https://thawing-stream-76349.herokuapp.com/api/users', {name, email, password}, config);
        console.log(response.data.token)
        //Set the token value to assign Storage
        await AsyncStorage.setItem('token', response.data.token)
    

        dispatch({
            type: 'signUp',
            payload: response.data.token
        })
           navigate('BlogList')
      } catch(err){
        // const errors = err?.response.data.errors.map(item => item.msg + ' ')
          dispatch({
              type: 'addError',
              payload: 'Something went wrong with sign up'
          })
    
}

}


const signin = dispatch => async ({email, password}) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({ email, password })

    try {
        const response = await axios.post('https://thawing-stream-76349.herokuapp.com/api/auth', body, config)
    
        
        await AsyncStorage.setItem('token', response.data.token)
        dispatch({
            type: 'sigIn',
            payload: response.data.token
        })

        //Set navigate
        navigate('BlogList')
    } catch (err) {
         dispatch({
             type: 'addError',
             payload: 'Something went wrong with Sign In'
         })
    
        
    }
}

const signout = dispatch => async () => {
    try {
        await AsyncStorage.removeItem('token');
        dispatch({
            type: 'signOut'
        })
        navigate('Signin') 
    } catch (err) {
        console.log('Something went wrong')
    }    
}



export const { Context, Provider } = dataContext(authReducer, { signup, signin, clearErrorMessage, localSignIn, signout }, { token: null, errMessage: '' });