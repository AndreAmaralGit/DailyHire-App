import React, { Component, useContext } from 'react';
import { View, Text, StyleSheet, } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import TextInput2 from '../components/TextInput2';
import Calendar from '../components/Calendar';
import Address from '../components/Address';
import WorkArea from '../components/WorkArea';
import Button from '../components/Button';
import { UserContext } from '../UserContext';
import {
      startDateValidator,
      endDateValidator,
      addressValidator,
      workAreaValidator
} from '../core/utils';
import AwesomeAlert from 'react-native-awesome-alerts';


export default class CreateService extends Component {

      static contextType = UserContext;

      constructor(props) {
            super(props);

            this.state = {
                  description: { value: '', error: '' },
                  startDate: { value: '', error: '' },
                  endDate: { value: '', error: '' },
                  readOnly: true,
                  address: { value: '', error: '' },
                  selectedWorkArea: { value: '', error: '' },
                  showAlert: false
            };

      }

      handleOptionChange(event) {

            const user = this.context

      }


      startDateFunction(chosenDate) {
            this.setState({ startDate: { value: chosenDate } }),
                  this.setState({ readOnly: false })

      }

      updateState(data) {
            this.setState({ selectedWorkArea: { value: data } });
      }

      showAlert = () => {
            this.setState({ showAlert: true });
      };

      hideAlert = () => {
            this.setState({
                  showAlert: false
            });
            this.props.navigation.navigate('services');
      };

      _onCreatePressed = () => {

            const workAreaError = workAreaValidator(this.state.selectedWorkArea.value);
            const startDateError = startDateValidator(this.state.startDate.value);
            const endDateError = endDateValidator(this.state.endDate.value);
            const addressError = addressValidator(this.state.address.value);

            if (startDateError || endDateError || addressError || workAreaError) {
                  this.setState({ startDate: { value: this.state.startDate.value, error: startDateError } });
                  this.setState({ endDate: { value: this.state.endDate.value, error: endDateError } });
                  this.setState({ address: { value: this.state.address.value, error: addressError } });
                  this.setState({ selectedWorkArea: { value: this.state.selectedWorkArea.value, error: workAreaError } });
                  return;
            } else {

                  let dataBeforeStart = this.state.startDate.value.split("-"); //DD-MM-YYYY -> MM-DD-YYYY
                  let dataAfterStart = dataBeforeStart[1] + "-" + dataBeforeStart[0] + "-" + dataBeforeStart[2];

                  let dataBeforeEnd = this.state.endDate.value.split("-"); //DD-MM-YYYY -> MM-DD-YYYY
                  let dataAfterEnd = dataBeforeEnd[1] + "-" + dataBeforeEnd[0] + "-" + dataBeforeEnd[2];

                  let finalID = JSON.stringify(this.context.user["_id"]).replace(/['"]+/g, '');


                  fetch('http://localhost:8080/services/createService', {
                        method: 'POST',
                        headers: {
                              Accept: 'application/json',
                              'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                              workArea: this.state.selectedWorkArea.value,
                              startDate: dataAfterStart,
                              endDate: dataAfterEnd,
                              address: this.state.address.value,
                              description: this.state.description.value,
                              user: finalID
                        }),
                  }).then((response) => {
                        if (response.ok) {


                              this.showAlert();


                        }
                  }
                  ).catch(
                        function (error) {
                              console.error(error);
                        }
                  );
            }
      }

      updateAddress = (data) => {
            this.setState({ address: { value: data } });
      }

      render() {

            return (
                  <ScrollView
                        contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', width: '100%', }}
                        showsVerticalScrollIndicator={false}
                        keyboardShouldPersistTaps="always">
                        <View style={styles.view}>

                              <WorkArea
                                    updateParentState={this.updateState.bind(this)}
                                    error={!!this.state.selectedWorkArea.error}
                                    errorText={this.state.selectedWorkArea.error}
                              />



                              <Calendar
                                    placeholder="Start Date"
                                    minDate={new Date()}
                                    date={this.state.startDate.value}
                                    onDateChange={chosenDate => this.startDateFunction(chosenDate)}
                                    style={{ marginBottom: 12, width: '100%' }}
                                    error={!!this.state.startDate.error}
                                    errorText={this.state.startDate.error}
                              />

                              <Calendar
                                    disabled={this.state.readOnly}
                                    placeholder="End Date"
                                    minDate={this.state.startDate.value}
                                    date={this.state.endDate.value}
                                    onDateChange={chosenDate => this.setState({ endDate: { value: chosenDate } })}
                                    style={{ marginBottom: 8, width: '100%' }}
                                    error={!!this.state.endDate.error}
                                    errorText={this.state.endDate.error}
                              />

                              <Address
                                    onPress={(data, details = null) => {
                                          console.log(data);
                                          this.setState({ address: { value: data.description, error: '' } });
                                    }
                                    }
                                    onChangeText={text => this.setState({ address: { value: text, error: '' } })}
                                    error={!!this.state.address.error}
                                    errorText={this.state.address.error}
                                    updateAddressState={this.updateAddress.bind(this)}

                              />

                              <TextInput2
                                    placeholder="Description"
                                    value={this.state.description.value}
                                    onChangeText={text => this.setState({ description: { value: text, error: '' } })}
                                    theme={{ colors: { primary: 'tranparent' } }}
                                    multiline={true}
                                    numberOfLines={6}
                              />

                              <Button
                                    mode="contained"
                                    style={styles.button}
                                    onPress={this._onCreatePressed}>
                                    Create
                              </Button>

                              <AwesomeAlert
                                    show={this.state.showAlert}
                                    showProgress={false}
                                    title="Your service has been requested "
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
});