import { Vibration, Pressable, Image } from "react-native";
import { StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { PlayGameMenuAudio } from "../utils/all_audio";

export default function HomeButton(props) {
  const navigation = useNavigation();

  async function handle() {
    Vibration.vibrate([40, 80]);
    const sound = await PlayGameMenuAudio()
  setTimeout(()=>{sound.unloadAsync()},600) 
    navigation.openDrawer();
  }

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
      <Image style={styles.img} source={require("../assets/img/rocket.png")} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  con: {
    borderWidth: 2,
    borderRadius: 140,
    borderColor: "#e2264b",
    backgroundColor: "#e2264b",
    width: 70,
    
   
  },
  img: {
    width: '100%',
    height: 70,
  },
  shadow:{
    opacity:0.7,
    shadowColor:'black',
    elevation:20,
    backgroundColor:'#3a0812',
    borderColor: "#3a0812",
  }
});
