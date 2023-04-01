import { Vibration,  Text, Alert,ImageBackground, View, Modal,StatusBar,BackHandler  } from "react-native";
import { StyleSheet } from "react-native";

import { useState,useEffect } from "react";

import MyButton from "../components/button";
import HomeButton from "../components/HomeButton";
import Help from "../components/help";
import Close from "../components/close";
import AudioBtn from "../components/audio";

import { LinearGradient } from "expo-linear-gradient";

import { PlayNxtAudio,PlayHelpAudio } from "../utils/all_audio";

export default function Welcome({ navigation,route }) {
  
  const [modalVisible, setModalVisible] = useState(false);
  

  function handleBackButtonClick() {
 
    Alert.alert(
      'Exit App',
      'Close The App?', [{
          text: 'Cancel',
          // onPress: () => console.log('Cancel Pressed'),
          style: 'cancel'
      }, {
          text: 'OK',
          onPress: () =>BackHandler.exitApp()
      }, ], {
          cancelable: false
      }
   )
   
   return true;
    
  }

  useEffect(() => {
    
   

    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => {
      
      
        BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
    };
  }, []);


// ************************Navigate Function *******************************

async function handle(navigation) {
  Vibration.vibrate([ 50, 90])
  const sound = await PlayNxtAudio()
  setTimeout(()=>{sound.unloadAsync()},600)  
  
   navigation.navigate("PlayerName");
  }
  
  return (
    
    <ImageBackground
      source={require("../assets/img/a.png")}
      style={styles.container}
    >

      {/* ****************  Modal************************  */}

      <Modal
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >

      <LinearGradient
        
        colors={["#b476f7", "black"]} 
        style={styles.modal}
        end={{ x: 0.5, y: 0.5 }}
        start={{ x: 0.2, y: 0.3 }}
      >

        <ImageBackground
      source={require("../assets/img/a.png")}
      style={styles.inscon}
    >
        <Close style={styles.close} onPress={()=>{Vibration.vibrate([30, 50, 90],setModalVisible(false));
          }}
          />
<View style={styles.center}>
          <Text style={styles.rule}>Rules</Text>
          <Text style={styles.text}>1.A Number Will be given to you.Either you will take it or let it go</Text>
          <Text style={styles.text2}>2.The player which get points greater than or equal to 100 Wins</Text>

          </View>

          </ImageBackground>
      
      </LinearGradient>
      
      </Modal>


{/************************************ Navigation Btn ************************* */}
      <HomeButton style={styles.homeBtn} />

{/* /*****************************Play Btn ***************************** */ }
      <View style={styles.pos}>
        <Text style={styles.txt}>Welcome</Text>
      </View>

      <MyButton onPress={handle.bind(this, navigation)} style={styles.mybtn}>
        Play
      </MyButton>

{/* **************************************Audio Btn******************* */}
<AudioBtn style={styles.audi}/>

      <Help
        style={styles.help}
        onPress={async () => {
          Vibration.vibrate([ 50, 90])
          const sound = await PlayHelpAudio()
          setTimeout(()=>{sound.unloadAsync()},600)
          setModalVisible(!modalVisible);
         
        }}
      />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 100,
    position: "relative",
    marginTop:StatusBar.currentHeight,
  },
  mybtn: {
    backgroundColor: "red",
    position: "absolute",
    top: "70%",
    right: "7%",
    width: "75%",
  },
  homeBtn: {
    position: "absolute",
    top: "16%",
    right: "80%",
    width: "100%",
  },
  pos: { position: "absolute", top: "37%", right: "8%" },
  txt: {
    fontFamily: "Future",
    fontSize: 64,
    color: "#0ca3a3",
  },
  help: {
    position: "absolute",
    top: "115%",
    right: "38%",
    width: "100%",
  },
  modal:{flex:1},
 
  close:{
    position: "absolute",
    right: "47%",
    width: "100%",
    top:'12%',
  },
  inscon:{
    opacity:0.5,
    paddingTop: 30,
flex:1,

  },
  center:{
  
    position: "absolute",
    // right: "47%",
    // width: "100%",
    top:'23%',
    alignItems:'center',
    padding:10
  },
  
  rule:{
    color:'red',
    fontSize:16,
    fontFamily:"Gaming",
    marginBottom:20,
    letterSpacing:0.7,
    lineHeight:25,
    textAlign:'center',
    textShadowColor:'green',
    textShadowOffset:{ width:50, height: 50},
    textShadowRadius:50,

  },
  text:{
    color:'#7FFFD4',
    fontSize:16,
    fontFamily:"Gaming",
    marginBottom:20,
    letterSpacing:0.7,
    lineHeight:25,
    textAlign:'center',
    textShadowColor:'green',
    textShadowOffset:{ width:50, height: 50},
    textShadowRadius:50,


  },
  text2:{
    color:'#FFFF00',
    fontSize:16,
    fontFamily:"Gaming",
    marginBottom:20,
    letterSpacing:0.7,
    lineHeight:25,
    textAlign:'center',
    textShadowColor:'green',
    textShadowOffset:{ width:50, height: 50},
    textShadowRadius:50,

  },
  audi:{
   
    position: "absolute",
    top: "16%",
    right: "7%",
    width: "100%",
  }
});
