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
import axios from 'axios';

const months = [
  {label: 'Jan', value: '1'},
  {label: 'Feb', value: '2'},
  {label: 'Mar', value: '3'},
  {label: 'Apr', value: '4'},
  {label: 'May', value: '5'},
  {label: 'Jun', value: '6'},
  {label: 'Jul', value: '7'},
  {label: 'Aug', value: '8'},
  {label: 'Sep', value: '9'},
  {label: 'Oct', value: '10'},
  {label: 'Nov', value: '11'},
  {label: 'Dec', value: '12'},
];

const getDaysInMonth = (month, year) => {
  return new Date(year, month, 0).getDate();
};

const SignupPage = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [country, setCountry] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedDay, setSelectedDay] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [showMonthDropdown, setShowMonthDropdown] = useState(false);
  const [showDayDropdown, setShowDayDropdown] = useState(false);
  const [showYearDropdown, setShowYearDropdown] = useState(false);
  const daysInMonth = getDaysInMonth(selectedMonth, selectedYear);

  const handleSignUp = async () => {
    try {
      //validation
      if (
        !username ||
        !password ||
        !confirmPassword ||
        !selectedDay ||
        !selectedMonth ||
        !selectedYear ||
        !country ||
        !email
      ) {
        Alert.alert('Error', 'Please fill in all fields');
        return;
      }
      if (password !== confirmPassword) {
        Alert.alert('Error', 'Passwords do not match');
        return;
      }
      if (password.length < 8) {
        Alert.alert('Error', 'Password must be at least 8 characters long');
        return;
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        Alert.alert('Error', 'Please enter a valid email address');
        return;
      }

      setLoading(true);
      console.log('startup process created');

      // Format date from dropdowns
      const formattedDate = `${selectedYear}-${selectedMonth.padStart(2, '0')}-${selectedDay.padStart(2, '0')}`;

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
            country,
          },
        },
      };
      // Make the API call
      const API_URL =
        Platform.OS === 'ios'
          ? 'http://localhost:3000/graphql'
          : 'http://10.0.2.2:3000/graphql';

      console.log('making api call', API_URL);
      const response = await axios.post(API_URL, graphqlQuery);

      if (response.data?.data?.signUp) {
        setLoading(false);
        Alert.alert(
          'Success',
          'Account created successfully! You can now log in.',
          [
            {
              text: 'OK',
              onPress: () => navigation.navigate('LoginPage'),
            },
          ],
        );
      }
    } catch (error) {
      setLoading(false);
      if (error.response) {
        console.log('Status code:', error.response.status);
        console.log('Response body:', error.response.data);
        console.log('Error message:', error.response.headers);
      } else {
        console.error('Axios error (no response):', error);
      }
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-200">
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

            {/* Overlay for closing dropdowns */}
            {(showMonthDropdown || showDayDropdown || showYearDropdown) && (
              <TouchableOpacity
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  zIndex: 99, // Lower than dropdown zIndex
                  backgroundColor: 'transparent', // Ensure it's invisible
                }}
                activeOpacity={1}
                onPress={() => {
                  setShowMonthDropdown(false);
                  setShowDayDropdown(false);
                  setShowYearDropdown(false);
                }}
              />
            )}

            {/* Form Fields */}
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
              placeholder="Confirm Password"
              placeholderTextColor="#999"
              secureTextEntry
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />

            {/* Date of Birth Dropdowns */}
            <View style={{position: 'relative', flex: 1}}>
              <View className="flex-row mb-4 justify-between" style={{position: 'relative', zIndex: 100}}>
                {/* Month Dropdown */}
                <View style={{flex: 1, position: 'relative'}}>
                  <TouchableOpacity
                    className="border border-gray-300 rounded-lg px-4 py-3 bg-white"
                    onPress={() => setShowMonthDropdown(!showMonthDropdown)}>
                    <Text className="text-gray-600 text-center">
                      {selectedMonth
                        ? months.find(m => m.value === selectedMonth)?.label
                        : 'Month'}
                    </Text>
                  </TouchableOpacity>
                  {showMonthDropdown && (
                    <View
                      style={{
                        position: 'absolute',
                        top: 44,
                        left: 0,
                        right: 0,
                        zIndex: 100,
                        borderWidth: 1,
                        borderColor: '#ccc',
                        borderRadius: 8,
                        backgroundColor: 'white',
                        maxHeight: 240,
                        overflow: 'hidden',
                        shadowColor: '#000',
                        shadowOffset: {width: 0, height: 2},
                        shadowOpacity: 0.2,
                        shadowRadius: 4,
                        elevation: 5,
                      }}>
                      <ScrollView showsVerticalScrollIndicator={true}>
                        {months.map(m => (
                          <TouchableOpacity
                            key={m.value}
                            style={{
                              paddingVertical: 10,
                              paddingHorizontal: 24,
                              borderBottomWidth: m.value !== '12' ? 1 : 0,
                              borderBottomColor: '#eee',
                            }}
                            onPress={() => {
                              setSelectedMonth(m.value);
                              setShowMonthDropdown(false);
                            }}>
                            <Text style={{fontSize: 16}}>{m.label}</Text>
                          </TouchableOpacity>
                        ))}
                      </ScrollView>
                    </View>
                  )}
                </View>

                {/* Day Dropdown */}
                <View style={{flex: 1, marginHorizontal: 4, position: 'relative'}}>
                  <TouchableOpacity
                    className="border border-gray-300 rounded-lg px-4 py-3 bg-white"
                    onPress={() => setShowDayDropdown(!showDayDropdown)}>
                    <Text className="text-gray-600 text-center">
                      {selectedDay ? selectedDay : 'Day'}
                    </Text>
                  </TouchableOpacity>
                  {showDayDropdown && (
                    <View
                      style={{
                        position: 'absolute',
                        top: 44,
                        left: 0,
                        right: 0,
                        zIndex: 100,
                        borderWidth: 1,
                        borderColor: '#ccc',
                        borderRadius: 8,
                        backgroundColor: 'white',
                        maxHeight: 240,
                        overflow: 'hidden',
                        shadowColor: '#000',
                        shadowOffset: {width: 0, height: 2},
                        shadowOpacity: 0.2,
                        shadowRadius: 4,
                        elevation: 5,
                      }}>
                      <ScrollView showsVerticalScrollIndicator={true}>
                        {Array.from({length: daysInMonth}, (_, i) => (
                          <TouchableOpacity
                            key={i + 1}
                            style={{
                              paddingVertical: 10,
                              paddingHorizontal: 33,
                              borderBottomWidth: i + 1 !== daysInMonth ? 1 : 0,
                              borderBottomColor: '#eee',
                            }}
                            onPress={() => {
                              setSelectedDay(`${i + 1}`);
                              setShowDayDropdown(false);
                            }}>
                            <Text style={{fontSize: 16}}>{i + 1}</Text>
                          </TouchableOpacity>
                        ))}
                      </ScrollView>
                    </View>
                  )}
                </View>

                {/* Year Dropdown */}
                <View style={{flex: 1, marginHorizontal: 4, position: 'relative'}}>
                  <TouchableOpacity
                    className="border border-gray-300 rounded-lg px-4 py-3 bg-white"
                    onPress={() => setShowYearDropdown(!showYearDropdown)}>
                    <Text className="text-gray-600 text-center">
                      {selectedYear ? selectedYear : 'Year'}
                    </Text>
                  </TouchableOpacity>
                  {showYearDropdown && (
                    <View
                      style={{
                        position: 'absolute',
                        top: 44,
                        left: 0,
                        right: 0,
                        zIndex: 100,
                        borderWidth: 1,
                        borderColor: '#ccc',
                        borderRadius: 8,
                        backgroundColor: 'white',
                        maxHeight: 240,
                        overflow: 'hidden',
                        shadowColor: '#000',
                        shadowOffset: {width: 0, height: 2},
                        shadowOpacity: 0.2,
                        shadowRadius: 4,
                        elevation: 5,
                      }}>
                      <ScrollView showsVerticalScrollIndicator={true}>
                        {Array.from({length: 100}, (_, i) => (
                          <TouchableOpacity
                            key={2024 - i}
                            style={{
                              paddingVertical: 10,
                              paddingHorizontal: 16,
                              borderBottomWidth: i !== 99 ? 1 : 0,
                              borderBottomColor: '#eee',
                            }}
                            onPress={() => {
                              setSelectedYear(`${2024 - i}`);
                              setShowYearDropdown(false);
                            }}>
                            <Text style={{fontSize: 16}}>{2024 - i}</Text>
                          </TouchableOpacity>
                        ))}
                      </ScrollView>
                    </View>
                  )}
                </View>
              </View>
            </View>

            <TextInput
              className="w-full h-12 border border-gray-300 rounded-lg px-4 bg-white mb-6"
              placeholder="Country"
              placeholderTextColor="#999"
              value={country}
              onChangeText={setCountry}
            />

            <TouchableOpacity
              className="w-full h-12 bg-green-700 rounded-3xl justify-center items-center mb-4"
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

