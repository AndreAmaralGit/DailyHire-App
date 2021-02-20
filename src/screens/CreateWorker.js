import React, { Component, useContext } from 'react';
import { View, Text, StyleSheet, } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import TextInput2 from '../components/TextInput2';
import Calendar from '../components/Calendar';
import Address from '../components/Address';
import WorkArea from '../components/WorkArea';
import Button from '../components/Button';
import { UserContext } from '../UserContext';
import Modal from 'react-native-modal';
import {
      workAreaValidator
} from '../core/utils';
import AwesomeAlert from 'react-native-awesome-alerts';
import TextInput3 from '../components/TextInput3';
import Loader from 'react-native-modal-loader';
import { NavigationEvents } from 'react-navigation';
import YearsExperience from '../components/YearsExperience';


export default class CreateWorker extends Component {

      static contextType = UserContext;

      constructor(props) {
            super(props);

            this.state = {
                  workArea: { value: '', error: '' },
                  experience: '',
                  showAlert: false,
                  isLoading: false,
                  isLoading2: false,
                  modal: true,
                  expYear: ''
            };

      }

      handleOptionChange(event) {

            const user = this.context

      }

      isWorker = () => {

            this.setState({ isLoading2: false })

            //this.props.navigation.navigate('WorkerTab');

      }

      componentDidMount() {

            if (this.context.user["workerState"] == true) {

                  this._navListener = this.props.navigation.addListener('didFocus', () => {
                        this.setState({ isLoading2: true })
                        setTimeout(() => {
                              this.isWorker()
                              this.props.navigation.navigate('WorkerTab');
                        }, 1000) // Stop the interval after 5s*/
                  });

            } else {

                  this._navListener = this.props.navigation.addListener('didFocus', () => {
                        this.setState({ modal: true })
                  });

            }

      }

      hideAlert = () => {
            this.setState({
                  showAlert: false
            });


            this.setState({ isLoading: true })
            setTimeout(() => {
                  this.setState({ isLoading: false, modal: false })
                  this.props.navigation.navigate('WorkerTab');
            }, 1000) // Stop the interval after 5s*/


      };

      updateState(data) {
            this.setState({ workArea: { value: data } });
      }

      updateState2(data) {
            this.setState({ expYear: data });
      }

      _onCreatePressed = () => {

            const workAreaError = workAreaValidator(this.state.workArea.value);

            if (workAreaError) {
                  this.setState({ workArea: { value: this.state.workArea.value, error: workAreaError } });
                  return;
            } else {

                  let finalExperience = 0;

                  if (!(this.state.expYear == '')) {

                        let currentYear = new Date().getFullYear();
                        finalExperience = currentYear - parseInt(this.state.expYear)

                  }

                  fetch('http://localhost:8080/workers/createWorker', {
                        method: 'POST',
                        headers: {
                              Accept: 'application/json',
                              'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                              user: this.context.user["_id"],
                              area: this.state.workArea.value,
                              experience: finalExperience
                        }),
                  }).then(response => response.json())
                        .then(response => {

                              this.setState({ showAlert: true })


                        }).catch(
                              function (error) {
                                    console.error(error);
                              })
            }

      }

      closeModal = () => {
            this.setState({ modal: false, workArea: { value: '', error: '' } })
            this.props.navigation.goBack(null)
      }




      render() {

            return (
                  <View style={styles.view}>

                        {this.context.user["workerState"] ? <Loader loading={this.state.isLoading2} color="#2292A4" /> :

                              <Modal
                                    isVisible={this.state.modal}
                                    onBackdropPress={() => this.closeModal()}
                              >
                                    <View style={styles.modal}>

                                          <Text style={{ fontSize: 25, fontWeight: 'bold', color: '#484848', marginBottom: 30 }}
                                          > Want to become a worker? </Text>

                                          <Loader loading={this.state.isLoading} color="#2292A4" />

                                          <WorkArea
                                                updateParentState={this.updateState.bind(this)}
                                                error={!!this.state.workArea.error}
                                                errorText={this.state.workArea.error}
                                          />

                                          <YearsExperience
                                                updateParentState2={this.updateState2.bind(this)}
                                          />

                                          <Button
                                                mode="contained"
                                                style={styles.button}
                                                onPress={() => this._onCreatePressed()}>
                                                Register
                                          </Button>

                                          <AwesomeAlert
                                                show={this.state.showAlert}
                                                showProgress={false}
                                                title="You became a worker"
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

                              </Modal>
                        }

                  </View>
            );
      }
}

const styles = StyleSheet.create({
      view: {
            width: '100%',
            alignSelf: 'flex-start',
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            flex: 1,
            padding: 25,
            backgroundColor: '#EEEEEE'
      },
      button: {
            marginTop: 20,
            borderRadius: 10,
      },
      modal: {
            width: '100%',
            backgroundColor: '#EEEEEE',
            alignSelf: 'center',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 20,
            padding: 30
      },
});