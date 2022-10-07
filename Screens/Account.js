import { StyleSheet,  View ,Image} from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import auth from "@react-native-firebase/auth"
import firestore from "@react-native-firebase/firestore"
import MaterialIcons  from "react-native-vector-icons/MaterialIcons"
import { TouchableOpacity } from 'react-native-gesture-handler'
   import {Text} from "react-native-paper"
const Account = ({navigation}) => {
  const logout=async()=>{
    await  auth().signOut().then(()=>{
     navigation.replace("login")
    })
 
    
   }
  useLayoutEffect(()=>{
        navigation.setOptions({
          headerRight:()=>(
            <View style={{marginRight:20}}>
            <TouchableOpacity activeOpacity={0.5} onPress={logout}>
              <MaterialIcons name="logout" size={20} color="black"/>
              </TouchableOpacity>
             </View>
          )
        })
  },[])
  const [user,setuser]=useState({})
  useEffect(()=>{
     const uid=auth().currentUser.uid
   async function fetchphoto(){
     await firestore().collection('users').doc(uid).onSnapshot((snapshot)=>{
          setuser(snapshot.data())  
      })
      
    }
    fetchphoto()
  
  },[navigation])
  return (
    <View style={{alignItems:"center",marginTop:30}}>
      <Image source={{uri:user.imageUrl}} style={{height:200,width:200,borderRadius:100}}/>
      <Text h3 style={{fontSize:20}}> ~ {user.name}</Text>
    </View>
  )
}

export default Account

const styles = StyleSheet.create({})