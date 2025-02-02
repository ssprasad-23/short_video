import React from "react";
import {View} from "react-native";
import Post from "../../components/Post";
import { StatusBar } from "react-native";
import Video from "react-native-video";

const post1 = {
  id: 'p1',
  user: {
    id: 'u1',
    username: 'Shynal usernmae',
    imageUri: "https://gratisography.com/wp-content/uploads/2024/11/gratisography-augmented-reality-800x525.jpg",

  },
  description: 'Shynal Prasad Production description',
  song: "shy rock band song",
  likes: 100,
  share: 69,
  videoUri: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
            // 'https://assets.mixkit.co/videos/1259/1259-720.mp4'
            // 'https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4'
}  



const Home = () => {
  return (
    <View>
      <StatusBar hidden={true}/>
      <Post post={post1}/>
    </View>
  );
}

export default Home;