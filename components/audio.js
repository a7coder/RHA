
import {Vibration, Pressable,Image } from "react-native";
import { StyleSheet } from "react-native";

import { useState,useEffect } from "react";



import { Audio } from 'expo-av';



export default function AudioBtn(props)
{

  const [sound, setSound] = useState();
  async function PlayAudio(){
  
    const { sound } = await Audio.Sound.createAsync(require('../assets/audio/background.mp3'))
   
    await sound.playAsync();
    await sound.setIsLoopingAsync(true) 
    setSound(sound);
      
  }


  useEffect(() => {
    
    PlayAudio()
  }, []);


  const [icon,setIcon]=useState(true)

   async function handle(){
    Vibration.vibrate([70, 100, 120])
    if(icon){
    await  sound.setIsMutedAsync(true)
  }
    else{
      await  sound.setIsMutedAsync(false)
    }
    
    setIcon(!icon);

  }

  

let Img;
if(icon){
  Img =  <Image style={styles.img} source={require('../assets/img/audio.png')} />
}
else{
  Img=<Image style={styles.img} source={require('../assets/img/audio-mute.png')} />}

  
    return (

        <Pressable
      onPress={handle}
      style={({ pressed }) =>
        !pressed
          ? [styles.con]
          : [ styles.con,styles.shadow]
      }
      {...props.style}
      
    >
     
    
{Img}
      
    </Pressable>
  );
    
}

const styles = StyleSheet.create({
    con: {
      // borderWidth: 1,
      borderRadius: 100,
      // borderColor: "#3B444B",
      backgroundColor: "#3B444B",
      width: 60,
      
     
    },
    img: {
      width: '100%',
      height: 60,
    },
    shadow:{
      opacity:0.8,
      shadowColor:'black',
      elevation:20,
      backgroundColor:'#848482',
      // borderColor: "#848482",
    }
  });
  