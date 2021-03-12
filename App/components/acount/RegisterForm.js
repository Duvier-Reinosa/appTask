import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Input, Icon, Button } from "react-native-elements";
import Loading from "../Loading";
// import { validateEmail } from "../../utilidades/validations";
import { size, isEmpty } from "lodash";
import * as firebase from "firebase";
import { useNavigation } from "@react-navigation/native";

export default function RegisterForm(props) {
    const {toastRef} = props;
    return (
        <View>
            <Text>registerform</Text>
        </View>
    )
}
