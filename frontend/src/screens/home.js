import React from "react";
import {View, FlatList, Dimensions} from "react-native";
import Post from "../components/Post";
import { StatusBar } from "react-native";

import posts from "../data/sampledata";



const Home = () => {
  return (
    <View>
      <StatusBar hidden={false}/>
      <FlatList
        data={posts}
        renderItem={({item}) => <Post post={item} />}
        snapToInterval={Dimensions.get('window').height}
        snapToAlignment="start"
        decelerationRate="fast"
      >
      </FlatList>
    </View>
  );
}

export default Home;