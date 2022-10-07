import { StatusBar, StyleSheet, Text, TouchableHighlight, TouchableOpacity, View } from 'react-native'
import React, { useState,useEffect, useLayoutEffect } from 'react'
import firestore from "@react-native-firebase/firestore"
import { FlatList } from 'react-native-gesture-handler'
import  auth from "@react-native-firebase/auth"
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import AntDesign from "react-native-vector-icons/AntDesign"
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons"

import { ListItem ,Avatar} from '@rneui/base'

const Home = ({navigation}) => {
  
  
  useLayoutEffect(()=>{
    navigation.setOptions({
    title: "Messages",
    headerStyle: {
      backgroundColor: '#73ADEB'
    },
    headerRight:()=>(
      <View style={{
        flexDirection:"row",
        justifyContent:"space-between",
        width:70,
        alignItems:"center",
        marginRight:20
      }}>

      

      
       <TouchableOpacity  activeOpacity={0.5} onPress={()=> navigation.navigate('todo')}>
        <MaterialIcons name="list-alt" size={24} color="black"/>
        
      </TouchableOpacity>
      <TouchableOpacity activeOpacity={0.5} onPress={()=>navigation.navigate("Account")}>
        <MaterialIcons name="account-circle" size={20} color="black"/>
      </TouchableOpacity>
       </View>
    ),
    headerLeft:()=>(
      <View style={{marginLeft:20,marginTop:5}}>

      
       <MaterialIcons name="message" size={20} color="black"/>
      
      </View>)
   })
  

    },[navigation])




   const [users,setusers]= useState([])

  
 
   const getusers= async()=>{
  // const querysnapshot= await firestore().collection('users').get().then(error=>console.log(error))
  //   const allusers = querysnapshot.doc.map(docsnap => docsnap.data())
  //   setusers(allusers)

  //  const  querysnapshot= await firestore().collection('users').get()  
  //  const allusers=querysnapshot.forEach((doc)=> doc.data()) 

    await firestore().collection("users").onSnapshot((snapshot)=>{
    setusers(snapshot.docs.map(doc => doc.data()

    ))
})

   

  //  setusers(allusers)
  //  console.log(users)

   


}

  


useEffect(() => {
  getusers();
  
},[navigation])



const RenderCard=({item})=>{
   return(

    // <TouchableOpacity style={{marginTop:3}} onPress={()=> navigation.navigate('chat',{
    //   uid:item.uid
    // })}> 
    /* <View style={{marginBottom:20, backgroundColor:"#white" , borderWidth:2, borderRadius:5, borderColor:"green"}}>
      <Text style={{color:"black"}}>
       {item.name}
      </Text>
      <Text style={{color:"black"}}>
       {item.email}
      </Text>
      
    </View> */
    <View>
    <ListItem  style={{marginTop:2}} bottomDivider onPress={()=>{navigation.navigate('chat',{uid:item.uid, name:item.name,imageUrl:item.imageUrl})}}>
       <Avatar  source={{uri:item.imageUrl}}  rounded/>
        <ListItem.Content>
        <ListItem.Title>
          {item.name}
        </ListItem.Title>
        
        {/* <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail">
           this is a youtube chat
        </ListItem.Subtitle> */}
       
        </ListItem.Content>
     </ListItem> 
    
</View>

    // </TouchableOpacity>
  )
}

   
  //  console.log(querysnapshot.size)
      // const user=querysnapshot.forEach((doc)=> doc.data())
             
      
     
   
   


  return (

    <View styel={styles.container}>
   
     {/* <FlatList
      data={users}
      renderItem={
        ({items})=>{
          return  (<RenderCard items={items}/>)
        }
      }
      keyExtractor={(item)=>{item.uid
 
      }}
     /> */}
     { 
       users.map((item)=>{
            if(item.uid !== auth().currentUser.uid){
          return <RenderCard item={item}  key={item.uid}/>
      }
      else{
      return } })



     }
     

    </View>
  
    )
}

export default Home

const styles = StyleSheet.create({
  container:{
    flex:1
  }
})