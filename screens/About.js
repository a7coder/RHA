import { Vibration,  Text, Alert,ImageBackground, View, Modal,StatusBar,BackHandler,StyleSheet,Image  } from "react-native";
import HomeButton from "../components/HomeButton";


export default function About({navigation}){
    return (
        <ImageBackground
      source={require("../assets/img/3.png")}
      style={styles.container}
    >
        <Image style={styles.img} source={require("../assets/img/icon.png")} />
            <Text style={styles.vtxt}>Version 1.0.0</Text>
            <Text style={styles.htxt}>Developed with ❤️</Text>
            <Text style={styles.btxt}> By A7Coder</Text>
            <HomeButton style={styles.homeBtn} />
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 100,
        position: "relative",
        marginTop:StatusBar.currentHeight,
      },

    homeBtn: {
        position: "absolute",
        top: "16%",
        right: "80%",
        width: "100%",
      },
      vtxt:{
        color:'#7FFFD4',
        fontSize:10,
        marginTop:-40,
        fontFamily:"Gaming",
        marginBottom:20,
        letterSpacing:0.7,
        lineHeight:25,
        textAlign:'center',
        textShadowColor:'green',
        textShadowOffset:{ width:50, height: 50},
        textShadowRadius:50,
    
      },
      htxt:{
        color:'#ffdd00',
        fontSize:12,
        fontFamily:"Gaming",
        marginBottom:10,
        letterSpacing:0.7,
        lineHeight:25,
        textAlign:'center',
        textShadowColor:'green',
        textShadowOffset:{ width:50, height: 50},
        textShadowRadius:50,
    
      },
      img: {
        width: '100%',
        height: 400,
      },
      btxt:{
        color:'#ffffff',
        fontSize:12,
        fontFamily:"Gaming",
        marginBottom:20,
        letterSpacing:0.7,
        lineHeight:25,
        textAlign:'center',
        textShadowColor:'green',
        textShadowOffset:{ width:50, height: 50},
        textShadowRadius:50,
    
      },
})