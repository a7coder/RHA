import { StatusBar } from "expo-status-bar";

import { NavigationContainer } from "@react-navigation/native";

import Loading from "./screens/Loading";

import { useFonts } from "expo-font";
import { useKeepAwake } from "expo-keep-awake";

import Navigation from "./navigation/StackNavigate";



function Root() {
  useKeepAwake();
  return (
    <NavigationContainer>
      <StatusBar style="light" backgroundColor="#1a1015" />
      <Navigation />
    </NavigationContainer>
  );
}

export default function App() {

  let [font] = useFonts({
    Gaming: require("./assets/fonts/PressStart2P-Regular-Gaming.ttf"),
    Future: require("./assets/fonts/Future.otf"),
    Timer: require("./assets/fonts/DS-DIGIB.ttf"),
    
  });

  if (!font) {
    
    return <Loading />;
  } else {
   
    return <Root  />;
  }
}

