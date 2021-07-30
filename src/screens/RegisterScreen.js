import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import auth from '@react-native-firebase/auth';

import CustomButton from '../components/CustomButton';

const {width, height} = Dimensions.get('window');

const RegisterScreen = props => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState(' ');
  const [password, setPassword] = useState(' ');

  const registerAccount = () => {
    if (email === ' ' || password === ' ') {
      return;
    }
    setLoading(true);
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        alert('Account created successfully!');
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          alert('That email address is already in use!');
          setLoading(false);
        }

        if (error.code === 'auth/invalid-email') {
          alert('This email address is invalid!');
          setLoading(false);
        }

        if (error.code === 'auth/weak-password') {
          alert('Password is too weak, it should be at least 6 characters');
          setLoading(false);
        }
      });
  };
  return (
    <View style={styles.screen}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Sign Up</Text>
      </View>
      <View style={styles.formContainer}>
        <Text style={styles.welcomeText}>Create a new account</Text>
        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <Text style={styles.inputText}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="enter your email"
              onChangeText={text => {
                setEmail(text);
              }}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputText}>Password</Text>
            <TextInput
              secureTextEntry
              style={styles.input}
              placeholder="enter your password"
              onChangeText={text => {
                setPassword(text);
              }}
            />
          </View>
        </View>
        <CustomButton
          title="Sign Up"
          click={registerAccount}
          content={loading}
        />
        <View style={styles.signupText}>
          <Text>Already have an account?</Text>
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate('login');
            }}>
            <Text style={styles.signupButton}>Sign in</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#6200ee',
  },
  headerContainer: {
    backgroundColor: '#6200ee',
    height: height * 0.1,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 30,
    color: '#fff',
  },
  formContainer: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  inputContainer: {
    marginTop: 20,
  },
  inputText: {
    fontWeight: 'bold',
    marginVertical: 10,
    marginHorizontal: 10,
  },
  input: {
    width: width - 40,
    height: 50,
    backgroundColor: '#e8f0f8',
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  signupText: {
    flex: 1,
    flexDirection: 'row',
    marginVertical: 30,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  signupButton: {
    color: '#6200ee',
    fontWeight: 'bold',
    marginHorizontal: 10,
  },
});

export default RegisterScreen;
