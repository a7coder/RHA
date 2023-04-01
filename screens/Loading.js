import { ImageBackground,StyleSheet } from "react-native";

export default function Loading() {
  return (
    
      <ImageBackground source={require('../assets/img/logo.gif')} style={styles.img}/>
      
  );
}

const styles=StyleSheet.create({
 
  img:{
    // flex:1,
    width:'100%',
    height:'100%',
    justifyContent:'center',
    alignItems:'center',
    // backgroundColor:'red'

  }
})