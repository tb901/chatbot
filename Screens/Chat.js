import { StyleSheet, Text, View ,SafeAreaView,StatusBar,KeyboardAvoidingView,TouchableOpacity,ScrollView} from 'react-native'
import React, { useLayoutEffect, useState,useEffect } from 'react'
import auth from "@react-native-firebase/auth"
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import firestore from "@react-native-firebase/firestore"
import {TextInput} from "react-native-paper"
import {Avatar} from "@rneui/base"
import FontAwesome from "react-native-vector-icons/FontAwesome"
import Ionicons from "react-native-vector-icons/Ionicons"


const Chat = ({navigation,route}) => {
  
  const [messages,setmessages]=useState([{}])

  useLayoutEffect(()=>{
    navigation.setOptions({
         title: route.params.name ,
       
         headerTitleAlign: "left",
         headerStyle:{
          backgroundColor:"#E6ECF3"
          
         },
         headerTitleStyle:{
          color:"green",
          
         },
         headerLeft:()=>(
          <View style={{flexDirection:"row",width:80,alignItems:
          "center",justifyContent:"space-between",marginLeft:40}}>

          <TouchableOpacity onPress={()=>navigation.goBack()}>
            <MaterialIcons name="arrow-back" size={20} color="green"/>
          </TouchableOpacity>
          <Avatar rounded source={{uri:route.params.imageUrl}} />
          {/* <Text style={{fontSize:20,marginLeft:10,color:"green"}}>{route.params.name}</Text>  */}
        </View> ),
        headerRight:()=>(
          <View style={{flexDirection:"row" , alignItems:"center" ,justifyContent:"space-around" , width:
          80}}>
            <TouchableOpacity>
              <FontAwesome name="video-camera" size={20} color="green" />
            </TouchableOpacity>
  
            <TouchableOpacity>
              <Ionicons name="call" size={20} color="green"/>
            </TouchableOpacity>
  
            
          </View>
        )
      })
     



    },[navigation])
  


  const getchat=async()=>{
     await firestore().collection('chats').doc(docid).collection('message').orderBy('createdAt').onSnapshot((snapshot)=>{
              setmessages(snapshot.docs.map((item)=> item.data()))
      }) 
      
  }

  const currentuid=auth().currentUser.uid
   const [input,setinput]=useState();
   const docid= route.params.uid> currentuid? route.params.uid+currentuid: currentuid+route.params.uid
    const sendmessage = async() => {
      if(input==="")
      return
      
      
       const subscribe= await firestore().collection('chats').doc(docid).collection('message').add({
        message: input,
        createdAt: firestore.FieldValue.serverTimestamp(),
        sentby: currentuid,
        sentto: route.params.uid

       })
       
       
      //   setmessages([...messages,user.data()])
      //  const subscribe2= await firestore().collection('message').doc(subscribe.message).get().then((users)=>{
      //        console.log(users.data())
      //   }
        
       

      //  console.log(result.user)

      //  setmessage([...message,{r}])
       getchat()
        
       
       setinput("")
    }

    useEffect( ()=>{
      async function fetchdata(){
     const result= await firestore().collection('chats').doc(docid).collection('message').orderBy('createdAt').onSnapshot((snapshot)=>{
            setmessages(snapshot.docs.map((item)=>{
                // console.log(item.data())
                 return item.data()
            }))
      })
    }
    fetchdata()
      // console.log(message)

    },[navigation])

    
  return (
    <>
    {/* {console.log(messages)} */}
    <SafeAreaView style={{flex:1 ,backgroundColor:"white"}}>
    <StatusBar  style="light"/>
    <KeyboardAvoidingView behaviour={Platform.OS==="ios" ? "padding":"height"}
    style={styles.container}
    keyboardVerticalOffset={90} >
     
   <ScrollView keyboardShouldPersistTaps='handled'>
      
     
    {
     
     messages.map(({sentby,message})=>{
           if(sentby === currentuid )
         return(<View key={Math.random()*1000} style={styles.receiver}>
          {/*  */}
          <Text style={styles.receiverText}>{message}</Text>
         </View>)
         else
         return(
         <View  key={Math.random()*1000} style={styles.sender} >
           {/* <Avatar/> */}
           <Text style={styles.senderText} > {message}</Text>
         </View>)

     })
    }
    
    
   </ScrollView>
   <View style={styles.footer}>
     <TextInput placeholder="Type Message" style={styles.textinput} value={input} onChangeText={(text)=> setinput(text)}  />
     <TouchableOpacity  onPress={sendmessage} activeOpacity={0.5}>
        <MaterialIcons name="send" size={20} color="#2B68E6"/>
     </TouchableOpacity>
   </View>
   
   </KeyboardAvoidingView>

</SafeAreaView>
</>
)
  }
const styles = StyleSheet.create({
  footer:{
    flexDirection:"row",
    alignItems:"center",
    marginBottom:10




  },
  container:{
     flex:1,

  },
  textinput:{
   bottom: 0,
   height: 40,
   flex:1 ,
   marginRight: 15,
   borderColor: "transparent",
   backgroundColor: "#ECECEC",
   borderWidth: 1,
   padding: 10,
   color: "grey",
   borderRadius:30

  },
  receiver:{
    padding:10,
    backgroundColor:"#ECECEC",
    borderRadius: 10,
    marginRight: 15,
    marginBottom: 5,
    maxWidth: "80%",
    position:"relative",
    alignSelf:"flex-end"

  },

  sender:{
    padding:10,
    backgroundColor:"#86B1DB",
   
    alignSelf:"flex-start",
    borderRadius:10,
    margin: 5,
    maxWidth: "60%",
    position:"relative"





}})
  


export default Chat

