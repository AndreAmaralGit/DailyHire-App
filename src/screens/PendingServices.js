import React, { Component, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Avatar, Button, Card, Title, Paragraph, TextInput } from 'react-native-paper';
import { UserContext } from '../UserContext';
import Modal from 'react-native-modal';
import { Rating, AirbnbRating } from 'react-native-ratings';
import AwesomeAlert from 'react-native-awesome-alerts';
import { IconButton, RadioButton } from 'react-native-paper';
import TextInput3 from '../components/TextInput3';
import {
      messageValidator
} from '../core/utils';


export default class PendingServices extends Component {

      static contextType = UserContext;

      handleOptionChange(event) {

            const user = this.context

      }

      constructor(props) {
            super(props);

            this.state = {
                  listServices: [],
                  listCandidates: [],
                  cancelVisibility: false,
                  alertCanceled: false,
                  candidatesModal: false,
                  noServices: false,
                  workerModalVisibility: false,
                  messageVisibility: false,
                  workerValues: [],
                  cancelServiceID: '',
                  idMessageReceiver: '',
                  message: { value: '', error: '' },
                  messageAlert: false,
                  checked: 'first',
                  approveButton: true,
                  approvedService: '',
                  approvedAlert: false,
                  notificationReceiver: ''


            };

      }

      functionN = (n) => {
            return n > 9 ? "" + n : "0" + n;
      }

      transformDate = (date) => {
            let dateToSplit = date.substring(0, 10);
            let dateSplit = dateToSplit.split("-");
            return this.functionN(+dateSplit[2]) + "-" + dateSplit[1] + "-" + dateSplit[0];
      }

      getAge(dateString) {
            var today = new Date();
            var birthDate = new Date(dateString);
            var age = today.getFullYear() - birthDate.getFullYear();
            var m = today.getMonth() - birthDate.getMonth();
            if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
                  age--;
            }
            return age;
      }

      getRating(counter, total) {
            if (!(counter == null)) {

                  return (total / counter).toFixed(2)

            } else {
                  return 0
            }
      }

      getRatingText(counter, total) {
            if (!(counter == null)) {

                  return (total / counter).toFixed(2);

            } else {
                  return 'No evaluations'
            }
      }

      getData = () => {

            this.setState({ listServices: [], alertCanceled: false, cancelVisibility: false });

            fetch('http://localhost:8080/services/clientServices', {
                  method: 'POST',
                  headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                        user: this.context.user["_id"],
                        state: 'Pending'
                  }),
            }).then((response) => {
                  return response.json();
            }).then((responseText) => {

                  if (!(responseText && responseText.length > 0)) {
                        this.setState({ noServices: true })
                  } else {

                        this.setState(prevState => ({
                              listServices: [...prevState.listServices, responseText]
                        }))


                  }




            }).catch(
                  function (error) {
                        console.error(error);
                  }
            );

      }

      componentDidMount() {

            this.getData();

      }

      cancelService = (serviceID) => {

            fetch('http://localhost:8080/services/cancelService', {
                  method: 'POST',
                  headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                        _id: serviceID,
                        state: 'Canceled'
                  }),
            }).then((response) => {
                  return response.json();
            }).then((responseText) => {

                  /****************** GET ALL WORKERS THAT APPLIED TO THAT SERVICE *************************/

                  fetch('http://localhost:8080/relations/listRelations', {
                        method: 'POST',
                        headers: {
                              Accept: 'application/json',
                              'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                              service: serviceID,
                              state: false
                        }),
                  }).then((response2) => {
                        return response2.json();
                  }).then((responseText2) => {

                        if (!(responseText2 && responseText2.length > 0)) {

                        } else {

                              for (let i = 0; i < responseText2.length; i++) {

                                    /****************** SEND NOTIFICATION TO EACH WORKER  ************************************/

                                    fetch('http://localhost:8080/notifications/createNotification', {
                                          method: 'POST',
                                          headers: {
                                                Accept: 'application/json',
                                                'Content-Type': 'application/json',
                                          },
                                          body: JSON.stringify({
                                                content: "A service you applied for has been canceled",
                                                user: responseText2[i].worker[0].user[0]._id
                                          }),
                                    }).then((response3) => {
                                          return response3.text();
                                    }).then((responseText3) => {

                                          this.setState({ alertCanceled: true });

                                    }).catch(
                                          function (error) {
                                                console.error(error);
                                          }
                                    );


                              }


                        }

                  }).catch(
                        function (error) {
                              console.error(error);
                        }
                  );

            }).catch(
                  function (error) {
                        console.error(error);
                  }
            );

      }

      seeCandidates = (serviceID) => {

            this.setState({ candidatesModal: true, approvedService: serviceID })

            fetch('http://localhost:8080/relations/listRelations', {
                  method: 'POST',
                  headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                        service: serviceID,
                        state: false
                  }),
            }).then((response) => {
                  return response.json();
            }).then((responseText) => {

                  this.setState({ listCandidates: responseText })

            }).catch(
                  function (error) {
                        console.error(error);
                  }
            );

      }

      sendMessage = () => {

            const messageError = messageValidator(this.state.message.value);

            if (messageError) {

                  this.setState({ message: { value: this.state.message.value, error: messageError } });
                  return;

            } else {

                  fetch('http://localhost:8080/chats/createChat', {
                        method: 'POST',
                        headers: {
                              Accept: 'application/json',
                              'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                              participant1: this.context.user["_id"],
                              participant2: this.state.idMessageReceiver,
                              content: this.context.user["name"] + ": " + this.state.message.value

                        }),
                  }).then((response2) => {
                        return response2.json();
                  }).then((responseText2) => {


                        fetch('http://localhost:8080/notifications/createNotification', {
                              method: 'POST',
                              headers: {
                                    Accept: 'application/json',
                                    'Content-Type': 'application/json',
                              },
                              body: JSON.stringify({
                                    content: "You have a new message",
                                    user: this.state.idMessageReceiver
                              }),
                        }).then((response3) => {
                              return response3.text();
                        }).then((responseText3) => {

                              this.setState({ message: { value: '' }, messageAlert: true })

                        }).catch(
                              function (error) {
                                    console.error(error);
                              }
                        );


                  }).catch(
                        function (error) {
                              console.error(error);
                        }
                  );

            }

      }

      approveWorker = () => {

            fetch('http://localhost:8080/relations/updateRelation', {
                  method: 'POST',
                  headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                        _id: this.state.checked,
                        service: this.state.approvedService,
                        state: 'Open'

                  }),
            }).then((response2) => {
                  return response2.json();
            }).then((responseText2) => {


                  fetch('http://localhost:8080/notifications/createNotification', {
                        method: 'POST',
                        headers: {
                              Accept: 'application/json',
                              'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                              content: "A service you applied for has been approved",
                              user: this.state.notificationReceiver
                        }),
                  }).then((response3) => {
                        return response3.text();
                  }).then((responseText3) => {

                        this.setState({ approvedAlert: true })

                  }).catch(
                        function (error) {
                              console.error(error);
                        }
                  );


            }).catch(
                  function (error) {
                        console.error(error);
                  }
            );



      }

      closeApproved = () => {

            this.setState({ approvedAlert: false, candidatesModal: false });

            this.getData()

      }

      render() {

            return (

                  <ScrollView
                        contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', width: '100%', }}
                        showsVerticalScrollIndicator={false}
                        keyboardShouldPersistTaps="handled">
                        <View style={styles.view2}>

                              {this.state.noServices ? <Text style={{ marginTop: 10 }}> No pending services</Text> : null}

                              <FlatList
                                    data={this.state.listServices[0]}
                                    keyExtractor={item => item._id}
                                    renderItem={({ item }) => {

                                          return (
                                                <View>

                                                      <Card style={styles.card2}>
                                                            <Card.Content>

                                                                  <View >
                                                                        <Paragraph style={styles.paragraph}>Work Area</Paragraph>
                                                                        <Title style={styles.title}>{item.workArea}</Title>
                                                                  </View>

                                                                  <View style={{ flexDirection: "row" }}>

                                                                        <View style={{ flex: 1 }}>
                                                                              <Paragraph style={styles.paragraph}>Start Date</Paragraph>
                                                                              <Title style={styles.title}>{this.transformDate(item.startDate)}</Title>
                                                                        </View>

                                                                        <View style={{ flex: 1 }}>
                                                                              <Paragraph style={styles.paragraph}>End Date</Paragraph>
                                                                              <Title style={styles.title}>{this.transformDate(item.endDate)}</Title>
                                                                        </View>
                                                                  </View>

                                                                  <View >
                                                                        <Paragraph style={styles.paragraph}>Location</Paragraph>
                                                                        <Title style={styles.title}>{item.address} </Title>
                                                                  </View>

                                                                  <View >
                                                                        <Paragraph style={styles.paragraph}>Description</Paragraph>
                                                                        {item.description == '' ? <Text style={{ marginTop: 10, marginBottom: 10 }}>No description</Text> : <Title style={styles.title}>{item.description} </Title>}
                                                                  </View>


                                                            </Card.Content>

                                                            <Card.Actions >

                                                                  <View style={{ flexDirection: "row" }}>

                                                                        <View style={{ flex: 1 }}>
                                                                              <Button onPress={() => this.setState({ cancelVisibility: true, cancelServiceID: item._id })}>
                                                                                    <Text style={{ color: '#ff7f7f', fontSize: 13 }}> Cancel Service</Text>
                                                                              </Button>
                                                                        </View>

                                                                        <View style={{ flex: 1, marginRight: 10 }}>
                                                                              <Button onPress={() => this.seeCandidates(item._id)}>
                                                                                    <Text style={{ fontSize: 13 }}> Choose Worker</Text>
                                                                              </Button>
                                                                        </View>

                                                                  </View>

                                                            </Card.Actions>

                                                      </Card>

                                                </View>

                                          )
                                    }}
                              />

                              {/******************************** MODALS  *************************************/}

                              <Modal
                                    isVisible={this.state.cancelVisibility}
                                    onBackdropPress={() => this.setState({ cancelVisibility: false })}
                              >
                                    <View style={styles.cancelModal}>

                                          <Text style={{ fontSize: 25, fontWeight: 'bold', color: '#484848' }}
                                          > Are you sure? </Text>

                                          <Text style={{ fontSize: 16, color: '#484848', marginTop: 10 }}
                                          > You won't be able to revert this! </Text>

                                          <View style={{ flexDirection: "row", marginTop: 20 }}>


                                                <Button
                                                      style={{ backgroundColor: '#D0D0D0', flex: 1, marginRight: 15 }}
                                                      onPress={() => this.setState({ cancelVisibility: false })}
                                                >
                                                      <Text style={{ color: 'white', fontWeight: "bold" }}>Close</Text>
                                                </Button>

                                                <Button
                                                      style={{ backgroundColor: '#ff7f7f', flex: 1, marginRight: 15 }}
                                                      onPress={() => this.cancelService(this.state.cancelServiceID)}
                                                >
                                                      <Text style={{ color: 'white', fontWeight: "bold" }}>Delete</Text>
                                                </Button>

                                          </View>
                                    </View>
                              </Modal>


                              <Modal
                                    isVisible={this.state.candidatesModal}
                                    onBackdropPress={() => this.setState({ candidatesModal: false, approveButton: true, checked: 'first' })}
                              >
                                    <View style={styles.candidatesModal}>

                                          <Text style={{ fontSize: 25, fontWeight: 'bold', color: '#484848', marginBottom: 20, alignSelf: 'center' }}
                                          > Candidate Workers </Text>

                                          {(!(this.state.listCandidates && this.state.listCandidates.length > 0)) ? <Text style={{ marginTop: 10, marginBottom: 10, alignSelf: 'center' }}> No workers have yet applied for your service</Text> :

                                                <FlatList
                                                      data={this.state.listCandidates}
                                                      keyExtractor={item => item._id}
                                                      renderItem={({ item }) => {
                                                            return (
                                                                  <View style={{ flex: 1, flexDirection: "row", marginVertical: 5, width: '92%', justifyContent: 'space-between' }}>

                                                                        <View style={{ flexDirection: "row", flex: 1 }}>
                                                                              <View style={{ marginTop: 7, }}>
                                                                                    <RadioButton
                                                                                          value={item._id}
                                                                                          status={this.state.checked === item._id ? 'checked' : 'unchecked'}
                                                                                          onPress={() => this.setState({ checked: item._id, approveButton: false, notificationReceiver: item.worker[0].user[0]._id })}
                                                                                          color={'#2292A4'}
                                                                                    />
                                                                              </View>


                                                                              <TouchableOpacity onPress={() => this.setState({ workerModalVisibility: true, workerValues: item })} >
                                                                                    <View style={{ flexDirection: "row", }}>
                                                                                          <Avatar.Image size={40} source={{ uri: 'http://192.168.1.69:8080/' + item.worker[0].user[0].photo }} style={styles.photo} />

                                                                                          <View style={{ marginTop: 12 }}>
                                                                                                <Title style={styles.title}>{item.worker[0].user[0].name}</Title>
                                                                                          </View>
                                                                                    </View>
                                                                              </TouchableOpacity>
                                                                        </View>

                                                                        <View style={{ marginTop: 3, flex: 1 }}>
                                                                              <IconButton
                                                                                    icon="message"
                                                                                    color={'#707070'}
                                                                                    size={25}
                                                                                    style={styles.open}
                                                                                    onPress={() => this.setState({ idMessageReceiver: item.worker[0].user[0]._id, messageVisibility: true })}
                                                                              />
                                                                        </View>



                                                                  </View>
                                                            )
                                                      }}
                                                />

                                          }

                                          <View style={{ alignSelf: 'center', flexDirection: "row" }}>

                                                <Button
                                                      style={{ backgroundColor: '#D0D0D0', marginTop: 20, flex: 1 }}
                                                      onPress={() => this.setState({ candidatesModal: false, approveButton: true, checked: 'first' })}
                                                >
                                                      <Text style={{ color: 'white', fontWeight: "bold" }}>Close</Text>
                                                </Button>

                                                <Button
                                                      style={[this.state.approveButton ? { backgroundColor: '#D0D0D0', flex: 1, marginTop: 20, marginLeft: 15 } : { backgroundColor: '#2292A4', flex: 1, marginTop: 20, marginLeft: 15 }]}
                                                      disabled={this.state.approveButton}
                                                      onPress={() => this.approveWorker()}
                                                >
                                                      <Text style={{ color: 'white', fontWeight: "bold" }}>Approve</Text>
                                                </Button>

                                          </View>

                                    </View>
                              </Modal>

                              <Modal
                                    isVisible={this.state.workerModalVisibility}
                                    backdropOpacity={0.2}
                                    onBackdropPress={() => this.setState({ workerModalVisibility: false })}
                              >
                                    {this.state.workerModalVisibility ?

                                          <View style={styles.workerModal}>



                                                <View style={{ alignSelf: 'center' }}>
                                                      <Avatar.Image size={65} source={{ uri: 'http://192.168.1.69:8080/' + this.state.workerValues.worker[0].user[0].photo }} style={styles.photo2} />
                                                </View>

                                                <Paragraph style={styles.paragraph}>Name</Paragraph>
                                                <Title style={styles.title}>{this.state.workerValues.worker[0].user[0].name}</Title>

                                                <Paragraph style={styles.paragraph}>Address</Paragraph>
                                                <Title style={styles.title}>{this.state.workerValues.worker[0].user[0].address}</Title>

                                                <Paragraph style={styles.paragraph}>Phone Number</Paragraph>
                                                <Title style={styles.title}>{this.state.workerValues.worker[0].user[0].phoneNumber}</Title>

                                                <Paragraph style={styles.paragraph}>Age</Paragraph>
                                                <Title style={styles.title}>{this.getAge(this.state.workerValues.worker[0].user[0].birthdate)}</Title>

                                                <Paragraph style={styles.paragraph}>Gender</Paragraph>
                                                <Title style={styles.title}>{this.state.workerValues.worker[0].user[0].gender}</Title>

                                                <Paragraph style={styles.paragraph}>Work Area</Paragraph>
                                                <Title style={styles.title}>{this.state.workerValues.worker[0].area}</Title>

                                                <Paragraph style={styles.paragraph}>Experience</Paragraph>
                                                <Title style={styles.title}>{this.state.workerValues.worker[0].experience} years</Title>

                                                <Paragraph style={styles.paragraph}>Rating</Paragraph>
                                                <View style={{ flexDirection: "row" }}>
                                                      <Rating
                                                            type='custom'
                                                            imageSize={23}
                                                            tintColor='white'
                                                            readonly={true}
                                                            ratingBackgroundColor='#C0C0C0'
                                                            startingValue={this.getRating(this.state.workerValues.worker[0].ratingCounter, this.state.workerValues.worker[0].ratingTotal)}
                                                      />
                                                      <Title style={styles.ratingNumber}>{this.getRatingText(this.state.workerValues.worker[0].ratingCounter, this.state.workerValues.worker[0].ratingTotal)}</Title>
                                                </View>

                                                <View style={{ alignSelf: 'center', marginTop: 10 }}>
                                                      <Button
                                                            style={{ backgroundColor: '#D0D0D0' }}
                                                            onPress={() => this.setState({ workerModalVisibility: false })}
                                                      >
                                                            <Text style={{ color: 'white', fontWeight: "bold" }}>Close</Text>
                                                      </Button>
                                                </View>

                                          </View>

                                          : null}


                              </Modal>

                              <Modal
                                    isVisible={this.state.messageVisibility}
                                    backdropOpacity={0.2}
                                    onBackdropPress={() => this.setState({ messageVisibility: false, message: { value: '' } })}
                              >
                                    <View style={styles.messageModal}>

                                          <TextInput3
                                                placeholder="Type your message here..."
                                                value={this.state.message.value}
                                                onChangeText={text => this.setState({ message: { value: text } })}
                                                theme={{ colors: { primary: 'tranparent' } }}
                                                multiline={true}
                                                numberOfLines={6}
                                                error={!!this.state.message.error}
                                                errorText={this.state.message.error}
                                          />

                                          <View style={{ flexDirection: "row", marginTop: 20 }}>

                                                <Button
                                                      style={{ backgroundColor: '#2292A4', flex: 1, marginRight: 15 }}
                                                      onPress={() => this.sendMessage()}
                                                >
                                                      <Text style={{ color: 'white', fontWeight: "bold" }}>Send</Text>
                                                </Button>

                                                <Button
                                                      style={{ backgroundColor: '#D0D0D0', flex: 1 }}
                                                      onPress={() => this.setState({ messageVisibility: false, message: { value: '' } })}
                                                >
                                                      <Text style={{ color: 'white', fontWeight: "bold" }}>Close</Text>
                                                </Button>

                                          </View>
                                    </View>
                              </Modal>

                              <AwesomeAlert
                                    show={this.state.alertCanceled}
                                    showProgress={false}
                                    title="Your service has been canceled"
                                    closeOnTouchOutside={false}
                                    closeOnHardwareBackPress={false}
                                    showConfirmButton={true}
                                    confirmText="Ok"
                                    confirmButtonColor="#2292A4"
                                    onConfirmPressed={() =>
                                          this.getData()
                                    }
                                    confirmButtonStyle={{
                                          width: 50,
                                    }}
                                    confirmButtonTextStyle={{
                                          alignSelf: 'center',
                                          alignItems: 'center',
                                          justifyContent: 'center',
                                    }}
                              />

                              <AwesomeAlert
                                    show={this.state.messageAlert}
                                    showProgress={false}
                                    title="Message sent"
                                    closeOnTouchOutside={false}
                                    closeOnHardwareBackPress={false}
                                    showConfirmButton={true}
                                    confirmText="Ok"
                                    confirmButtonColor="#2292A4"
                                    onConfirmPressed={() => {
                                          this.setState({ messageAlert: false, messageVisibility: false })
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

                              <AwesomeAlert
                                    show={this.state.approvedAlert}
                                    showProgress={false}
                                    title="Your service has been approved"
                                    closeOnTouchOutside={false}
                                    closeOnHardwareBackPress={false}
                                    showConfirmButton={true}
                                    confirmText="Ok"
                                    confirmButtonColor="#2292A4"
                                    onConfirmPressed={() => {
                                          this.closeApproved()
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

                        </View>

                  </ScrollView>



            )
      }
};

const styles = StyleSheet.create({
      view2: {
            alignSelf: 'stretch',
            alignItems: 'center',
            justifyContent: 'flex-start',
            flex: 1,
            padding: 15,
            backgroundColor: '#EEEEEE'
      },
      card2: {

            padding: 15,
            marginVertical: 10,
            borderRadius: 20,
            elevation: 2
      },
      paragraph: {
            color: '#707070',
            fontSize: 13,
            marginBottom: -2
      },
      title: {
            bottom: 4,
            fontSize: 18
      },
      cancelModal: {
            width: '100%',
            backgroundColor: 'white',
            alignSelf: 'center',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 20,
            padding: 30
      },
      open: {
            marginTop: 5,

      },
      photo: {
            marginTop: 5,
            marginRight: 10
      },
      workerModal: {
            width: '100%',
            height: '100%',
            backgroundColor: 'white',
            alignSelf: 'center',
            alignItems: 'flex-start',
            justifyContent: 'center',
            borderRadius: 20,
            paddingLeft: 30,
            paddingRight: 30,
      },
      messageModal: {
            width: '100%',
            backgroundColor: 'white',
            alignSelf: 'center',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 20,
            padding: 30
      },
      candidatesModal: {
            width: '100%',
            backgroundColor: 'white',
            alignSelf: 'flex-start',
            alignItems: 'flex-start',
            borderRadius: 20,
            padding: 30
      }
});