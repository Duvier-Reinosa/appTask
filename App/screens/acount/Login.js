import {useNavigation } from '@react-navigation/native';
import React, { useRef } from 'react'
import {StyleSheet, ScrollView, Image , View, Text} from "react-native";
import Toast from "react-native-easy-toast";

import LoginForm from "../../components/acount/LoginForm";

export default function Login() {
    const toastRef = useRef();
    return (
        <ScrollView>
            <Image
                source={require("../../../assets/img/logo.png")}
                resizeMode="contain"
                style={styles.logo}/>
            <View style={styles.container} >
                <LoginForm/>
                <CreateAcount />
            </View>
            <Toast ref={toastRef} position="center"/>
        </ScrollView>
    )
}

function CreateAcount(props) {
    const navigation = useNavigation();
    return (
        <Text style={styles.textRegister} >¿Aún no tienes una cuenta?
            <Text style={styles.btnRegister} onPress={()=> navigation.navigate("register")}>
                {" "}Registrate
            </Text>
        </Text>
    )
}

const styles = StyleSheet.create({
    logo:{
      width: "100%",
      height: 220,
      marginTop: 20,
    },
    container:{
        marginLeft: 40,
        marginRight: 40
    },
    textRegister:{
        marginTop: 15,
        marginLeft: 10,
        marginRight: 10,
        color: "#5836FF"
    },
    btnRegister:{
        fontWeight: "bold",
    }
})
