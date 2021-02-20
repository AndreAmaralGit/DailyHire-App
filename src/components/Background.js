import React, { memo } from 'react';
import {
  ImageBackground,
  StyleSheet,
  KeyboardAvoidingView,
  Keyboard, TouchableWithoutFeedback, View, ScrollView
} from 'react-native';

const Background = ({ children }) => (
  <ImageBackground
    source={require('../assets/background.png')}
    style={styles.background}
  >
    <KeyboardAvoidingView style={styles.container} behavior="height">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', width: 300, }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="always">
          <View style={styles.view}>
            {children}
          </View>
        </ScrollView>

      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  </ImageBackground>
);

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
  },
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 40,
    width: '100%',
    maxWidth: 340,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  view: {
    width: '100%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
});

export default memo(Background);
