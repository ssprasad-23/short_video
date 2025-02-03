import React from "react";
import {View, FlatList} from "react-native";
import Post from "../../components/Post";
import { StatusBar } from "react-native";

import posts from "../../data/posts";



const Home = () => {
  return (
    <View>
      <StatusBar hidden={true}/>
      <FlatList
        data={posts}
        renderItem={({item}) => <Post post={item} />}>
      </FlatList>
    </View>
  );
}

export default Home;