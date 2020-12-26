import React, { useContext, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { Context as authContext } from '../context/AuthContext';



const SplashScreen = ({ navigation }) => {

    const { localSignIn } = useContext(authContext);

    useEffect(() => {

        const timer = setTimeout(() => localSignIn(), 2000);
        return() => clearTimeout(timer);
        
    }, []);

    

    return(
        <View style={styles.container}>
            <Text style={styles.text}>Blog4All</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
    backgroundColor: '#0090fc',
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center"
},
    text: {
        color: 'white',
        alignSelf: "center",
        fontSize: 35,
        fontWeight: '700'
    }
});

export default SplashScreen;