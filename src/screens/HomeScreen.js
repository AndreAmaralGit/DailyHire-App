import React, { memo } from 'react';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Button from '../components/Button';

const HomeScreen = ({ navigation }) => (
  <Background>
    <Logo />

    <Button mode="contained" onPress={() => navigation.navigate('LoginScreen')}>
      Login
    </Button>
    <Button
      mode="outlined"
      onPress={() => navigation.navigate('CreateAccount')}
    >
      Sign Up
    </Button>
  </Background>
);

export default memo(HomeScreen);
