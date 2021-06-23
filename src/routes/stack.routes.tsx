import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { Welcome } from '../pages/Welcome';
import { Register } from '../pages/Register';
import { SignIn } from '../pages/SignIn';

const stackRoutes = createStackNavigator();

const AppRoutes: React.FC = () => (
  <stackRoutes.Navigator
    headerMode="none"
    screenOptions={{
      cardStyle: {
        backgroundColor: '#ffffff'
      }
    }}
  >
    <stackRoutes.Screen
      name="SignIn"
      component={SignIn}
    />
    <stackRoutes.Screen
      name="Register"
      component={Register}
    />
    <stackRoutes.Screen
      name="Welcome"
      component={Welcome}
    />

  </stackRoutes.Navigator>
)

export default AppRoutes;
