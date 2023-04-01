import {
  Vibration,
  TextInput,
  ImageBackground,
  Text,
  View,
  Image,
  Pressable,
  KeyboardAvoidingView,
} from "react-native";

import { StyleSheet } from "react-native";

import * as ImagePicker from "expo-image-picker";

import { useState } from "react";

import { useNavigation } from "@react-navigation/native";

import * as MediaLibrary from "expo-media-library";

import { PlayNxtAudio } from "../utils/all_audio";

export default function Ask_Player_Name() {
  const [image1, setImage1] = useState(require("../assets/img/images.png"));
  const [image2, setImage2] = useState(require("../assets/img/images1.png"));

  const nextIcon = require("../assets/img/next.png");
  const preIcon = require("../assets/img/previous.png");

  const first_label_name = "First Player Name";
  const second_label_name = "Second Player Name";

  const [first_player_name, setFirstPlayerName] = useState("Player1");
  const [second_player_name, setSecondPlayerName] = useState("Player2");

  const [turn, setTurn] = useState(true);

  const pickImage = async () => {
    
   
    let result = await ImagePicker.launchImageLibraryAsync({
      // mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      // aspect: [4, 3],
      quality: 1,
    });

   

    if (!result.canceled && turn) {
      setImage1({ uri: result.assets[0].uri });
    } else if (!result.canceled && !turn) {
      setImage2({ uri: result.assets[0].uri });
    }
  };

  const openCamera = async () => {
    Vibration.vibrate([ 50, 90])
  
    let result = await ImagePicker.launchCameraAsync({
      // mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      // aspect: [4, 3],
      quality: 1,
    });


    if (!result.canceled && turn) {
      setImage1({ uri: result.assets[0].uri });
      MediaLibrary.saveToLibraryAsync(result.assets[0].uri);
    } else if (!result.canceled && !turn) {
      setImage2({ uri: result.assets[0].uri });
      MediaLibrary.saveToLibraryAsync(result.assets[0].uri);
    }
  };

  async function next() {
    Vibration.vibrate([ 50, 90])
  const sound = await PlayNxtAudio()
  setTimeout(()=>{sound.unloadAsync()},600) 
    if (first_player_name.length && second_player_name.length) {
      setTurn(!turn);
    } else {
      alert("Enter Name");
    }
  }

  const navigation = useNavigation();

  async function goToGame() {
    Vibration.vibrate([ 50, 90])
  const sound = await PlayNxtAudio()
  setTimeout(()=>{sound.unloadAsync()},600) 
    // setTurn(true)
    if (second_player_name.length) {

      navigation.navigate("Game", {
        'play':1,
        FirstPlayer: {
          name:first_player_name,
          image:image1,
        },
        SecondPlayer: {
         name:second_player_name,
          image:image2,
        },
      });
      
    } else {
      alert("Enter Name");
    }
  }

  return (
    <ImageBackground
      source={require("../assets/img/1.png")}
      style={styles.con1}
    >
      <KeyboardAvoidingView behavior="height" style={styles.con}>
        <View style={styles.test}>
          {/* ******************************************Camera Icon**********************************  */}
          <View style={styles.cameraPos}>
            <Pressable
              onPress={openCamera}
              style={({ pressed }) =>
                !pressed
                  ? [styles.cameraPress]
                  : [styles.cameraPress, styles.nxtShadow]
              }
            >
              <Image
                source={require("../assets/img/camera.png")}
                style={styles.cameraImg}
              />
            </Pressable>
          </View>

          {/* ******************************User Image************************ */}
          <View style={styles.imgPos}>
            <Pressable
              onPress={pickImage}
              style={({ pressed }) =>
                !pressed ? [styles.press] : [styles.press, styles.shadow]
              }
            >
              <Image source={turn ? image1 : image2} style={styles.img} />
            </Pressable>
          </View>

    {/* ************************************************User Info************************************ */}
          <View style={styles.info}>
            <Text style={styles.label}>
              {turn ? first_label_name : second_label_name}
            </Text>

            <TextInput
              style={styles.txt}
              maxLength={10}
              cursorColor="red"
              selectionColor="#9370DB"
              onChangeText={(text) => {
                text = text.trim();
                if (turn) {
                  setFirstPlayerName(text);
                } else {
                  setSecondPlayerName(text);
                }
              }}
              value={turn ? first_player_name : second_player_name}
            />
          </View>

          {/* ***************************NExt Button**************************** */}
          <View style={styles.center_button}>
            <View style={styles.imgPos}>
              <Pressable
                onPress={next}
                style={({ pressed }) =>
                  !pressed
                    ? [styles.nxtPress]
                    : [styles.nxtPress, styles.nxtShadow]
                }
              >
                <Image
                  source={turn ? nextIcon : preIcon}
                  style={styles.nxtImg}
                />
              </Pressable>
            </View>
{/* *****************************For Second Player Next To go to Game Screen ************************** */}
            {!turn && (
              <View style={styles.imgPos}>
                <Pressable
                  onPress={goToGame}
                  style={({ pressed }) =>
                    !pressed
                      ? [styles.nxtPress]
                      : [styles.nxtPress, styles.nxtShadow]
                  }
                >
                  <Image source={nextIcon} style={styles.nxtImg} />
                </Pressable>
              </View>
            )}
          </View>
        </View>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  con: {
    flex: 1,
    position: "relative",
    // marginTop:StatusBar.currentHeight,
  },
  test: {
    // paddingTop: 49,
    flex: 1,
    justifyContent: "center",
    // marginTop:150
  },
  con1: {
    flex: 1,
  },
  txt: {
    fontSize: 36,
    fontFamily: "Future",
    // height: 100,
    borderWidth: 7,
    width: "100%",
    backgroundColor: "#2f192e",
    color: "#ff8100",
    paddingHorizontal: 70,
    borderBottomColor: "#6f3e6f",
    borderRadius: 1000,
    paddingVertical: 4,
    textAlign: "center",
  },
  label: {
    fontSize: 16,
    color: "#00c0ff",
    fontFamily: "Gaming",
    marginBottom: 30,
    letterSpacing: 1.5,
    textAlign: "center",
    lineHeight: 29,
  },
  img: {
    width: 200,
    height: 200,
    borderRadius: 1000,
    // padding:90,
  },
  nxtImg: {
    width: 100,
    height: 100,
    borderRadius: 1000,
  },

  imgPos: {
    alignItems: "center",
  },
  info: {
    paddingHorizontal: 27,
    justifyContent: "center",
    marginTop: 57,
  },
  press: {
    borderWidth: 7,
    borderColor: "#D2691E",
    borderRadius: 1000,
    backgroundColor: "#CD853F",

    // backgroundColor:'red',
    padding: 20,
  },

  nxtPress: {
    borderWidth: 7,
    borderColor: "#100c08",
    borderRadius: 1000,
    backgroundColor: "#36454f",
  },

  nxtShadow: {
    opacity: 0.7,
    shadowColor: "black",
    elevation: 20,
    backgroundColor: "#0e3361",
    borderColor: "#0e3361",
    borderRadius: 1000,
  },

  shadow: {
    opacity: 0.7,
    shadowColor: "black",
    elevation: 20,
    backgroundColor: "#0e3361",
    borderColor: "#0e3361",
    borderRadius: 1000,
  },
  center_button: {
    // alignItems:'center',
    justifyContent: "center",
    flexDirection: "row",
  },
  cameraImg: {
    height: 50,
    width: 50,
  },
  cameraPos: {
    alignItems: "center",
    top: 27,
    zIndex: 3,
    right: -120,
  },
  cameraPress: {
    borderWidth: 7,
    backgroundColor: "#ED9121",
    borderColor: "#FFA836",
    borderRadius: 1000,
  },
});
