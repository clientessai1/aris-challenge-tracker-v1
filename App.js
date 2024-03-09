import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {useRoute} from "@react-navigation/native";

import ScreenHome from './pages/ScreenHome';
import ScreenNewChallenge from './pages/ScreenNewChallenge';
import ScreenFollowUp from './pages/ScreenFollowUp';
import ScreenReminder from './pages/ScreenReminder';
import ScreenRecapitulation from './pages/ScreenRecapitulation';
import {MaterialIcons} from '@expo/vector-icons';
//*******
//import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();
/***********/

const Stack = createNativeStackNavigator();
/*
const HomeStack = () => (
    
  <Stack.Navigator screenOptions={{ headerShown : false }}>
  <Stack.Screen name="Home" component={ScreenHome}  />
  <Stack.Screen name="NewChallenge" component={ScreenNewChallenge} />
  <Stack.Screen name="FollowUp" component={ScreenFollowUp} />
  <Stack.Screen name="Reminder" component={ScreenReminder} />
  <Stack.Screen name="Recapitulation" component={ScreenRecapitulation} />

  <Stack.Screen name="Login" component={LoginForm} />
  <Stack.Screen
    name="ProgressScreen"
    component={ProgressScreen}
    options={{ headerShown: false }} // Hide header for ProgressScreen
  />
  <Stack.Screen name="Registration" component={RegistrationForm} />
  <Stack.Screen name="PasswordRecovery" component={PasswordRecoveryForm} />
  <Stack.Screen name="ModuleNatif" component={ModuleNatifForm} />
</Stack.Navigator>
);
*/
function App() {

  return (

    <NavigationContainer>

  
      <Tab.Navigator>
        <Tab.Screen name="HOME" component={ScreenHome} options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="home" size={size} color={color} />
            ),
          }} />
        <Tab.Screen name="NEW-CHALLENGE" component={ScreenNewChallenge} options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="add" size={size} color={color} />
            ),
          }} />
        <Tab.Screen name="FOLLOW-UP" component={ScreenFollowUp} options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="list" size={size} color={color} />
            ),
          }} />        
  <Tab.Screen name="REMINDER" component={ScreenReminder} options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="notifications" size={size} color={color} />
            ),
          }} />
  <Tab.Screen name="RECAPITULATIF-HEBDOMADAIRE" component={ScreenRecapitulation} options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="format-list-bulleted" size={size} color={color} />
            ),
          }} />

      </Tab.Navigator>



    </NavigationContainer>
  );
}

export default App;