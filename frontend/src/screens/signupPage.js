import React, { useState } from 'react';
import {
  SafeAreaView,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Platform,
  View,
} from 'react-native';
import DatePicker from 'react-native-date-picker';

const SignupPage = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [country, setCountry] = useState('');
  const [openDobPicker, setOpenDobPicker] = useState(false);
  const [date, setDate] = useState(new Date());

  const handleSignUp = () => {
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }
    Alert.alert(
      'Sign Up',
      `Username: ${username}\nPassword: ${password}\nDate of Birth: ${dateOfBirth}\nCountry: ${country}`
    );
  };

  const handleLogin = () => {
    try {
      navigation.navigate('LoginPage');
    } catch (error) {
      console.error('Navigation error:', error.message);
      Alert.alert(
        'Error',
        'Oops! Could not go to the Login screen. Please try again.'
      );
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <ScrollView 
          className="flex-1 px-20 py-8" 
          contentContainerClassName="flex-grow justify-center"
          keyboardShouldPersistTaps="handled"
        >
          <View className="w-full max-w-md mx-auto">
            <Text className="text-3xl font-bold text-gray-800 mb-8 text-center">
              Create Account
            </Text>

            <TextInput
              className="w-full h-12 border border-gray-300 rounded-lg px-4 bg-white mb-4"
              placeholder="Username"
              placeholderTextColor="#999"
              value={username}
              onChangeText={setUsername}
              keyboardAppearance="dark"
            />

            <TextInput
              className="w-full h-12 border border-gray-300 rounded-lg px-4 bg-white mb-4"
              placeholder="Password"
              placeholderTextColor="#999"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />

            <TextInput
              className="w-full h-12 border border-gray-300 rounded-lg px-4 bg-white mb-4"
              placeholder="Confirm Password"
              placeholderTextColor="#999"
              secureTextEntry
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />

            <TouchableOpacity
              className="w-full h-12 border border-gray-300 rounded-lg px-4 bg-white mb-4 justify-center"
              onPress={() => setOpenDobPicker(true)}
              activeOpacity={0.7}
            >
              <Text className="text-gray-600">{dateOfBirth || 'Select Date of Birth'}</Text>
            </TouchableOpacity>
            <DatePicker
              modal
              open={openDobPicker}
              date={date}
              mode="date"
              onConfirm={(d) => {
                setOpenDobPicker(false);
                setDate(d);
                setDateOfBirth(d.toLocaleDateString());
              }}
              onCancel={() => setOpenDobPicker(false)}
            />

            <TextInput
              className="w-full h-12 border border-gray-300 rounded-lg px-4 bg-white mb-6"
              placeholder="Country"
              placeholderTextColor="#999"
              value={country}
              onChangeText={setCountry}
            />

            <TouchableOpacity
              className="w-full h-12 bg-green-600 rounded-3xl justify-center items-center mb-4"
              onPress={handleSignUp}
              activeOpacity={0.8}
            >
              <Text className="text-white text-lg font-semibold">Sign Up</Text>
            </TouchableOpacity>

            <View className="flex-row justify-center">
              <Text className="text-gray-600">
                Already have an account?{' '}
              </Text>
              <TouchableOpacity onPress={handleLogin}>
                <Text className="text-green-600 font-semibold">Log In</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};


export default SignupPage;