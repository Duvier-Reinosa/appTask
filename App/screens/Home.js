import React, {useRef, useState, useCallback} from 'react';
import { StyleSheet, Text, View, ScrollView, FlatList, Alert, Image } from 'react-native';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useFocusEffect, useIsFocused} from "@react-navigation/native";
import Toast from 'react-native-easy-toast';



import { firebaseApp } from "../utills/firebase";
import firebase from 'firebase/app';
import 'firebase/firestore';


import Loading from "../components/Loading";

const db = firebase.firestore(firebaseApp);

let refGeneral


export default function Home(props) {
   const {navigation} = props;
   const toastRef = useRef();

   const [tareas, setTareas] = useState([]);
   const [ isLoading, setIsLoading] = useState(false);

   let user = firebase.auth().currentUser;
   let name, email, photoUrl, uid, emailVerified;

   if (user != null) {
         name = user.displayName;
         email = user.email;
         photoUrl = user.photoURL;
         emailVerified = user.emailVerified;
         uid = user.uid;
   }

   let ref = "tasks" + uid; //para referencias sin errores
   refGeneral = ref;

   useFocusEffect(
      useCallback(()=>{
         setIsLoading(true)
         const resultTasks = [];
         const resultIds = []
         db.collection(ref).get().then((snap)=>{
         snap.forEach((doc)=>{
         resultIds.push(doc.id);
         resultTasks.push(doc.data())
         })
         setTareas(resultTasks);
         setIsLoading(false);
      });

      }, [])
   );

    
    return (
    <View style={styles.homeScreen}>
       <ScrollView>
          {
          (tareas.length > 0) ? 
            <FlatList
                  data={tareas}
                  renderItem={(task) => <Task task={task}
                                             ref={ref}
                                             navigation={navigation} 
                                             toastRef ={toastRef} />}
                  keyExtractor={(item, index) => index.toString}
               /> : <View style={styles.tasksContainer} ><Image 
                                                         source={require("../../assets/img/homeImg.png")}
                                                         resizeMode="contain"
                                                         style={styles.homeImage} /></View>}
            
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
            <Loading isVisible={isLoading} />
            <Toast ref={toastRef} position="center"/>
         </View>)
      }

      function Task(props) {
         const {task, navigation} = props;
         const theTask = task.item.tarea;


         const deleteTask = (id) =>{
            db.collection(refGeneral).doc(id).delete().then(() => {
               console.log("Document successfully deleted!");
               navigation.navigate("añadirTarea");
           }).catch((error) => {
               console.error("Error removing document: ", error);
           });

         }

         const alertDelete = () => {
            Alert.alert(
               "¿Quieres eliminar tu tarea?",
               "Si la eliminas no podras recuperar tu tarea",
               [
                  {
                    text: "Cancel",
                    onPress: () => console.log("cancelled"),
                    style: "cancel"
                  },
                  { text: "OK", onPress: () => db.collection(refGeneral)
                                                .get()
                                                .then((querySnapshot) => {
                                                   querySnapshot.forEach((doc) => {
                                                      if (theTask.nombre === doc.data().tarea.nombre) {
                                                         const idResult = doc.id;
                                                         deleteTask(idResult)
                                                      }
                                                   });
                                                })
                                                .catch((error) => {
                                                   console.log("Error getting documents: ", error);
                                                }) }
                ]
            )
         };

         return(
            <View style={styles.tasksContainer} >
               <View style={styles.taskContainer}>

                  <Text style={styles.taskName}> 
                     {theTask.nombre}
                     </Text>
                  <Text style={styles.taskDate}>{theTask.fecha.dia}/{theTask.fecha.mes}/{theTask.fecha.año}</Text>
                  <Text style={styles.taskNote}>{theTask.nota}</Text>
                  <Button
                     title="Eliminar tarea"
                     containerStyle={styles.btnDeleteContainer}
                     buttonStyle={styles.btnDelete} 
                     onPress={alertDelete} />
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
      height: 120,
      backgroundColor: "#D1D1D1",
      shadowColor: "#A0A0A0",
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
   },
   btnDeleteContainer: {
      padding: 5,

   },
   btnDelete:{
      backgroundColor:"transparent",
   },
   homeImage:{
      width: 500,
      marginTop: -450
   }
});