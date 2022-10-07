import { View, Text ,StyleSheet, TouchableOpacity,Button} from 'react-native'
import React, { useState } from 'react'
import TaskLayout from './TaskLayout'
// import { TextInput } from 'react-native-gesture-handler';
import KeyboardAvoidingView from 'react-native/Libraries/Components/Keyboard/KeyboardAvoidingView';
// import { Item } from 'react-native-paper/lib/typescript/components/List/List';
import { ScrollView } from 'react-native-gesture-handler';
import {TextInput} from "react-native-paper"

const Todo = () => {
  const [task,setTask]= useState()
  const [items,setItems]=useState([
    
  ])
  const [updatetask,setupdatetask]=useState()
  
  const addnote=()=>{
    if(task!==null && updatetask==null ){
     setItems([...items,{text:task, id:Math.random()*1000,completed:false}])
     setTask("")
    }
    else if(updatetask!==null){
        setItems(items.map((x)=>{
          if(x.id===updatetask.id)
            x.text=task
            return x
        }))
       setTask("")
        setupdatetask()
    


  }
}
  return (
    <View  style={styles.container} >
     
    <View style={styles.box1}>
    <Text style={styles.sectiontitle}>
        Today's Task
      </Text>

      <ScrollView style={styles.items}>
      {
        items.map((name)=>{
           return <TaskLayout text={name.text}  setTask={setTask}  completed={name.completed}key={name.id} items={items} setItems={setItems} id={name.id} updatetask={updatetask} setupdatetask={setupdatetask}

           />
        })
      }
      </ScrollView>
    </View>
      <View  style={styles.inputbox}>
     <TextInput  style={styles.input} placeholder="    Write some text" onChangeText={(name)=>setTask(name)} value={task} />
     <TouchableOpacity onPress={addnote}  >
       <View style={styles.addplus}>
       <Text style={styles.addtext}>
        +
       </Text>
       </View>
     </TouchableOpacity>
     

   
      </View>
 
     

    </View>
  )
}

const styles=StyleSheet.create({
  container:{
   flex:1,
   backgroundColor:"#E8EAED"
},
box1:{
  paddingTop:70,
  paddingHorizontal:40
},
sectiontitle:{
   fontSize: 24,
   fontWeight:"bold",
   paddingBottom:30,
   marginTop:10
  

},
items:{
  marginTop:1
},
inputbox:{
  flexDirection: "row",
  position:"absolute",
  top:10,
//  borderRadius:5,
//  backgroundColor:"#fff",
 alignItems:"center",
 justifyContent:"space-around",
 width:"100%"

},
input:{
  width:250,
  backgroundColor:"#fff",
  borderRadius:10,
  marginLeft:40,
  borderColor:"skyblue",
  borderWidth:2
 




},
addplus:{
  borderRadius:60,
  backgroundColor:"#fff",
  height:50,
  width:50,
  alignItems:"center",
  justifyContent:"center",
  borderColor:"skyblue",
  borderWidth:2

},
addtext:{
  fontSize:20,
  color:"skyblue"
}


})


export default Todo