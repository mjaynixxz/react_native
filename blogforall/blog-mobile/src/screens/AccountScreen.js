import React, { useContext } from 'react';
import {  Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { Context as authContext} from '../context/AuthContext';


const AccountScreen = () => {
    const { signout } = useContext(authContext);

    return(
        <TouchableOpacity style={styles.ButtonContainer} onPress={signout} >
        <Text style={styles.ButtonText}>Sign Out</Text>
        </TouchableOpacity>
    );
}

AccountScreen.navigationOptions = {
    title: 'Account',
    tabBarLabel: 'Account',
    tabBarIcon: <MaterialCommunityIcons name="account" size={24} color="black" />
}

const styles = StyleSheet.create({
    ButtonContainer: {
        elevation: 8,
        marginVertical: 150,
        marginHorizontal: 100,
        backgroundColor: '#0090fc',
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 5,
        width: '50%'
    },
    ButtonText: {
        fontSize: 18,
        color: '#fff',
        fontWeight: 'bold',
        alignSelf: 'center'
    }

});

export default AccountScreen;