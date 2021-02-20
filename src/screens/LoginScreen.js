import React, { memo, useContext, useState } from 'react';
import { TouchableOpacity, StyleSheet, Text, View, } from 'react-native';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import { theme } from '../core/theme';
import {
  emailValidator, passwordValidator, passwordWrong, userWrong
} from '../core/utils';
import { UserContext } from '../UserContext';



const LoginScreen = ({ navigation }) => {

  const [email, setEmail] = useState({ value: '', error: '' });
  const [password, setPassword] = useState({ value: '', error: '' });


  const { user, setUser } = useContext(UserContext);

  const _onLoginPressed = () => {

    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);
    const wrongPass = passwordWrong();
    const wrongUser = userWrong();

    if (emailError || passwordError) {

      setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });
      return;

    } else {


      fetch('http://localhost:8080/users/login', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email.value,
          password: password.value,
        }),
      }).then(
        function (response) {

          if (response.status == 400) {
            setPassword({ ...password, error: wrongPass });
          } else if (response.status == 401) {
            setEmail({ ...email, error: wrongUser });
          } else {
            return response.json()
          }

        }
      ).then((responseText) => {

        if (responseText == undefined) {

        } else {

          // GET USER NOTIFICATIONS

          fetch('http://localhost:8080/notifications/findNotifications', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              user: responseText['_id']
            }),
          }).then((response2) => {
            return response2.json();
          }).then((responseText2) => {

            if ((responseText2 && responseText2.length > 0)) {

              responseText.showBadge = true;
              responseText.counter = responseText2.length

              setUser(responseText);
              navigation.navigate('CreateService');

            } else {

              responseText.showBadge = false;
              responseText.counter = responseText2.length

              setUser(responseText);
              navigation.navigate('CreateService');

            }

          }).catch(
            function (error) {
              console.error(error);
            }
          );
        }

      }).catch(
        function (error) {
          console.error(error);
        }
      );


    }


  };

  return (
    <Background>

      <Logo />


      <TextInput
        placeholder="Email"
        returnKeyType="next"
        value={email.value}
        onChangeText={text => setEmail({ value: text, error: '' })}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
        theme={{ colors: { primary: 'tranparent' } }}
      />

      <TextInput
        placeholder="Password"
        returnKeyType="done"
        value={password.value}
        onChangeText={text => setPassword({ value: text, error: '' })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry={true}
        theme={{ colors: { primary: 'tranparent' } }}
      />
      {/* 
      <View style={styles.forgotPassword}>
        <TouchableOpacity
          onPress={() => navigation.navigate('ForgotPasswordScreen')}
        >
          <Text style={styles.label}>Forgot your password?</Text>
        </TouchableOpacity>
      </View>
      */}

      <Button mode="contained" onPress={_onLoginPressed}>
        Login
      </Button>

      <View style={styles.row}>
        <Text style={styles.label}>Don’t have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('CreateAccount')}>
          <Text style={styles.link}>Sign up</Text>
        </TouchableOpacity>
      </View>

    </Background >

  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  label: {
    color: theme.colors.secondary,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
    marginBottom: 20,
  },
});

export default memo(LoginScreen);
