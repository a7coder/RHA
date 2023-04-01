import { StyleSheet, Image } from "react-native";

import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
} from "@react-navigation/drawer";

import Welcome from "../screens/Welcome";
import About from "../screens/About";

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItem
        label="Home"
        onPress={() => props.navigation.navigate("Home")}
        icon={({ focused, color, size }) => (
          <Image source={require("../assets/img/home.png")} style={styles.img} />
        )}
        labelStyle={styles.label}
        style={styles.drawerItem}
      />

      <DrawerItem
        label="About"
        onPress={() => props.navigation.navigate("About")}
        icon={({ focused, color, size }) => (
          <Image source={require("../assets/img/about.png")} style={styles.img} />
        )}
        style={styles.drawerItem}
        labelStyle={styles.label}
      />
    </DrawerContentScrollView>
  );
}

export default function MyDrawer() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          backgroundColor: "#561031",
          width: "70%",
          paddingVertical: 70,
        },
      }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen
        name="Home"
        component={Welcome}
      />

      <Drawer.Screen
        name="About"
        component={About}
      />
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  img: {
    width: 55,
    height: 55,
  },
  
  drawerItem: {
    backgroundColor: "#F0E68C",
    marginBottom: 35,
    padding: 7,
    width: "100%",

  },
  label: {
    fontSize: 28,

    fontFamily: "Future",
  },
});
