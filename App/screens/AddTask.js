import React, {useEffect, useState, useRef} from 'react';
import { StyleSheet, Text, View, TextInput} from 'react-native';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import DateTimePicker from '@react-native-community/datetimepicker';
import Toast from 'react-native-easy-toast';




export default function AddTask(props) {
    const {tareas, setTareas}= props.route.params;
    const {navigation}= props;
    // console.log(tareas);
    const toastRef = useRef();

    const [date, setDate] = useState(new Date(1598051730000));
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    // console.log(date);


    const [tarea, setTarea] = useState(defaultFormValue());
    // console.log(tarea);


    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
    };

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };

    const showTimepicker = () => {
        showMode('time');
    };

    const onChangeForm = (e, type) => {
        setTarea({ ...tarea, [type]: e.nativeEvent.text });
      };

    const setearTarea = () =>{
        console.log(tarea.nombre);
        if(tarea.nombre === ""){
            toastRef.current.show("Recuerda llenar todo los espacios (Nombre, fecha)")
        }else{
            setTarea({ ...tarea, ["fecha"]: date});
            setTareas(tarea);
            toastRef.current.show("Tarea agregada");
            
            setTimeout(() => {
                navigation.navigate("home")
              }, 2000);
        }
       


    }

    return( 
        <View style={styles.screen}>
            <Text style={styles.text}>Nombre de tu tarea</Text>
            <TextInput
                style={styles.input}
                onChange={(e)=> onChangeForm(e, "nombre")}
            />
            <Text style={styles.text}>Fecha de entrega</Text>
            {show && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode={mode}
                    is24Hour={true}
                    display="default"
                    onChange={onChange}
            />
      )}
        <Button
          type="solid"
          buttonStyle={styles.btnDate}
          onPress={()=> setShow(true)}
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
        </View>)
      }

      function defaultFormValue() {
        return {
          nombre: "",
          fecha: "",
          nota: "",
        };
      }

 const styles = StyleSheet.create({
     screen:{
        
     },
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
     }
     
 });
