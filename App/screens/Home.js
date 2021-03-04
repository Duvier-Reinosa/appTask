import React, {useEffect, useState, useCallback} from 'react';
import { StyleSheet, Text, View, ScrollView, FlatList } from 'react-native';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useFocusEffect, useIsFocused} from "@react-navigation/native";


import { firebaseApp } from "../utills/firebase";
import firebase from "firebase/app";
import  "firebase/firestore";

const db = firebase.firestore(firebaseApp);


export default function Home(props) {
   const {navigation} = props;

   const [tareas, setTareas] = useState([]);

   useFocusEffect(
      useCallback(()=>{
         const resultTasks = [];
         db.collection("tasks").get().then((snap)=>{
         snap.forEach((doc)=>{
         resultTasks.push(doc.data())
         })
         setTareas(resultTasks);
      });

      }, [])
   );

    
    return (<View style={styles.homeScreen}>
       <ScrollView>
          {(tareas.length > 0) ? <FlatList
                  data={tareas}
                  renderItem={(task)=> <Task task={task} />}
                  keyExtractor={(item, index) => index.toString}
               /> : <Text>cargado...</Text>}
            
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

      function Task(props) {
         const {task } = props;
         const theTask = task.item.tarea;
         console.log(theTask);
         return(
            <View style={styles.tasksContainer} >
               <View style={styles.taskContainer}>

                  <Text style={styles.taskName}> 
                     {theTask.nombre}
                     </Text>
                  <Text style={styles.taskDate}>{theTask.fecha.dia}/{theTask.fecha.mes}/{theTask.fecha.año}</Text>
                  <Text style={styles.taskNote}>{theTask.nota}</Text>

               </View>
            </View>
            
         )
         
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