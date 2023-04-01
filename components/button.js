import { Pressable, Text, Vibration} from "react-native";
import { StyleSheet } from "react-native";
// import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from "expo-linear-gradient";

export default function MyButton(props) {

  return (

    <Pressable
      onPress={()=>{
        Vibration.vibrate([30,50,90])
        props.onPress()}}
      style={({ pressed }) =>
        !pressed
          ? [props.style, styles.con]
          : [styles.opaq, props.style, styles.con]
      }
    {...props.style}
      
    >
      <LinearGradient
        // Button Linear Gradient
        colors={["#FFA52C", "#FFBF00"]} //orange ,yellow
        style={styles.grad}
        end={{ x: 0.5, y: 0.5 }}
        start={{ x: 0.3, y: 0 }}
      >
        <Text  style={[styles.btn,{...props}]}  >{props.children}</Text>
      </LinearGradient>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  con: {
    borderColor: "black",
    borderRadius: 100,
    marginHorizontal: 20,
    flexShrink: 1,
    elevation: 17,
  },
  grad: {
    padding: 10,

    borderRadius: 100,
  },
  btn: {
    padding: 15,
    color: "white",
    fontFamily: "Gaming",
    fontSize: 28,
   
    letterSpacing: 1.5,

    textAlign: "center",
  },
  opaq: {
    opacity: 0.9,
  },
});
