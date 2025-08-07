import React, {useState} from 'react';
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
import axios from 'axios';

const SignupPage = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [country, setCountry] = useState('');
  const [openDobPicker, setOpenDobPicker] = useState(false);
  const [date, setDate] = useState(new Date());
  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    try {
      // Basic validation
      if (!username || !password || !confirmPassword || !dateOfBirth || !country || !email) {
        Alert.alert('Error', 'Please fill in all fields');
        return;
      }
      if (password !== confirmPassword) {
        Alert.alert('Error', 'Passwords do not match');
        return;
      }
      // Password strength validation
      if (password.length < 8) {
        Alert.alert('Error', 'Password must be at least 8 characters long');
        return;
      }
      // Email format validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        Alert.alert('Error', 'Please enter a valid email address');
        return;
      }

      setLoading(true);
      console.log("startup process created");

      const formattedDate = date.toISOString().split('T')[0];

      //update Graphql mutation to create a user
      const graphqlQuery = {
        query: `
          mutation SignUp($input: SignUpInput!) {
            signUp(input: $input) {
                username
                email
                country
            }
          }
        `,
        variables: {
          input: {
            username,
            password,
            dob: formattedDate,
            email,
            country
          }
        }
      };
      // Make the API call
      const API_URL = Platform.OS === 'ios' ? 'http://localhost:3000/graphql':'http://10.0.2.2:3000/graphql';
      
      console.log("making api call", API_URL);
      const response = await axios.post(API_URL, graphqlQuery);

      if (response.data?.data?.signUp) {
        setLoading(false);
        Alert.alert(
          'Success',
          'Account created successfully! You can now log in.',
          [
            {
              text: 'OK',
              onPress: () => navigation.navigate('LoginPage')
            },
          ]
        );
      }
    } catch (error) {
      setLoading(false);
      if (error.response) {
        console.log("Status code:", error.response.status);
        console.log("Response body:", error.response.data);
        console.log("Error message:", error.response.headers);
      } else {
        console.error("Axios error (no response):", error);
      }
    }
  }  

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1">
        <ScrollView
          className="flex-1 px-20 py-8"
          contentContainerClassName="flex-grow justify-center"
          keyboardShouldPersistTaps="handled">
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
              placeholder="Email"
              placeholderTextColor="#999"
              value={email}
              onChangeText={setEmail}
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
              placeholder="Confirm Passworss"
              placeholderTextColor="#999"
              secureTextEntry
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />

            <TouchableOpacity
              className="w-full h-12 border border-gray-300 rounded-lg px-4 bg-white mb-4 justify-center"
              onPress={() => setOpenDobPicker(true)}
              activeOpacity={0.7}>
              <Text className="text-gray-600">
                {dateOfBirth || 'Select Date of Birth'}
              </Text>
            </TouchableOpacity>

            <DatePicker
              modal
              open={openDobPicker}
              date={date}
              mode="date"
              onConfirm={d => {
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
              activeOpacity={0.8}>
              <Text className="text-white text-lg font-semibold">Sign Up</Text>
            </TouchableOpacity>

            <View className="flex-row justify-center">
              <Text className="text-gray-600">Already have an account? </Text>
              <TouchableOpacity
                onPress={() => navigation.navigate('LoginPage')}>
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
