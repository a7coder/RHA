import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MyDrawer from "./MyDrawer";

import Ask_Player_Name from "../screens/Ask_Player_Name";
import Game from '../screens/Game';
import Win from '../screens/Win';


const Stack = createNativeStackNavigator();


export default function Navigation() {

 

    return (
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen
          name="Drawer"
          component={MyDrawer}
       
        />
  
        <Stack.Screen
          name="PlayerName"
          component={Ask_Player_Name}
        
        />

        <Stack.Screen
          name="Game"
          component={Game}
         
        />

        <Stack.Screen
          name="Win"
          component={Win}
          
        />
      </Stack.Navigator>
    );
  }