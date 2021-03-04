import 'react-native-gesture-handler';
import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import {NavigationContainer} from "@react-navigation/native";


import Home from "../screens/Home";
import AddTask from "../screens/AddTask";


const Stack = createStackNavigator();

export default function HomeStack() {
  
    return (
    <NavigationContainer>
        <Stack.Navigator
            initialRouteName="home"
        >
            <Stack.Screen
                name = "home"
                component = {Home}
                options = {{
                    title : "Mis tareas"
                }}
            />
            <Stack.Screen
                name = "añadirTarea"
                component = {AddTask}
                options = {{
                    title : "Agregar Tarea"
                }}
            />
        </Stack.Navigator>
        </NavigationContainer>
    );

      }

