import { View, Text,StyleSheet } from 'react-native'
import React from 'react'

import AntDesign from "react-native-vector-icons/AntDesign"
import MaterialIcons from "react-native-vector-icons/MaterialIcons"

const TaskLayout = (props) => {
  const deletenode=()=>{
    props.setItems(props.items.filter((name)=>{
         if(name.id!==props.id)
         return name
    }))
    }

    const completetask=()=>{
      
    
      
      
      
    }

    const editnote=()=>
    {  
         const name=props.items.find((x)=> x.id===props.id)
         console.log(name)
         
        //  props.setTask(name.text)
         
    props.setTask(props.text)
    props.setupdatetask(name)


        
     }


  return (
    <View style={styles.item}>
        <View  style={styles.itemleft}>
        <View style={styles.square}>
    
        </View>
        <Text style={styles.textitem}>
          {props.text}
        </Text>
        </View>
        <View style={styles.circle}>
        <AntDesign name="delete"  size={20} color="skyblue" onPress={deletenode} />
        <AntDesign name="edit"  size={20} color="skyblue"  onPress={editnote} />
        <MaterialIcons name="content-cut" size={20} color="skyblue"  onPress={completetask}/>
         </View>
        
         
    </View>
  )
}

const styles=StyleSheet.create({
item:{
   paddingTop:10,
   paddingLeft: 15,
   paddingBottom:15,
   backgroundColor: "#fff",
   borderRadius:10,
   flexDirection: "row",
   alignItems:"center",
   marginBottom:20,
   justifyContent:"space-between"
   
   
   
   
},

itemleft:{
  flexDirection: "row",
  alignItems:"center",
  flexWrap:'wrap'


},
square:{
  width:30,
  height:30,
  backgroundColor:"skyblue",
  opacity:0.4,
  marginRight:15,
  borderRadius:5
},
textitem:{
   maxWidth:"80%"
},
circle:{
 width:"25%",
//   height:12,
//   backgroundColor:"skyblue",
//   opacity:0.4,
// //  borderRadius:5,
 marginRight: 15,
 flexDirection:"row",
 justifyContent:"space-around"
 

}

})

export default TaskLayout