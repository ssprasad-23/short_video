import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from 'react-native';
import {s} from 'react-native-wind';

const LoginPage = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = () => {
    Alert.alert('Sign In', `Username: ${username}\nPassword: ${password}`);
  };

  const handleSignUp = () => {
    try {
      navigation.navigate("SignupPage");
    } catch (error) {
      console.error("Navigation error:", error.message);
      Alert.alert(
        "Error",
        "Oops! Could not go to the SignUp screen. Please try again."
      );
    }
  };

  return (
    <SafeAreaView style={s`flex-1 justify-center item-center bg-white`}>
      <View style={s`flex-center justify-center px-6 py-8`}>
        <Text style={s`text-3xl font-bold text-gray-800 mb-3 text-center`}>
          Login
        </Text>

        <TextInput
          style={s`w-full h-12 border border-gray-300 rounded-lg px-4 bg-white mb-4`}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
        />

        <TextInput
          style={s`w-full h-12 border border-gray-300 rounded-lg px-4 bg-white mb-4`}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity
          style={s`w-full h-12 bg-blue-500 rounded-lg justify-center items-center mb-4`}
          onPress={handleSignUp}
          activeOpacity={0.8}>
          <Text style={s`text-white text-lg font-semibold`}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={s`w-full h-12 bg-green-600 rounded-lg justify-center items-center mb-4`}
          onPress={handleSignUp}
          activeOpacity={0.8}>
          <Text style={s`text-white text-lg font-semibold`}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>

  );
};

export default LoginPage;
