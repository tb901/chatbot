import { View,Image,StyleSheet ,KeyboardAvoidingView,TouchableOpacity, Alert,ActivityIndicator} from 'react-native'
import React , {useState}from 'react'
import {Button,TextInput,Text} from "react-native-paper"
import auth from '@react-native-firebase/auth'
import firestore from "@react-native-firebase/firestore"
import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore'
// import {TextInput} from "react-native-gesture-handler"
export default function Signup({navigation}) {
   const [email,setEmail]=useState("")
   const [password,setPassword]=useState("")
   const[ name, setname]=useState("");
   const [loading,setloading]=useState(false)
   const [imageUrl,setimageUrl]=useState(null)
   if(loading)
    {
      return  <ActivityIndicator  size="small" color="#0000ff"/>
    }

   const userSignup = async()=>{
     

    if(!(email&&password&&name))
    {
      Alert.alert("please fill all the details ")
      return
    }
    setloading(true)
      
    const result= await auth().createUserWithEmailAndPassword(email,password).catch((error=> Alert.alert(error)));
     
      setloading(false)  
     
     
  await firestore().collection('users').doc(result.user.uid).set({
       name: name,
       email: email,
       uid: result.user.uid,
       imageUrl: (imageUrl===null) ?  "http://www.ferran.org/wp-content/uploads/2020/06/4CCC7876-BC36-421E-80E8-4260859A3887-1024x717.jpeg": imageUrl
    }).then((user)=>{
      console.log("user added")
      console.log(user)
    })
    // console.log(result2.user)
   
     
    setloading(false)
   }
   
  return (
    // <KeyboardAvoidingView behavior='position'>
    //   <View style={styles.box1}>
        
        
    //     <Text style={styles.text}>
    //       please signup
    //     </Text>
    //   </View>
    //   <View style={styles.box2}>
    //   <TextInput
    //   label="Email"
    //   mode="outlined"
    //   value={email}
    //   onChangeText={text => setEmail(text)}
    // />
    // <TextInput
    //   label="Password"
    //   value={password}
    //   mode="outlined"
    //   secureTextEntry={true}
    //   onChangeText={text => setPassword(text)}
    // />
    // <TextInput
    //   label="Name"
    //   value={name}
    //   mode="outlined"
     
    //   onChangeText={text => setname(text)}
    // />
    

    // <TouchableOpacity style={{marginTop:20}} onPress={()=> navigation.navigate("login")}>
    //   <Text>
    //    login
    //   </Text>
    // </TouchableOpacity>
    
    
    //   </View>
    //   <Button style={{position:"absolute", bottom:20}}  title='signup' onPress={userSignup}/>

    // </KeyboardAvoidingView>
   
    // <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View style={styles.container}>

      
      <Text h1  style={{fontSize:22,marginBottom:20}}>Create an Account</Text>
      <View style={styles.inputContainer}>
        <TextInput style={styles.textinput}
          placeholder='Enter your name'
          type='text'
          value={name}
          onChangeText={text => setname(text)}
        />

        <TextInput style={styles.textinput}
          placeholder='Enter your email'
          type='email'
          value={email}
          
          onChangeText={text => setEmail(text)}
        />
        <TextInput style={styles.textinput}
          placeholder='Enter your password'
          type='password'
          value={password}
          secureTextEntry
         
          onChangeText={text=> setPassword(text)}
        />
        <TextInput style={styles.textinput}
          placeholder='Profile Picture URL'
          type='text'
          value={imageUrl}
          selectTextOnFocus={true}
         
          onChangeText={text=> setimageUrl(text)}
        />
        
      </View>
      <Button Style={styles.button} mode="contained" title="Register" onPress={userSignup}> Signup</Button> 
      <TouchableOpacity style={{marginTop:2}} onPress={()=> navigation.navigate("login")}>
      <Text>
       Login
       </Text>
     </TouchableOpacity>
     </View>
      
    // </KeyboardAvoidingView>
    




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
    alignItems:"center",
  
  },
  inputContainer:{
  width:250,
  // height:"30%",
  justifyContent:"center",
  // marginTop:10
  
  
  },
  button:{
    marginTop:50,
    width:100
  },
  textinput:{
    marginBottom:3
  }
  
  
  




})