import React, {useState, useRef} from 'react';
import { StyleSheet, Text, View, TextInput} from 'react-native';
import { Button, Overlay } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import Toast from 'react-native-easy-toast';

import { firebaseApp } from "../utills/firebase";
import firebase from 'firebase/app';
import 'firebase/firestore';

var db = firebase.firestore(firebaseApp);






export default function AddTask(props) {
    const {navigation}= props;
    const toastRef = useRef();

    let user = firebase.auth().currentUser;
    let name, email, photoUrl, uid, emailVerified;

    if (user != null) {
          name = user.displayName;
          email = user.email;
          photoUrl = user.photoURL;
          emailVerified = user.emailVerified;
          uid = user.uid;
    }


    const [tarea, setTarea] = useState(defaultFormValue());
    const [date, setDate] = useState(defaultDateValue());
    const [visible, setVisible] = useState(false);

    const toggleOverlay = () => {
      setTarea({ ...tarea, ["fecha"]: date});
      setVisible(!visible);
    };
    

    const onChangeForm = (e, type) => {
        setTarea({ ...tarea, [type]: e.nativeEvent.text });
      };
    
    const onChangeFormOverlay = (e, type)=>{
      setDate({ ...date, [type]: e.nativeEvent.text });
    }; 

    const setearTarea = () =>{
        console.log(tarea.nombre);
        if(tarea.nombre === ""){
            toastRef.current.show("Recuerda llenar todo los espacios (Nombre, fecha)")
        }else{
            console.log(tarea.nombre, tarea.fecha, tarea. nota);
            db.collection(`tasks${uid}`).doc().set({
              tarea
            })
            toastRef.current.show("Tarea agregada");
            
            setTimeout(() => {
                navigation.navigate("home")
              }, 2000);
        }
    }

    return( 
        <View style={styles.screen}>
            <Overlay 
                isVisible={visible}
                onBackdropPress={toggleOverlay}
                overlayStyle={styles.overlayScreen} >
                <Text style={styles.textOverlay}>Fecha de entrega</Text>
                <View style={styles.viewOverlay}>
                  <Text style={styles.text}>Día</Text>
                  <TextInput
                    style={styles.inputOverlay}
                    onChange={(e)=> onChangeFormOverlay(e, "dia")}
                    defaultValue={date.dia}
                  />
                  <Text style={styles.text}>Mes</Text>
                  <TextInput
                    style={styles.inputOverlay}
                    onChange={(e)=> onChangeFormOverlay(e, "mes")}
                    defaultValue={date.mes}
                  
                  />
                  <Text style={styles.text}>año</Text>
                  <TextInput
                    style={styles.inputOverlay}
                    onChange={(e)=> onChangeFormOverlay(e, "año")}
                    defaultValue={date.año}
                  />
                </View>
                <Button
                    type="solid"
                    buttonStyle={styles.btnDateOverlay}
                    onPress={toggleOverlay}
                    title="Listo"
            />
            </Overlay>
            <Text style={styles.text}>Nombre de tu tarea</Text>
            <TextInput
                style={styles.input}
                onChange={(e)=> onChangeForm(e, "nombre")}
            />
            <Text style={styles.text}>Fecha de entrega</Text>
            <Button
              type="solid"
              buttonStyle={styles.btnDate}
              onPress={()=> setVisible(true)}
              icon={
                <Icon
                  name="calendar"
                  size={15}
                  color="white"
                />
              }
            />
            <Text style={styles.text}>Notas</Text>
            <TextInput
                    style={styles.input2}
                    multiline={true}
                    onChange={(e)=> onChangeForm(e, "nota")}
                    numberOfLines= {10}
                />
            <Button
              type="solid"
              title="Guardar tarea"
              buttonStyle={styles.btnDate}
              onPress={()=> setearTarea()}
            />
            <Toast ref={toastRef} position="center"/>
        </View>
        );
      }

      function defaultFormValue() {
        return {
          nombre: "",
          fecha: "",
          nota: "",
        };
      }
      function defaultDateValue() {
        return {
          dia: "",
          mes: "",
          año: "2021",
        };
        
      }

 const styles = StyleSheet.create({
     text:{
        marginTop: 15,
        marginRight: 15,
        marginLeft: 15,
        fontWeight: "bold"
     },
     input:{
         marginTop: 15,
         marginRight: 15,
         marginLeft: 15,
         height: 40,
         borderColor: "#5836FF", 
         borderWidth: 1 ,
         borderRadius: 5,
         padding: 5
     },
     btnDate:{
        marginTop: 15,
        marginRight: 15,
        marginLeft: 15,
        height: 40,
        backgroundColor: "#5836FF", 
        borderRadius: 5
     },
     input2:{
        marginTop: 15,
         marginRight: 15,
         marginLeft: 15,
         height: 150,
         borderColor: "#5836FF", 
         borderWidth: 1 ,
         borderRadius: 5,
         padding: 5
     },
     iconleft:{
         color: "#5836FF"
     },
     overlayScreen:{
      alignItems: "center",
      width: "85%",
      height: "55%",
     },
     textOverlay:{
      marginTop: 20,
      fontWeight: "bold"
   },
    inputOverlay:{
      marginTop: 10,
      marginRight: 15,
      marginLeft: 15,
      height: 40,
      width: "90%",
      borderColor: "#5836FF", 
      borderWidth: 1 ,
      borderRadius: 5,
      padding: 5
    },
    viewOverlay:{
      width: "100%"
    },
    btnDateOverlay:{
      marginTop: 25,
      height: 40,
      backgroundColor: "#5836FF", 
      borderRadius: 5
    }

     
 });
