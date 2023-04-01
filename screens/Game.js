import {
  Alert,
  Text,
  View,
  StyleSheet,
  Image,
  ImageBackground,
  StatusBar,
  Pressable,
  Vibration,
  BackHandler 
} from "react-native";

import { useRoute,useNavigation } from "@react-navigation/native";

import { useState ,useEffect} from "react";

import { PlayLeaveAudio,PlayMoneyAudio,PlayTimeOutAudio} from "../utils/all_audio";


export default function Game() {

  const [turn, setTurn] = useState(true);

  

  const [firstScore, setFirstScore] = useState(0);
  const [secondScore, setSecondScore] = useState(0);
  
  const navigation=useNavigation();
  const route = useRoute();

  const {play,FirstPlayer, SecondPlayer } = route.params;
  
  const image1 = FirstPlayer.image;
  const image2 = SecondPlayer.image;
  const name1 = FirstPlayer.name;
  const name2 = SecondPlayer.name;

  
  const [playing, setPlaying] = useState(true);



 
  
  function handleBackButtonClick() {
    setPlaying(false)
    Alert.alert(
      'Exit Game',
      'Do you want to Exit?', [{
          text: 'Cancel',
          onPress: () => setPlaying(true),
          style: 'cancel'
      }, {
          text: 'OK',
          onPress: () =>{ 
            navigation.navigate('Drawer')
          }
      }, ], {
          cancelable: false
      }
   )
   
   return true;
    
  }

  const [timeoutSound,setTimeoutSound]=useState('')

  const TimeoutSound =async ()=>
  {
    const  sound  = await PlayTimeOutAudio()
    
    setTimeoutSound(sound)
    
  }
  async function Play()
  {
    
    await  timeoutSound.playAsync()
  }
  
  
  useEffect(() => {
    
    TimeoutSound()

    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => {
      
      if(timeoutSound){
      
        timeoutSound.unloadAsync()}
        
        BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
    };
  }, [playing]);

  // **************************************Generate Random Number function*****************************

  function generate_random_numbers(){
    const p=Math.random()
    if(p>=0.5)
    {
      return Number.parseInt(Math.random()*10)
      
    }
    return Number.parseInt(Math.random()*(-10))
  }




  const [randomNumbers, setRandomNumbers] = useState({
    number1: 0,
    number2: 0,
  });
  
  useEffect(() => {
    setRandomNumbers({
      number1: generate_random_numbers(),
      number2: generate_random_numbers(),
    });
  }, [turn]);




  // **************************************Handle Timer function*****************************
   const Timer = ()=>
  { 
     const [timer, setTimer] = useState(7);


useEffect(() => {
  
  setInterval(() => {
    setTimer((timer)=>timer-1)
  }, 1000);
}, [turn])

useEffect(()=>{
if (timer==3) {

  Play()
  
}
  if(timer==-1)
  {

    if(timeoutSound){
   
    timeoutSound.unloadAsync()}
  TimeoutSound()
   setTurn(!turn)
  }
},[timer])

    return (
      
      <View style={styles.timer}>
        <Text style={styles.txt}>{timer}</Text>
        <View style={styles.secCon}>
          <Text style={styles.sec}>s</Text>
        </View>
      </View>
    )
    
  
  }
  


// **************************************Handle User Image function*****************************

  function handleUserImg() 
  {

  }
// **************************************Add function*****************************
   async function add() {
    Vibration.vibrate([ 50, 90])
    timeoutSound.unloadAsync()
    TimeoutSound()
  const sound = await PlayMoneyAudio()
  setTimeout(()=>{sound.unloadAsync()},600) 
    if(turn)
    {
      setFirstScore((score)=>score+randomNumbers.number1)
    }
    else{
      setSecondScore((score)=>score+randomNumbers.number2)
    }
    setTurn((!turn))
    

  }
// **************************************Leave function*****************************
  async function leave() {
    Vibration.vibrate([ 50, 90])
    timeoutSound.unloadAsync()
    TimeoutSound()
  const sound = await PlayLeaveAudio()
  setTimeout(()=>{sound.unloadAsync()},600) 
    setTurn((!turn));
  
    
  }

  useEffect(()=>{

    if(firstScore>=100 )
    {
       
        setFirstScore(0)
        setSecondScore(0)
        setTurn(true)
        
        setPlaying(false)
        navigation.navigate('Win',{
        
          first:{
          name1:name1,
          image1:image1
        },
        second:{
          name2:name2,
          image2:image2
        },
        Winner:{
          name:name1,
          image:image1
        },
    
    
    
        })
        
        
      }
      if(secondScore>=100)
      {
       
        setPlaying(false)
        setFirstScore(0)
        setSecondScore(0)
        setTurn(true)
       
        navigation.navigate('Win',{
         
          Winner:{
            name:name2,
            image:image2
          },
          first:{
            name1:name1,
            image1:image1
          },
          second:{
            name2:name2,
            image2:image2
          },
          
    
        })
      }

  },[firstScore,secondScore])

useEffect(()=>{
 
   setPlaying(true)
  
   
},[play])



  return (
    <ImageBackground
      source={require("../assets/img/4.png")}
      style={styles.con}
    >
      
      {/* // ************************************** Timer ***************************** */}

     {playing && <Timer/>}
      

<View style={styles.user_img_score_pos}>

{/* ***********************************User Image****************************************** */}

<View style={styles.img_pos}>
        <Pressable
          onPress={handleUserImg}
          style={({ pressed }) =>
            !pressed ? [styles.press] : [styles.press, styles.shadow]
          }
        >
          <Image source={turn ? image1 : image2} style={styles.img} />
        </Pressable>
  
        </View>


{/* *******************************Your Score ************************ */}

<View style={styles.score_con}>
        <Text style={styles.score_label}>Score:</Text>
        <Text style={styles.score}>{turn?firstScore:secondScore}</Text>
      </View>
      

      </View>


      {/* *******************************Your Number ************************ */}

      <View style={styles.your_num_con}>
        <Text style={styles.your_num}>Your Number</Text>
      </View>

      <View style={styles.place_num}>

        <Text style={styles.num}>{turn?randomNumbers.number1:randomNumbers.number2}</Text>
       
      </View>

      <View style={styles.alignBtn}>
   {/* ****************************************Leave Button**************************************** */}

   <Pressable
          onPress={leave}
          style={({ pressed }) =>
            !pressed ? [styles.leave] : [styles.leave, styles.shadowBox]
          }
        >
          <Image
            source={require("../assets/img/leave.png")}
            style={styles.add_leave_img}
          />
        </Pressable>
       

      {/* ****************************************ADD Button**************************************** */}
      <Pressable
        onPress={add}
        style={({ pressed }) =>
          !pressed ? [styles.add] : [styles.add, styles.shadowBox]
        }
      >
        <Image
          source={require("../assets/img/add.png")}
          style={styles.add_leave_img}
        />

      </Pressable>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  con: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
    position: "relative",
    
  },

  timer: {
    borderWidth: 2,
    backgroundColor: "#330547",
    position: "absolute",
    top: 34,
    flexDirection: "row",
    marginLeft:7,
    borderRadius:20,
    borderTopColor:'orange',
    borderBottomColor:'green',
    borderRightColor:'blue',
    borderLeftColor:'violet',
    padding:10,
    width:90,
    height:90,
    justifyContent:'center',
    alignItems:'center',
    // paddingHorizontal:10
    
  },
  txt: {
    color: "white",
    fontSize: 40,
    fontFamily: "Timer",
    textAlign:'center',
    // flex:1,
    // flexShrink:0
    
  },

  secCon: {
    // flex:1,
    marginLeft:3,
    alignSelf: "flex-end",
  },
  sec: {
    fontSize: 17,
    fontFamily: "Timer",
    color: "white",
    // textAlign: "center",
    
  },
  img: {
    width: 50,
    height: 50,
    borderRadius:1000,
  },
img_pos:{
  alignSelf:'flex-end',
  marginRight:20,
},
  press: {
    borderWidth: 4,
    // borderColor: "#D2691E",
    borderRadius: 1000,
    backgroundColor: "#dc9800",
    padding: 7,
    // borderTopColor:'red',
    borderBottomColor:'green',
    borderRightColor:'white',
    // borderLeftColor:'red',
  },
  add_leave_img: {
    width: 120,
    height: 120,
  },
  add: {
    borderWidth: 3,
    borderColor: "#067b00",
    borderRadius: 10,
    backgroundColor: "#31d629",
    padding: 5,
    
  },
  leave: {
    borderWidth: 3,
    borderColor: "#b35307",
    borderRadius: 10,
    backgroundColor: "#e16909",
    padding: 5,
  },
  shadow: {
    opacity: 0.7,
    shadowColor: "black",
    elevation: 20,
    backgroundColor: "#0e3361",
    borderColor: "#0e3361",
    borderRadius: 1000,
  },
  shadowBox:{
    opacity: 0.7,
    shadowColor: "black",
    elevation: 20,
    backgroundColor: "#0e3361",
    borderColor: "#0e3361",
    borderRadius: 10,
  },
  your_num_con: {
    backgroundColor: "#225c67",
    top: "25%",
    borderWidth: 2,
    position:'absolute',
    // justifySelf:'center',
    alignSelf:'center',
    borderRadius:20,
    borderColor:'#1aacc7',
    padding:12,
  },
  your_num: {
    fontSize: 20,
    fontFamily: "Gaming",
    textAlign: "center",
    color: "white",
    padding: 12,
  },

  addImg: {
    width: 70,
    height: 70,
    
  },

  alignBtn: {
    justifyContent: "space-around",
    flexDirection: "row",
    top: "73%",
    position:'absolute',
    
  //  backgroundColor:'red',
    width:'100%'
  },
  num: {
    fontSize: 37,
    fontFamily: "Gaming",
    textAlign: "center",
    color: "#b2f0ff",
    borderRadius:25,
    paddingTop:10,
    marginBottom:-15
   
  },

  place_num: {
  
    borderWidth: 25,
    position:'absolute',
    alignSelf:'center',
    top: "44%",
    padding:15,
    borderRadius:20,
    
    backgroundColor:'#002730',
   
    borderTopColor:'orange',
    borderBottomColor:'green',
    borderRightColor:'blue',
    borderLeftColor:'red',

    width:200,
    height:155,

  },

  score_con:{
      backgroundColor:'white',
      // borderWidth:3,
      flexDirection:'row',
      // justifyContent:'space-around',
      marginTop:7,
      alignSelf:'flex-end',
      padding:7,
      borderBottomWidth:3,
      borderTopWidth:3,
      borderTopColor:'violet',
      borderBottomColor:'green',


  },
  score_label:{
    fontFamily:'Gaming',
    fontSize:10,
    marginRight:5
  

  },
  score:{
    fontFamily:'Gaming',
    fontSize:10,
  },
  user_img_score_pos:{
    top: 30,
    marginRight:7,
  
  }

});
