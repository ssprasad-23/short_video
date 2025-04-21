import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';

const LoginPage = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = () => {
    Alert.alert('Sign In', `Username: ${username}\nPassword: ${password}`);
  };

  const handleSignUp = () => {
    try {
      navigation.navigate('SignupPage');
    } catch (error) {
      console.error('Navigation error:', error.message);
      Alert.alert(
        'Error',
        'Oops! Could not go to the SignUp screen. Please try again.',
      );
    }
  };

    return (
      <SafeAreaView className="flex-1 bg-gray-100">
        <View className="w-full flex-1 justify-center px-20 py-8">
          <Text className="text-3xl font-bold text-gray-800 mb-3 text-center">
            Login
          </Text>

          <TextInput
            className="w-full h-12 border border-gray-300 rounded-lg px-20 bg-white mb-4"
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
          />

          <TextInput
            className="w-full h-12 border border-gray-300 rounded-lg px-20 bg-white mb-4"
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />

          <TouchableOpacity
            className="w-full h-12 bg-blue-500 rounded-3xl justify-center items-center mb-4"
            onPress={handleSignIn}
            activeOpacity={0.8}>
            <Text className="text-white text-lg font-semibold">Login</Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="w-full h-12 bg-green-600 rounded-3xl justify-center items-center mb-4"
            onPress={handleSignUp}
            activeOpacity={0.8}>
            <Text className="text-white text-lg font-semibold">Sign Up</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  };

  export default LoginPage;
