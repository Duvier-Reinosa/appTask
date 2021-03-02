import React, {useEffect, useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';


export default function Home(props) {
   const {navigation} = props;
   const [tareas, setTareas] = useState();
   console.log(tareas);

   
    return (<View style={styles.homeScreen}>
       <ScrollView>
          {
             
          }
        
       </ScrollView>
            
            <Button
               type="clear"
               containerStyle={styles.btnPlus}
               onPress={()=> navigation.navigate("añadirTarea", {tareas: tareas, setTareas})}
               icon={
                  <Icon
                    name="plus"
                    size={22}
                    color="white"
                  />
                }
            />
         </View>)
      }

const styles = StyleSheet.create({
   homeScreen:{
      flex: 1
   },
   btnPlus:{
      position: "absolute",
      bottom: 15,
      right: 15,
      backgroundColor:"#5836FF",
      justifyContent: 'center',
      alignItems: 'center',
      width: 60,
      height: 60,
      borderRadius: 60
   },
   tasksContainer:{
      alignItems: "center",
      width: "100%"
   },
   taskContainer:{
      borderRadius: 10,
      marginTop: 20,
      width: "90%",
      height: 90,
      backgroundColor: "#E6E6E6"
   },
   taskName:{
      fontWeight: "bold",
      marginTop: 10,
      marginLeft: 15
   },
   taskDate:{
      marginTop: 2,
      marginLeft: 15,
      color: "#7E7E7E"
   },
   taskNote:{
      marginTop: 2,
      marginLeft: 15,
      color: "#7E7E7E" 
   }
});