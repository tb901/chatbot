
import React, { useState,useEffect } from 'react';
import {DefaultTheme, Provider as PaperProvider, TextInput} from "react-native-paper";


import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from "./Screens/Login"
import Signup from './Screens/Signup'
import "react-native-gesture-handler"
import Home from "./Screens/Home"
import auth from "@react-native-firebase/auth"
import MaterialIcon from "react-native-vector-icons"
import Chat from "./Screens/Chat"
import Account  from './Screens/Account';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import Todo  from "./Screens/Todo"

// const theme={
//   ...DefaultTheme, 
//   roundness: 2,
//   colors:{
//     ...DefaultTheme.color,
//     primary: 'skyblue',
//   },
// };

const Stack = createStackNavigator()

//  function StackNavigator()
//  {  
//   return(
//  <>
//        <Stack.Screen  name="login" component={Login} options={{headerShown:false}}/>
//        <Stack.Screen  name="signup" component={Signup} options={{headerShown:false}}/>


//        </>   
    
//  )
    
//  }

const App=()=>{
  //  const [user,setuser]=useState(null)
  //  useEffect(() => {
  //       auth().onAuthStateChanged((userexist)=>{
  //          if(userexist)
  //            setuser(userexist)
  //         else
  //         setuser()

  //      })
   
     
  //  }, [])
   


  return(
  
    
    <NavigationContainer style={styles.box1}>
    <Stack.Navigator>
      
    <Stack.Screen name="login" component={Login} options={{headerShown:false}}/>
        <Stack.Screen name="signup" component={Signup} options={{headerShown: false}}/>
 <Stack.Screen  name="home" component={Home} />
        
        
        <Stack.Screen name="chat" component={Chat} />
        <Stack.Screen name="Account" component={Account}/>
        <Stack.Screen name="todo" component={Todo} />
        
    

     </Stack.Navigator>
    </NavigationContainer>
   
  )

}


const styles= StyleSheet.create({
  box1:{
    
    alignItems:"center",
    // backgroundColor:"#fff"
  },
})


export default App;