import React from "react";
import {View} from "react-native";
import Post from "../../components/Post";
import { StatusBar } from "react-native";


const Home = () => {
  return (
    <View>
      <StatusBar hidden={true}/>
      <Post/>
    </View>
  );
}

export default Home;