import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs'
import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import {  Entypo } from '@expo/vector-icons'

import { Provider } from './src/context/BlogContext'; 
import { Provider as AuthProvider } from './src/context/AuthContext';
import { navigationRef } from './src/RootNavigation';
 
import SplashScreen from './src/screens/SplashScreen';
import SignupScreen from './src/screens/SignupScreen';
import SigninScreen from './src/screens/SigninScreen';
import BlogListScreen from './src/screens/BlogListScreen';
import BlogEditScreen from './src/screens/BlogEditScreen';
import BlogCreateScreen from './src/screens/BlogCreateScreen';
import AccountScreen from './src/screens/AccountScreen';
import BlogDetailScreen from './src/screens/BlogDetail';

const BlogListFlow = createStackNavigator({
  BlogList: BlogListScreen,
  BlogEdit: BlogEditScreen,
  BlogDetail: BlogDetailScreen
});

BlogListFlow.navigationOptions = {
  title: 'Blogs',
  tabBarIcon: <Entypo name="list" size={24} color="black" />
}

const SwitchNavigator = createSwitchNavigator({
  loginFlow: createStackNavigator({
    Splash: SplashScreen,
    Signup: SignupScreen,
    Signin: SigninScreen
  }, {
    defaultNavigationOptions: {
      headerShown: false 
    }
  }),

  mainFlow: createBottomTabNavigator({
    BlogListFlow,
    BlogCreate: BlogCreateScreen,
    Account: AccountScreen
  }, {
    defaultNavigationOptions: {
      headerShown: true,
      headerTitleStyle: {
        textAlign: 'center',
        alignSelf: 'center',
        justifyContent: 'center'
      }
    }
  })
})

const App = createAppContainer(SwitchNavigator)


export default () => {
  return(
    <AuthProvider><Provider><App ref={(navigator) => navigationRef(navigator)} /></Provider></AuthProvider>
  );
}
