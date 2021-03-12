import React, {useEffect, useState} from 'react';
import {Text} from "react-native";
import * as firebase from "firebase";

import Loading from "./App/components/Loading";

import HomeStack from "./App/navigation/HomeStack";
import AcountStack from "./App/navigation/AcountStack";



export default function App() {
  const [login, setLogin] = useState(null);

  useEffect(() =>{
      firebase.auth().onAuthStateChanged((user) =>{
        !user ? setLogin(false) : setLogin(true)
      });

  }, [] );


    if (login === null) {
      <Loading isVisible={true}/>
    }
    return ( login ? <HomeStack/> : <AcountStack/>)
      }

