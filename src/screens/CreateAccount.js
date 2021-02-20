import React, { Component, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import { theme } from '../core/theme';
import {
      emailValidator,
      passwordValidator,
      nameValidator,
      addressValidator,
      phoneValidator,
      birthdateValidator,
      existingEmail
} from '../core/utils';
import GenderPicker from '../components/GenderPicker';
import Birthdate from '../components/Birthdate';
import GooglePlaces from '../components/GooglePlaces';
import AwesomeAlert from 'react-native-awesome-alerts';


class CreateAccount extends Component {

      constructor(props) {
            super(props);

            this.state = {
                  name: { value: '', error: '' },
                  email: { value: '', error: '' },
                  phoneNumber: { value: '', error: '' },
                  password: { value: '', error: '' },
                  googleAddress: { value: '', error: '' },
                  birthdate: { value: '', error: '' },
                  indexGender: '',
                  showAlert: false
            };
      }

      updateState(data) {
            this.setState({ indexGender: data });
      }

      showAlert = () => {
            this.setState({
                  showAlert: true
            });
      };

      hideAlert = () => {
            this.setState({
                  showAlert: false
            });
            this.props.navigation.navigate('LoginScreen');
      };

      updateAddress = (data) => {
            this.setState({ googleAddress: { value: data } });
      }

      _onSignUpPressed = () => {

            const nameError = nameValidator(this.state.name.value);
            const emailError = emailValidator(this.state.email.value);
            const phoneError = phoneValidator(this.state.phoneNumber.value);
            const passwordError = passwordValidator(this.state.password.value);
            const googleAddressError = addressValidator(this.state.googleAddress.value);
            const birthdateError = birthdateValidator(this.state.birthdate.value);


            if (emailError || passwordError || nameError || phoneError || googleAddressError || birthdateError) {
                  this.setState({ name: { value: this.state.name.value, error: nameError } });
                  this.setState({ email: { value: this.state.email.value, error: emailError } });
                  this.setState({ phoneNumber: { value: this.state.phoneNumber.value, error: phoneError } });
                  this.setState({ password: { value: this.state.password.value, error: passwordError } });
                  this.setState({ googleAddress: { value: this.state.googleAddress.value, error: googleAddressError } });
                  this.setState({ birthdate: { value: this.state.birthdate.value, error: birthdateError } });
                  return;
            } else {

                  let dataBefore = this.state.birthdate.value.split("-"); //DD-MM-YYYY -> MM-DD-YYYY
                  let dataAfter = dataBefore[1] + "-" + dataBefore[0] + "-" + dataBefore[2];
                  let selectedGender = 'Male';

                  if (this.state.indexGender == 1) {
                        selectedGender = 'Female';
                  }

                  fetch('http://localhost:8080/users/createUser', {
                        method: 'POST',
                        headers: {
                              Accept: 'application/json',
                              'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                              name: this.state.name.value,
                              address: this.state.googleAddress.value,
                              email: this.state.email.value,
                              phoneNumber: this.state.phoneNumber.value,
                              gender: selectedGender,
                              birthdate: dataAfter,
                              password: this.state.password.value,
                        }),
                  }).then((response) => {
                        if (response.ok) {


                              this.showAlert();


                        }
                        else {
                              if (response.status == 422) {
                                    const emailExists = existingEmail();
                                    this.setState({ email: { value: this.state.email.value, error: emailExists } });
                              }
                        }
                  }
                  ).catch(
                        function (error) {
                              console.error(error);
                        }
                  );


            }
      };

      render() {
            return (
                  <Background>

                        <Logo />

                        <Header>Create Account</Header>

                        <TextInput
                              placeholder="Name"
                              returnKeyType="next"
                              value={this.state.name.value}
                              onChangeText={text => this.setState({ name: { value: text, error: '' } })}
                              error={!!this.state.name.error}
                              errorText={this.state.name.error}
                              theme={{ colors: { primary: 'tranparent' } }}
                        />

                        <GooglePlaces
                              onPress={(data, details = null) => {
                                    console.log(data);
                                    this.setState({ googleAddress: { value: data.description, error: '' } });
                              }
                              }
                              error={!!this.state.googleAddress.error}
                              errorText={this.state.googleAddress.error}
                              updateAddressState={this.updateAddress.bind(this)}
                        />

                        <TextInput
                              placeholder="Email"
                              returnKeyType="next"
                              value={this.state.email.value}
                              onChangeText={text => this.setState({ email: { value: text, error: '' } })}
                              error={!!this.state.email.error}
                              errorText={this.state.email.error}
                              autoCapitalize="none"
                              autoCompleteType="email"
                              textContentType="emailAddress"
                              keyboardType="email-address"
                              theme={{ colors: { primary: 'tranparent' } }}
                        />

                        <TextInput
                              placeholder="Phone Number"
                              returnKeyType="done"
                              keyboardType="numeric"
                              value={this.state.phoneNumber.value}
                              onChangeText={text => this.setState({ phoneNumber: { value: text, error: '' } })}
                              error={!!this.state.phoneNumber.error}
                              errorText={this.state.phoneNumber.error}
                              theme={{ colors: { primary: 'tranparent' } }}
                        />

                        <GenderPicker
                              updateParentState={this.updateState.bind(this)}
                        />

                        <Birthdate
                              error={!!this.state.birthdate.error}
                              errorText={this.state.birthdate.error}
                              date={this.state.birthdate.value}
                              onDateChange={chosenDate => this.setState({ birthdate: { value: chosenDate } })}
                        />



                        <TextInput
                              placeholder="Password"
                              returnKeyType="done"
                              value={this.state.password.value}
                              onChangeText={text => this.setState({ password: { value: text, error: '' } })}
                              error={!!this.state.password.error}
                              errorText={this.state.password.error}
                              secureTextEntry={true}
                              theme={{ colors: { primary: 'tranparent' } }}
                        />


                        <Button mode="contained" onPress={this._onSignUpPressed} style={styles.button}>
                              Create
                        </Button>

                        <View style={styles.row}>
                              <Text style={styles.label}>Already have an account? </Text>
                              <TouchableOpacity onPress={() => this.props.navigation.navigate('LoginScreen')}>
                                    <Text style={styles.link}>Login</Text>
                              </TouchableOpacity>
                        </View>

                        <AwesomeAlert
                              show={this.state.showAlert}
                              showProgress={false}
                              title="Your account has been created"
                              closeOnTouchOutside={false}
                              closeOnHardwareBackPress={false}
                              showConfirmButton={true}
                              confirmText="Ok"
                              confirmButtonColor="#2292A4"
                              onConfirmPressed={() => {
                                    this.hideAlert();
                              }}
                              confirmButtonStyle={{
                                    width: 50,
                              }}
                              confirmButtonTextStyle={{
                                    alignSelf: 'center',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                              }}
                        />


                  </Background>
            );
      };
}

const styles = StyleSheet.create({
      label: {
            color: theme.colors.secondary,
      },
      button: {
            marginTop: 24,
      },
      row: {
            flexDirection: 'row',
            marginTop: 4,
      },
      link: {
            fontWeight: 'bold',
            color: theme.colors.primary,
      },
      gender: {
            backgroundColor: '#ffffff',
            borderTopRightRadius: 25,
            borderTopLeftRadius: 25,
            borderBottomLeftRadius: 25,
            borderBottomRightRadius: 25,
            height: 50,
      },
});


export default CreateAccount;
