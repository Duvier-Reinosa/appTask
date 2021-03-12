import React, {useRef} from 'react'
import { View, Text } from 'react-native'
import Toast from "react-native-easy-toast"

import RegisterForm from "../../components/acount/RegisterForm"

export default function Register(props) {
    const toastRef = useRef();
    return (
        <View>
            <RegisterForm toastRef={toastRef}/>
            <Toast ref={toastRef} position="center" opacity={0,9}/>
        </View>
    )
}
