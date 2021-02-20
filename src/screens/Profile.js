import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import TextInput2 from '../components/TextInput2';
import Address from '../components/AddressProfile';
import { UserContext } from '../UserContext';
import GenderPicker2 from '../components/GenderPicker2';
import Calendar from '../components/Calendar';
import moment from "moment";
import Button from '../components/Button';
import { Rating } from 'react-native-ratings';
import ImagePicker from 'react-native-image-picker';
import { IconButton } from 'react-native-paper';
import AwesomeAlert from 'react-native-awesome-alerts';

import {
      nameValidator,
      addressValidator,
      phoneValidator,
      birthdateValidator,
      passwordValidator
} from '../core/utils';

import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();//Ignore all log notifications

export default class Profile extends Component {

      static contextType = UserContext;

      handleOptionChange(event) {

            const user = this.context

      }

      constructor(props) {
            super(props);

            this.state = {
                  name: { value: '', error: '' },
                  address: { value: '', error: '' },
                  email: { value: '' },
                  phoneNumber: { value: '', error: '' },
                  indexGender: '',
                  birthdate: { value: '', error: '' },
                  ageRestrict: moment().subtract(18, "years"),
                  password: { value: '', error: '' },
                  ratingWorker: 0,
                  ratingClient: 0,
                  workerText: 'No evaluations',
                  clientText: 'No evaluations',
                  uploadedImg: null,
                  imgResponse: null,
                  showAlert: false
            };

            this.PickerElement = React.createRef();

      }

      componentDidMount() {

            let finalName = this.context.user["name"];
            let finalAddress = this.context.user["address"];
            let finalEmail = this.context.user["email"];
            let finalPhoneNumber = JSON.stringify(this.context.user["phoneNumber"]).replace(/['"]+/g, '');
            let finalPassword = this.context.user["password"];


            let birthdate = this.context.user["birthdate"];
            let dateToSplit = birthdate.substring(0, 10);
            let dateSplit = dateToSplit.split("-");
            let finalDate = (this.functionN(+dateSplit[2])) + "-" + dateSplit[1] + "-" + dateSplit[0];

            let ratingCounter = this.context.user["ratingCounter"];
            let ratingTotal = this.context.user["ratingTotal"];

            if (!(ratingCounter == null)) {

                  let clientRating = (ratingTotal / ratingCounter).toFixed(2);
                  let clientRatingValue = ratingTotal / ratingCounter;

                  this.setState({ name: { value: finalName }, address: { value: finalAddress }, email: { value: finalEmail }, phoneNumber: { value: finalPhoneNumber }, password: { value: finalPassword }, birthdate: { value: finalDate }, ratingClient: clientRatingValue, clientText: clientRating })

            } else {

                  this.setState({ name: { value: finalName }, address: { value: finalAddress }, email: { value: finalEmail }, phoneNumber: { value: finalPhoneNumber }, password: { value: finalPassword }, birthdate: { value: finalDate } })
            }

            let finalGender = JSON.stringify(this.context.user["gender"]).replace(/['"]+/g, '');

            if (finalGender == 'Female') {
                  this.PickerElement.current.UserFemale();
            } else {
                  this.PickerElement.current.UserMale();
            }

            let workerState = this.context.user["workerState"];

            if (!(workerState == false)) {

                  fetch('http://localhost:8080/workers/findWorkerbyUser', {
                        method: 'POST',
                        headers: {
                              Accept: 'application/json',
                              'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                              _id: this.context.user["_id"]
                        }),
                  }).then((response) => {
                        return response.json();
                  }).then((responseText) => {
                        let ratingCounter = responseText[0]["ratingCounter"];
                        let ratingTotal = responseText[0]["ratingTotal"];

                        if (!(ratingCounter == null)) {

                              let workerRating = (ratingTotal / ratingCounter).toFixed(2);
                              let workerRatingValue = ratingTotal / ratingCounter;

                              this.setState({ ratingWorker: workerRatingValue, workerText: workerRating })

                        }

                  }).catch(
                        function (error) {
                              console.error(error);
                        }
                  );
            }

            this.setState({ uploadedImg: { uri: 'http://localhost:8080/' + this.context.user["photo"] } })
      }

      functionN = (n) => {
            return n > 9 ? "" + n : "0" + n;
      }

      updateState(data) {
            this.setState({ indexGender: data });
      }

      updateAddress = (data) => {
            this.setState({ address: { value: data } });  //data
      }

      openLibrary = () => {
            // Open Image Library:
            const options = [{
                  mediaType: 'photo'
            }];
            ImagePicker.launchImageLibrary(options, (response) => {
                  // Same code as in above section!
                  if (response.uri) {
                        const formData = new FormData();

                        let file = {
                              uri: response.uri,
                              type: response.type,
                              name: response.fileName
                        }

                        this.setState({ uploadedImg: { uri: response.uri } })

                        formData.append('img', file);

                        fetch('http://localhost:8080/photos/uploadPhoto', {
                              method: 'POST',
                              body: formData
                        }).then(response => response.text())
                              .then(response => {

                                    this.setState({ imgResponse: "images/uploads/" + response })


                              }).catch(
                                    function (error) {
                                          console.error(error);
                                    })
                  }

            });
      }

      showAlert = () => {
            this.setState({ showAlert: true });
      };

      hideAlert = () => {
            this.setState({
                  showAlert: false
            });
      };

      _onUpdatePressed = () => {

            const nameError = nameValidator(this.state.name.value);
            const addressError = addressValidator(this.state.address.value);
            const phoneNumberError = phoneValidator(this.state.phoneNumber.value);
            const birthdateError = birthdateValidator(this.state.birthdate.value);
            const passwordError = passwordValidator(this.state.password.value);

            if (nameError || addressError || phoneNumberError || birthdateError || passwordError) {
                  this.setState({ name: { value: this.state.name.value, error: nameError } });
                  this.setState({ address: { value: this.state.address.value, error: addressError } });
                  this.setState({ phoneNumber: { value: this.state.phoneNumber.value, error: phoneNumberError } });
                  this.setState({ birthdate: { value: this.state.birthdate.value, error: birthdateError } });
                  this.setState({ password: { value: this.state.password.value, error: passwordError } });
                  return;
            } else {
                  let dataBefore = this.state.birthdate.value.split("-"); //DD-MM-YYYY -> MM-DD-YYYY
                  let dataAfter = dataBefore[1] + "-" + dataBefore[0] + "-" + dataBefore[2];

                  let genderFinal = null
                  if (this.state.indexGender == '') {
                        genderFinal = this.context.user["gender"]
                  } else {
                        genderFinal = this.state.indexGender
                  }

                  let photoFinal = null
                  if (this.state.imgResponse == null) {
                        photoFinal = this.context.user["photo"]
                  } else {
                        photoFinal = this.state.imgResponse
                  }

                  fetch('http://localhost:8080/users/updateUser', {
                        method: 'POST',
                        headers: {
                              Accept: 'application/json',
                              'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                              _id: this.context.user["_id"],
                              name: this.state.name.value,
                              address: this.state.address.value,
                              email: this.state.email.value,
                              phoneNumber: this.state.phoneNumber.value,
                              gender: genderFinal,
                              birthdate: dataAfter,
                              password: this.state.password.value,
                              photo: photoFinal
                        }),
                  }).then(response => response.json())
                        .then(response => {

                              this.context.setUser(response);
                              this.showAlert();


                        }).catch(
                              function (error) {
                                    console.error(error);
                              })
            }
      }

      render() {
            return (
                  <ScrollView
                        contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', width: '100%', }}
                        showsVerticalScrollIndicator={false}
                        keyboardShouldPersistTaps="always">
                        <View style={styles.view}>

                              <View>
                                    <Image source={this.state.uploadedImg} style={styles.image} />

                                    <IconButton
                                          icon="plus"
                                          color={'#ffffff'}
                                          size={25}
                                          style={styles.open}
                                          onPress={this.openLibrary}
                                    />

                              </View>

                              <TextInput2
                                    placeholder="Name"
                                    value={this.state.name.value}
                                    onChangeText={text => this.setState({ name: { value: text, error: '' } })}
                                    theme={{ colors: { primary: 'tranparent' } }}
                                    style={styles.name}
                                    error={!!this.state.name.error}
                                    errorText={this.state.name.error}
                              />

                              <Address
                                    onPress={(data, details = null) => {
                                          console.log(data);
                                          this.setState({ address: { value: data.description, error: '' } });
                                    }
                                    }
                                    error={!!this.state.address.error}
                                    errorText={this.state.address.error}
                                    updateAddressState={this.updateAddress.bind(this)}

                              />

                              <TextInput2
                                    placeholder="Email"
                                    value={this.state.email.value}
                                    theme={{ colors: { primary: 'tranparent' } }}
                                    style={styles.name}
                                    disabled={true}
                              />

                              <TextInput2
                                    placeholder="Phone Number"
                                    value={this.state.phoneNumber.value}
                                    theme={{ colors: { primary: 'tranparent' } }}
                                    style={styles.name}
                                    keyboardType="numeric"
                                    error={!!this.state.phoneNumber.error}
                                    errorText={this.state.phoneNumber.error}
                                    onChangeText={text => this.setState({ phoneNumber: { value: text, error: '' } })}
                              />

                              <GenderPicker2
                                    updateParentState={this.updateState.bind(this)}
                                    ref={this.PickerElement}
                              />

                              <Calendar
                                    placeholder="Birthdate"
                                    maxDate={new Date(this.state.ageRestrict)}
                                    date={this.state.birthdate.value}
                                    onDateChange={chosenDate => this.setState({ birthdate: { value: chosenDate } })}
                                    style={{ marginBottom: 8, width: '100%' }}
                                    error={!!this.state.birthdate.error}
                                    errorText={this.state.birthdate.error}
                              />

                              <TextInput2
                                    placeholder="Password"
                                    returnKeyType="done"
                                    secureTextEntry
                                    value={this.state.password.value}
                                    theme={{ colors: { primary: 'tranparent' } }}
                                    style={styles.name}
                                    error={!!this.state.password.error}
                                    errorText={this.state.password.error}
                                    onChangeText={text => this.setState({ password: { value: text, error: '' } })}
                              />

                              <Button
                                    mode="contained"
                                    style={styles.button}
                                    onPress={this._onUpdatePressed}>
                                    Update Profile
                              </Button>

                              <View style={{ flexDirection: "row", marginVertical: 12 }}>
                                    <View style={{ flex: 1 }}>
                                          <Text style={{ textAlign: 'center', marginBottom: 10, fontWeight: 'bold', fontSize: 16 }}> Client Rating </Text>
                                          <Rating
                                                type='custom'
                                                imageSize={23}
                                                tintColor='#eeeeee'
                                                readonly={true}
                                                ratingBackgroundColor='#C0C0C0'
                                                startingValue={this.state.ratingClient}
                                          />
                                          <Text style={{ textAlign: 'center', marginTop: 10, fontWeight: 'bold', fontSize: 12 }}> {this.state.clientText} </Text>
                                    </View>
                                    <View style={{ flex: 1 }}>
                                          <Text style={{ textAlign: 'center', marginBottom: 10, fontWeight: 'bold', fontSize: 16 }}> Worker Rating </Text>
                                          <Rating
                                                type='custom'
                                                imageSize={23}
                                                tintColor='#eeeeee'
                                                readonly={true}
                                                ratingBackgroundColor='#C0C0C0'
                                                startingValue={this.state.ratingWorker}
                                          />
                                          <Text style={{ textAlign: 'center', marginTop: 10, fontWeight: 'bold', fontSize: 12 }}> {this.state.workerText} </Text>
                                    </View>
                              </View>

                              <AwesomeAlert
                                    show={this.state.showAlert}
                                    showProgress={false}
                                    title="Your profile has been updated"
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
                                    titleStyle={{
                                          textAlign: "center"
                                    }}
                              />


                        </View>
                  </ScrollView>
            );
      }
}

const styles = StyleSheet.create({
      view: {
            width: '100%',
            alignSelf: 'center',
            alignItems: 'center',
            justifyContent: 'center',
            flex: 1,
            padding: 25,
            backgroundColor: '#EEEEEE'
      },
      button: {
            borderRadius: 10,
      },
      name: {
            backgroundColor: '#EEEEEE',
            borderWidth: 2,
            borderColor: "#717171",
            borderTopRightRadius: 10,
            borderTopLeftRadius: 10,
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10,
            paddingLeft: 4,
            height: 50
      },
      image: {
            width: 100,
            height: 100,
            marginBottom: 18,
            borderRadius: 400 / 2
      },
      open: {
            position: "absolute",
            alignSelf: 'flex-end',
            bottom: 5,
            elevation: 3,
            backgroundColor: '#2292A4'
      }
});

