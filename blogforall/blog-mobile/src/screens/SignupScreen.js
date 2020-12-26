import React, { useState, useContext } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, TextInput, Button } from 'react-native';
import { NavigationEvents } from 'react-navigation';

import { Context as authContext } from '../context/AuthContext';


const SignupScreen = ({ navigation }) => {
    const { state, signup, clearErrorMessage } = useContext(authContext);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
 
    
 
     return(
         <View style={styles.loginContainer}>
             <NavigationEvents 
             onWillFocus={clearErrorMessage}
             />
             <Text style={{ fontWeight: '500', color: '#fff', fontSize: 35, marginVertical: 20 }}>Create Account</Text>
             <TextInput
             name='name'
             placeholder='    Enter your name...'
             style={styles.textInput}
             onChangeText={setName}
             value={name}
             autoCapitalize='none'
             autoCorrect={false}
             />
             <TextInput 
             name='email'
             placeholder='  Enter Email'
             style={styles.textInput}
             onChangeText={setEmail}
             value={email}
             autoCapitalize='none'
             autoCorrect={false}
             />
 
         <TextInput 
             name='password'
             placeholder='  Enter password'
             style={styles.textInput}
             secureTextEntry={true}
             onChangeText={setPassword}
             value={password}
             autoCapitalize='none'
             autoCorrect={false}
             
             />

                {state.errMessage ? <Text style={{ color: 'red' }}>{state.errMessage}</Text> : null}
 
             <TouchableOpacity onPress={() => signup({name, email, password})} style={styles.ButtonContainer}>
                 <Text style={styles.ButtonText}>Sign Up</Text>
             </TouchableOpacity> 

             <Text style={{ color: '#fff', fontSize: 20, marginVertical: 10 }}>Already have an account?</Text><TouchableOpacity onPress={()=> navigation.navigate('Signin')}><Text style={{ color: '#fff', fontSize: 20, marginVertical: 10, textDecorationColor: '#fff', textDecorationLine: 'underline' }}>Sign In</Text></TouchableOpacity>  

             
 
         </View>
         
     );
}



const styles = StyleSheet.create({
    loginContainer: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 10,
        elevation: 10,
        backgroundColor: '#0090fc'
      },
      textInput: {
        height: 40,
        width: '100%',
        margin: 20,
        paddingHorizontal: 20,
        backgroundColor: 'white',
        borderColor: 'gray',

        borderRadius: 10,
      },
        ButtonContainer: {
            elevation: 8,
            margin: 10,
            backgroundColor: '#fff',
            borderRadius: 10,
            paddingVertical: 10,
            paddingHorizontal: 5,
            width: '50%'
        },
        ButtonText: {
            fontSize: 18,
            color: '#0090fc',
            fontWeight: 'bold',
            alignSelf: 'center'
        }
    


});


export default SignupScreen;