import React from "react";
import { useState } from "react";
import {View, Text, Image, TouchableOpacity} from "react-native";
import Video from "react-native-video";
import styles from "./styles";
import { TouchableWithoutFeedback } from "react-native";
import Entypo from "react-native-vector-icons/Entypo";
import Ionicons from "react-native-vector-icons/Ionicons";

const Post = (props) => {

  const [post, setPost] = useState(props.post);
  const [isLiked, setIsLiked] = useState(false);


  const [paused, setPaused] = useState(false);

  const onPlayPausePress = () => {
    setPaused(!paused);
  }

  const onLikePress = () => {
    const likesToAdd = isLiked ? -1 : 1;
    setPost({
      ...post,
      likes: post.likes + likesToAdd,
    });
    setIsLiked(!isLiked);
  }


  return (
    <View style = {styles.container}>
      <TouchableWithoutFeedback onPress={onPlayPausePress}>
        <Video
        style = {styles.video}
          source = {{ uri: post.videoUri }}
          // source = {{ uri: 'https://assets.mixkit.co/videos/1259/1259-720.mp4' }}
          // source = {{ uri: 'https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4' }}
          onError={(e) => console.log(e)}
          resizeMode = 'cover'
          repeat = {true}
          paused = {paused}
        />
      </TouchableWithoutFeedback>


      <View style = {styles.uiContainer}>
        <View style = {styles.rightContainer}>
          <TouchableOpacity onPress={onLikePress}>
            <Entypo style = {styles.heart} name='heart' size={33} color={isLiked ? 'red' : 'white'}/>  
            <Text style={{ color: 'white' }}> {post.likes}</Text>
          </TouchableOpacity>
          <Image style = {styles.profilePic} source={{uri: post.user.imageUri}}/>
          <View>
            <Ionicons style = {styles.share} name='share-social-sharp' size={33}/>
          </View>
        </View>

        <View style = {styles.bottomContainer}>
          <Text style = {styles.handle}>@{post.user.username}</Text>
          <Text style = {styles.description}>{post.description}</Text>
          
          <View style={styles.songRow}>
            <Entypo name='beamed-note' size={23} color='blue'/>
            <Text style = {styles.songName}>  {post.song}</Text>
          </View>
        </View>
      </View>

    </View>
  );
}

export default Post;
