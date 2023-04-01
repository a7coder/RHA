
import { View,Text,Image,ImageBackground ,StatusBar,Pressable, Vibration,} from "react-native"

import { BackHandler } from 'react-native';

import { useEffect,useState } from "react";

import { useRoute,useNavigation } from "@react-navigation/native";

import { StyleSheet } from "react-native";

import { PlayApplauseAudio,PlaySuccessAudio,PlayRestartAudio } from "../utils/all_audio";

export default function Win()
{
  const [sound1, setSound1] = useState();
  const [sound2, setSound2] = useState();

    const route=useRoute()

    const {Winner,first,second}= route.params
    
    const {name,image}= Winner
    const {name1,image1}= first
    const {name2,image2}= second

    const navigation=useNavigation()
    
    function handleBackButtonClick() {
        navigation.navigate('Drawer')
        return true
      }

    const PlayAllSound = async () => {
        const sound1 = await PlaySuccessAudio()
        const sound2 = await PlayApplauseAudio()
        // console.log(sound1,sound2)
        setSound1(sound1)
        setSound2(sound2)
      }


  async function restart()
  {

    // console.log(sound1,sound2)
    sound1.unloadAsync()
    sound2.unloadAsync()
   
    Vibration.vibrate([50, 90]);
    const sound = await PlayRestartAudio()
    setTimeout(()=>{sound.unloadAsync()},600)  
  
  navigation.navigate('Game',{
    'play':Math.random()*1000000+2+Math.random(),
    FirstPlayer:{
      name:name1,
      image:image1

    },
    SecondPlayer:{
      name:name2,
      image:image2

    }

  })
      }
    


      useEffect( () => {

     
        PlayAllSound()
        
        BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
        return () => {
          BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);

          
        };
      }, []);
    
    return (
<ImageBackground source={require('../assets/img/game.png')} style={styles.con}>


 {/* *********************************************Crown IMage********************************** */}
 <Image source={require('../assets/img/prize.png')} style={styles.crown}/>


{/* ******************************************Player Image************************************* */}
<View style={styles.player_img_con}>
    <Image source={image} style={styles.img}/>
    </View>

  {/* ******************************************Player Name************************************* */}
      <View style={styles.name_con}>
    <Text  style={styles.name}>{name}</Text>
    </View>
   


    {/* // ***************************************Restart Button************************** */}
   
    <Pressable
          onPress={restart}
          style={({ pressed }) =>
            !pressed ? [styles.restart] : [styles.restart, styles.shadowBox]
          }
        >
          <Image
            source={require("../assets/img/restart.png")}
            style={styles.restart_img}
          />
        </Pressable>

    {/* ******************************Trophy Images********************************* */}

    <Image source={require('../assets/img/trophy.png')} style={[styles.trophy,styles.trophy1,]}/>

    <Image source={require('../assets/img/trophy.png')} style={[styles.trophy,styles.trophy2]}/>

    
</ImageBackground>



    )

}

const styles=StyleSheet.create({
  con: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
    position: "relative",
    
  },
  crown:{
    width:140,
    height:140,
    top:47,
    position:'absolute',
    alignSelf:'center',
    zIndex:5,
  },
  name:{
    fontFamily:'Gaming',
    fontSize:20,
    color:'white',
    textAlign:'center'

  },
  name_con:{
    top:'55%',
    alignSelf:'center',
    position:'absolute',
    borderTopWidth: 4,
    borderBottomWidth: 4,
  borderColor: "#7DF9FF",
  borderRadius: 1000,
  backgroundColor: "#082567",
  padding: 10,
  width:350,
  },
  img:{
    width:200,
    height:200,
    borderRadius: 1000,
    
  },
  player_img_con:{
    borderWidth: 7,
    borderColor: "white",
    borderRadius: 1000,
    backgroundColor: "#002147",
    padding: 20,
    alignSelf:'center',
    position:'absolute',
    top:'20%',
  },

  restart_img:{
    width:120,
    height:120,
    // position:'absolute',
    // top:'90%'
  },
restart:{
  borderWidth: 7,
  borderColor: "#0a6c0a",
  borderRadius: 1000,
  backgroundColor: "#549954",
  padding: 2,
  position:'absolute',
  top:'70%',
  alignSelf:'center',
},

  shadowBox:{
    opacity: 0.7,
    shadowColor: "black",
    elevation: 20,
    backgroundColor: "#0e3361",
    borderColor: "#0e3361",
    borderRadius: 1000,
  },
  trophy:{
    width:110,
    height:110,
    top:"80%",
    position:'absolute'
  },
  trophy1:{
    alignSelf:"flex-start",
    transform: [
      { rotate: '30deg' },
    ],

  },
  trophy2:{
    alignSelf:'flex-end',
    transform: [
      { rotate: '-30deg' },
    ],
  }
})