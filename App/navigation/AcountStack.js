import 'react-native-gesture-handler';
import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import {NavigationContainer} from "@react-navigation/native";

import Login from "../screens/acount/Login";
import Register from "../screens/acount/Register";


const Stack = createStackNavigator();

export default function HomeStack() {
  
    return (
    <NavigationContainer>
        <Stack.Navigator
            initialRouteName="home"
        >
            <Stack.Screen
                name = "login"
                component = {Login}
                options = {{
                    title : "Iniciar sesión"
                }}
            />
            <Stack.Screen
                name = "register"
                component = {Register}
                options = {{
                    title : "Regístrate"
                }}
            />
        </Stack.Navigator>
        </NavigationContainer>
    );

      }

