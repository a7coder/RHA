
import { Pressable,Image } from "react-native";
import { StyleSheet } from "react-native";


export default function Close(props)
{
    return (

        <Pressable
      onPress={props.onPress}
      style={({ pressed }) =>
        !pressed
          ? [styles.con]
          : [ styles.con,styles.shadow]
      }
      {...props.style}
      
    >
      <Image style={styles.img} source={require("../assets/img/cross.png")} />
    </Pressable>
  );
    
}

const styles = StyleSheet.create({
    con: {
      borderWidth: 1,
      borderRadius: 100,
      borderColor: "#4c8ad6",
      backgroundColor: "#4c8ad6",
      width: 50,
      
     
    },
    img: {
      width: '100%',
      height: 50,
    },
    shadow:{
      opacity:0.8,
      shadowColor:'black',
      elevation:20,
      backgroundColor:'#0e3361',
      borderColor: "#0e3361",
    }
  });
  