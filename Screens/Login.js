import { View, Text,Image,StyleSheet,KeyboardAvoidingView,Alert,TouchableOpacity,ActivityIndicator,StatusBar} from 'react-native'
import React , {useState,useEffect}from 'react';
import {TextInput,Button} from "react-native-paper"

import auth from '@react-native-firebase/auth'

export default function Login({navigation}) {
  
   useEffect(()=>{
      auth().onAuthStateChanged((user)=>{
             if(user)
             navigation.replace("home")
      })
   },[])



   const [email,setEmail]=useState("");
   const [password,setPassword]=useState("")
   const[loading,setloading]=useState(false)
     
    
   if(loading)
   {
    return <ActivityIndicator size="small" color="#0000ff" />
   }
   const userLogin=async()=>{
      
    if(!(email&&password))
    {
      Alert.alert("please fill all the details ")
      return
    }
    setloading(true)
     const result =  await auth().signInWithEmailAndPassword(email,password).catch((error)=> Alert.alert(error));

     setloading(false)  
     

   }
   
  return (
    
      /* <View style={styles.box1}>
        
        
        <Text style={styles.text}>
          please login to continue!
        </Text>
      </View>
      <View style={styles.box2}>
      <TextInput
      label="Email"
      mode="outlined"
      value={email}
      onChangeText={text => setEmail(text)}
    />
    <TextInput
      label="Password"
      value={password}
      mode="outlined"
      secureTextEntry={true}
      onChangeText={text => setPassword(text)}
    />
    <Button  title='login' onPress={userLogin}/>
    <TouchableOpacity  style={{marginTop:20}} onPress={()=> navigation.navigate("signup")}>
      <Text>
        Don't have a account?
      </Text>
    </TouchableOpacity>
    
    
      </View> */
     
      <View style={styles.container}>
    <StatusBar style="dark"/>
      <Image source={{
        uri:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQUnrlcFPJ4w90-bT2sxcocyj5ST8llPepyEWZkabO1A&s"
        }} 
        style={{height:150 , width:150}}

      />
      
      <View style={styles.inputContainer}>
        <TextInput  type="email" placeholder='Enter your email address' value={email} onChangeText={text=> setEmail(text)}/>
        <TextInput type="password" secureTextEntry placeholder='Enter your password' value={password} onChangeText={text=> setPassword(text)} />
        
      </View>
      <Button style={styles.button} mode="contained" onPress={userLogin}>
    Login
  </Button>
        {/* <Button containerStyle={styles.button} onPress={()=>{navigation.navigate('RegisterScreen')}} title="Register" type="outline"/> */}
        <TouchableOpacity   onPress={()=> navigation.navigate("signup")}>
      <Text>
        Don't have an account?
      </Text>
    </TouchableOpacity>
     
      <View style={{height:100 ,marginTop:20}}>

      </View>
    </View>






    
  )
}

const styles=StyleSheet.create({
  // box1:{
  //   alignItems:"center",
  //   marginTop: 30,
    
  // },
  // text:{
  //   fontSize:22,
  //   // margin:20
  // },
  // box2:{
   
    
  //   paddingHorizontal:40,
    
  //   justifyContent:"space-evenly",
    
  // }



  container:{
    flex:1,
    justifyContent:"center",
    alignItems:"center"
    },
    
    button:{
     marginTop:10,
     width:160,
     
     marginBottom:10
    },
    inputContainer:{
       width:250,
       height:150,
       marginTop:10,
       
       justifyContent:"space-around"
       

    }
    
    
})