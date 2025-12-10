import React, { useState, useMemo } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  ScrollView,
  ActivityIndicator,
  Alert,
  StyleSheet,
  Platform,
  TouchableWithoutFeedback,
} from 'react-native';
import axios from 'axios';

const months = [
  { label: 'Jan', value: 1 },
  { label: 'Feb', value: 2 },
  { label: 'Mar', value: 3 },
  { label: 'Apr', value: 4 },
  { label: 'May', value: 5 },
  { label: 'Jun', value: 6 },
  { label: 'Jul', value: 7 },
  { label: 'Aug', value: 8 },
  { label: 'Sep', value: 9 },
  { label: 'Oct', value: 10 },
  { label: 'Nov', value: 11 },
  { label: 'Dec', value: 12 },
];

const getDaysInMonth = (month, year) => {
  if (!month || !year) return 31;
  return new Date(year, month, 0).getDate();
};

const generateYears = (count = 100) => {
  const current = new Date().getFullYear();
  return Array.from({ length: count }, (_, i) => current - i);
};

const DOBModal = ({ visible, onClose, month, day, year, setMonth, setDay, setYear }) => {
  const years = useMemo(() => generateYears(100), []);
  const days = useMemo(() => getDaysInMonth(month, year), [month, year]);

  return (
    <Modal visible={visible} animationType="fade" transparent>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalBackdrop}>
          <TouchableWithoutFeedback>
            <View style={styles.modalCard}>
              <Text style={styles.modalTitle}>Select date of birth</Text>
              <View style={styles.pickersRow}>
                <ScrollView style={styles.pickerCol}>
                  {months.map(m => (
                    <TouchableOpacity
                      key={m.value}
                      style={[styles.pickerItem, month === m.value && styles.pickerItemActive]}
                      onPress={() => {
                        setMonth(m.value);
                        // adjust day if out-of-range
                        if (day > getDaysInMonth(m.value, year)) setDay(getDaysInMonth(m.value, year));
                      }}>
                      <Text style={styles.pickerText}>{m.label}</Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>

                <ScrollView style={styles.pickerCol}>
                  {Array.from({ length: days }, (_, i) => i + 1).map(d => (
                    <TouchableOpacity
                      key={d}
                      style={[styles.pickerItem, day === d && styles.pickerItemActive]}
                      onPress={() => setDay(d)}>
                      <Text style={styles.pickerText}>{d}</Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>

                <ScrollView style={styles.pickerCol}>
                  {years.map(y => (
                    <TouchableOpacity
                      key={y}
                      style={[styles.pickerItem, year === y && styles.pickerItemActive]}
                      onPress={() => {
                        setYear(y);
                        if (day > getDaysInMonth(month, y)) setDay(getDaysInMonth(month, y));
                      }}>
                      <Text style={styles.pickerText}>{y}</Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>

              <View style={styles.modalActions}>
                <TouchableOpacity style={styles.btnGhost} onPress={onClose}>
                  <Text style={styles.btnGhostText}>Close</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const SignupPage = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [country, setCountry] = useState('');
  const [month, setMonth] = useState(null);
  const [day, setDay] = useState(null);
  const [year, setYear] = useState(null);
  const [dobModalVisible, setDobModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const formattedDob = useMemo(() => {
    if (!year || !month || !day) return '';
    const mm = String(month).padStart(2, '0');
    const dd = String(day).padStart(2, '0');
    return `${year}-${mm}-${dd}`;
  }, [year, month, day]);

  const validate = () => {
    if (!username.trim() || !email.trim() || !password || !confirmPassword || !country.trim() || !month || !day || !year) {
      Alert.alert('Validation', 'Please fill all fields.');
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Validation', 'Invalid email address.');
      return false;
    }
    if (password.length < 8) {
      Alert.alert('Validation', 'Password must be at least 8 characters.');
      return false;
    }
    if (password !== confirmPassword) {
      Alert.alert('Validation', 'Passwords do not match.');
      return false;
    }
    return true;
  };

  const handleSignUp = async () => {
    if (!validate()) return;
    setLoading(true);
    try {
      const API_URL = Platform.OS === 'ios' ? 'http://localhost:3000/graphql' : 'http://10.0.2.2:3000/graphql';
      const query = {
        query: `
          mutation SignUp($input: SignUpInput!) {
            signUp(input: $input) {
              username
              email
            }
          }
        `,
        variables: {
          input: {
            username: username.trim(),
            password,
            email: email.trim(),
            country: country.trim(),
            dob: formattedDob,
          },
        },
      };
      const res = await axios.post(API_URL, query, { timeout: 10000 });
      if (res.data?.errors) {
        throw new Error(res.data.errors.map(e => e.message).join('; '));
      }
      Alert.alert('Success', 'Account created. Please log in.', [{ text: 'OK', onPress: () => navigation.navigate('LoginPage') }]);
    } catch (err) {
      console.error(err);
      Alert.alert('Signup failed', err?.message || 'Network error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.container}>
        <Text style={styles.title}>Create account</Text>

        <TextInput
          style={styles.input}
          placeholder="Username"
          placeholderTextColor="#666"
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
        />

        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#666"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#666"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <TextInput
          style={styles.input}
          placeholder="Confirm password"
          placeholderTextColor="#666"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />

        <TouchableOpacity style={styles.input} activeOpacity={0.8} onPress={() => setDobModalVisible(true)}>
          <Text style={[styles.inputText, !(day && month && year) && { color: '#999' }]}>
            {day && month && year ? `${String(day).padStart(2, '0')}-${months.find(m => m.value === month)?.label}-${year}` : 'Date of birth'}
          </Text>
        </TouchableOpacity>

        <TextInput
          style={styles.input}
          placeholder="Country"
          placeholderTextColor="#666"
          value={country}
          onChangeText={setCountry}
        />

        <TouchableOpacity
          style={[styles.primaryButton, loading && styles.buttonDisabled]}
          onPress={handleSignUp}
          activeOpacity={0.8}
          disabled={loading}>
          {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.primaryButtonText}>Sign up</Text>}
        </TouchableOpacity>

        <View style={styles.row}>
          <Text style={styles.muted}>Already have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('LoginPage')}>
            <Text style={styles.link}> Log in</Text>
          </TouchableOpacity>
        </View>
      </View>

      <DOBModal
        visible={dobModalVisible}
        onClose={() => setDobModalVisible(false)}
        month={month}
        day={day}
        year={year}
        setMonth={setMonth}
        setDay={setDay}
        setYear={setYear}
      />
    </SafeAreaView>
  );
};

export default SignupPage;

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#f5f7fa', justifyContent: 'center' },
  container: { marginHorizontal: 24, backgroundColor: '#fff', borderRadius: 12, padding: 20, elevation: 2 },
  title: { fontSize: 22, fontWeight: '700', textAlign: 'center', marginBottom: 12, color: '#222' },
  input: {
    height: 48,
    borderRadius: 10,
    backgroundColor: '#fbfdff',
    borderWidth: 1,
    borderColor: '#e6e9ef',
    paddingHorizontal: 12,
    marginBottom: 12,
    justifyContent: 'center',
  },
  inputText: { color: '#222' },
  primaryButton: {
    height: 48,
    borderRadius: 10,
    backgroundColor: '#0f9d58',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 6,
  },
  primaryButtonText: { color: '#fff', fontWeight: '600' },
  buttonDisabled: { opacity: 0.6 },
  row: { flexDirection: 'row', justifyContent: 'center', marginTop: 12 },
  muted: { color: '#6b7280' },
  link: { color: '#0f9d58', fontWeight: '600' },

  // modal
  modalBackdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.35)', justifyContent: 'center', padding: 20 },
  modalCard: { backgroundColor: '#fff', borderRadius: 12, padding: 12, maxHeight: '80%' },
  modalTitle: { fontSize: 16, fontWeight: '600', marginBottom: 8, textAlign: 'center' },
  pickersRow: { flexDirection: 'row', justifyContent: 'space-between' },
  pickerCol: { flex: 1, marginHorizontal: 4, maxHeight: 320 },
  pickerItem: { paddingVertical: 10, paddingHorizontal: 8, borderBottomWidth: 1, borderColor: '#eee' },
  pickerItemActive: { backgroundColor: '#eef7ef' },
  pickerText: { textAlign: 'center' },
  modalActions: { marginTop: 8, alignItems: 'center' },
  btnGhost: { paddingHorizontal: 16, paddingVertical: 8 },
  btnGhostText: { color: '#555' },
});

