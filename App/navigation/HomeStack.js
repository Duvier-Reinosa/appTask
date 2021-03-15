import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet} from "react-native";
import { Button } from "react-native-elements";
import { createStackNavigator } from "@react-navigation/stack";
import {NavigationContainer} from "@react-navigation/native";

import * as firebase from "firebase";


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
                    title : "Mis tareas",
                    headerRight: () =>(
                        <Button
                            title="Cerrar sesión"
                            containerStyle={styles.headerButton}
                            buttonStyle={styles.headerButtonStyle}
                            onPress={()=>{
                                firebase.auth().signOut().then(() => {
                                  }).catch((error) => {
                                    // An error happened.
                                  });
                            }} />
                    )
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

      const styles = StyleSheet.create({
        headerButton:{
            marginRight: 5
        },
        headerButtonStyle:{
           backgroundColor: "#5836FF"
        }
      })

