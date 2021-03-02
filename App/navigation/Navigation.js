import React from "react";
import {NavigationContainer} from "@react-navigation/native";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";

import HomeStack from "./HomeStack"

const Tab = createBottomTabNavigator();

export default function(){
    return(
        <NavigationContainer>
            <Tab.Navigator
              initialRouteName="home"
            >

      </Tab.Navigator>
            <Tab.screen
                name="home"
                component={HomeStack}
                options={{
                    title: "Mis tareas"
                }}
            />
        </NavigationContainer>
    )
}
