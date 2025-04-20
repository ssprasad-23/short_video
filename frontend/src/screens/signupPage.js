import React, {useState} from 'react';
import {
  SafeAreaView,
  KeyboardAvoidingView,
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Platform,
} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {s} from 'react-native-wind';

const SignupPage = ({navigation}) => {
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
      `Username: ${username}\nPassword: ${password}\nDate of Birth: ${dateOfBirth}\nCountry: ${country}`,
    );
  };

  const handlLogin = () => {
    try {
      navigation.navigate('LoginPage');
    } catch (error) {
      console.error('Navigation error:', error.message);
      Alert.alert(
        'Error',
        'Oops! Could not go to the Login screen. Please try again.',
      );
    }
  };

  return (
    console.log('SignupPage is working'),
    (
      <SafeAreaView style={s`flex bg-gray-100 justify-center items-center`}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <ScrollView
            contentContainerStyle={s`flex-grow justify-center px-6 py-8`}
            keyboardShouldPersistTaps="handled">
            <Text style={s`text-3xl font-bold text-gray-800 mb-8 text-center`}>
              Create Account
            </Text>

            {/* //Username */}
            {/* <TextInput
              style={s`w-full h-12 border border-gray-300 rounded-lg px-4 bg-white mb-4`}
              placeholder="Username"
              placeholderTextColor="#999"
              value={username}
              onChangeText={setUsername}
            /> */}

            <TouchableOpacity>
              {/* Username */}
              <TextInput
                onPress={() => usernameRef.current?.focus()}
                style={s`w-full h-12 border border-gray-300 rounded-lg px-4 bg-white mb-4`}
                placeholder="Username"
                placeholderTextColor="#999"
                value={username}
                onChangeText={setUsername}
                keyboardAppearance='dark'
              />
            </TouchableOpacity>

            {/* Password */}
            <TextInput
              style={s`w-full h-12 border border-gray-300 rounded-lg px-4 bg-white mb-4`}
              placeholder="Password"
              placeholderTextColor="#999"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />

            {/* Confirm Password */}
            <TextInput
              style={s`w-full h-12 border border-gray-300 rounded-lg px-4 bg-white mb-4`}
              placeholder="Confirm Password"
              placeholderTextColor="#999"
              secureTextEntry
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />

            {/* Date of Birth */}
            <TouchableOpacity
              style={s`w-full h-12 border border-gray-300 rounded-lg px-4 bg-white mb-4 justify-center`}
              onPress={() => setOpenDobPicker(true)}
              activeOpacity={0.7}>
              <Text style={s`text-gray-600`}>
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

            {/* Country */}
            <TextInput
              style={s`w-full h-12 border border-gray-300 rounded-lg px-4 bg-white mb-6`}
              placeholder="Country"
              placeholderTextColor="#999"
              value={country}
              onChangeText={setCountry}
            />

            {/* Sign Up Button */}
            <TouchableOpacity
              style={s`w-full h-12 bg-green-600 rounded-lg justify-center items-center mb-4`}
              onPress={handleSignUp}
              activeOpacity={0.8}>
              <Text style={s`text-white text-lg font-semibold`}>Sign Up</Text>
            </TouchableOpacity>

            <Text style={s`text-center text-gray-600`}>
              Already have an account?{' '}
              <TouchableOpacity onPress={handlLogin}>
                <Text style={s`text-green-600 font-semibold`}>Log In</Text>
              </TouchableOpacity>
            </Text>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    )
  );
};

export default SignupPage;
