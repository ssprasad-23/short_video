import React from "react";
import { useState } from "react";
import {View, Text, Image} from "react-native";
import Video from "react-native-video";
import styles from "./styles";
import { TouchableWithoutFeedback } from "react-native";
import Entypo from "react-native-vector-icons/Entypo";
import Ionicons from "react-native-vector-icons/Ionicons";

const Post = () => {
  const [paused, setPaused] = useState(false);
  const onPlayPausePress = () => {
    setPaused(!paused);
  }

  return (
    <View style = {styles.container}>
      <TouchableWithoutFeedback onPress={onPlayPausePress}>
        <Video
        style = {styles.video}
          // source = {{ uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4' }}
          source = {{ uri: 'https://assets.mixkit.co/videos/1259/1259-720.mp4' }}
          // source = {{ uri:'https://youtu.be/boH69MtbP4c'}}
          // source = {{ uri:'https://www.tiktok.com/@alodia/video/7358056700458323206.mp4'}}
          onError={(e) => console.log(e)}
          resizeMode = 'contain'
          repeat = {true}
          paused = {paused}
        />
      </TouchableWithoutFeedback>


      <View style = {styles.uiContainer}>
        <View style = {styles.rightContainer}>
          <View>
          <Entypo style = {styles.heart} name='heart' size={33}/>  
          </View>
          <Image style = {styles.profilePic} source={{ uri: 'https://gratisography.com/wp-content/uploads/2024/11/gratisography-augmented-reality-800x525.jpg'}} />
          <View>
            <Ionicons style = {styles.share} name='share-social-sharp' size={33}/>
          </View>
        </View>


        <View style = {styles.bottomContainer}>
          <Text style = {styles.handle}>@ Veyroot</Text>
          <Text style = {styles.description}>Shynal Prasad Production</Text>
          
          <View style={styles.songRow}>
            <Entypo name='beamed-note' size={23}/>
            <Text style = {styles.songName}> Song Name</Text>
          </View>
        </View>
      </View>

    </View>
  );
}

export default Post;
