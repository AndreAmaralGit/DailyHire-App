import React, { Component, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Avatar, Button, Card, Title, Paragraph, TextInput } from 'react-native-paper';
import { UserContext } from '../UserContext';
import Modal from 'react-native-modal';
import { Rating, AirbnbRating } from 'react-native-ratings';
import AwesomeAlert from 'react-native-awesome-alerts';
import { IconButton } from 'react-native-paper';
import TextInput3 from '../components/TextInput3';
import {
      messageValidator
} from '../core/utils';

export default class OpenServicesWorker extends Component {

      static contextType = UserContext;

      handleOptionChange(event) {

            const user = this.context

      }

      constructor(props) {
            super(props);

            this.state = {
                  services: [],
                  clientModalVisibility: false,
                  clientID: '',
                  messageVisibility: false,
                  receiverID: '',
                  noServices: true,
                  messageVisibility: false,
                  message: { value: '', error: '' },
                  messageAlert: false,
            };

      }

      getData = () => {

            this.setState({
                  services: [], appliedAlert: false,
            })

            /************************** GET WORKER BY USER ID *************************/

            fetch('http://localhost:8080/workers/findWorkerbyUser', {
                  method: 'POST',
                  headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                        _id: this.context.user["_id"],
                  }),
            }).then((response) => {
                  return response.json();
            }).then((responseText) => {

                  /************************** GET SERVICES BY WORK AREA *************************/

                  fetch('http://localhost:8080/relations/findRelationbyWorker', {
                        method: 'POST',
                        headers: {
                              Accept: 'application/json',
                              'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                              worker: responseText[0]["_id"],
                              state: true
                        }),
                  }).then((response2) => {
                        return response2.json();
                  }).then((responseText2) => {

                        if (!(responseText2 && responseText2.length > 0)) {

                              this.setState({ noServices: true })

                        }

                        for (let i = 0; i < responseText2.length; i++) {


                              /************************** CHECK IF SERVICE IS OPEN *************************/

                              if (responseText2[i].service[0].state == 'Open') {

                                    this.setState(prevState => ({
                                          services: [...prevState.services, responseText2[i]]
                                    }))

                                    this.setState({ noServices: false })
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


      componentDidMount() {

            this.getData()

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
                              participant1: this.state.receiverID,
                              participant2: this.context.user["_id"],
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
                                    user: this.state.receiverID
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

      render() {

            return (

                  <ScrollView
                        contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', width: '100%', }}
                        showsVerticalScrollIndicator={false}
                        keyboardShouldPersistTaps="handled">
                        <View style={styles.view}>

                              {this.state.noServices ? <Text style={{ marginTop: 10 }}>No open services</Text> : null}

                              <FlatList
                                    data={this.state.services}
                                    keyExtractor={item => item._id}
                                    renderItem={({ item }) => {

                                          return (
                                                <View>

                                                      <Card style={styles.card}>
                                                            <Card.Content>

                                                                  <View >
                                                                        <Paragraph style={styles.paragraph}>Work Area</Paragraph>
                                                                        <Title style={styles.title}>{item.service[0].workArea}</Title>
                                                                  </View>

                                                                  <View style={{ flexDirection: "row" }}>

                                                                        <View style={{ flex: 1 }}>
                                                                              <Paragraph style={styles.paragraph}>Start Date</Paragraph>
                                                                              <Title style={styles.title}>{this.transformDate(item.service[0].startDate)}</Title>
                                                                        </View>

                                                                        <View style={{ flex: 1 }}>
                                                                              <Paragraph style={styles.paragraph}>End Date</Paragraph>
                                                                              <Title style={styles.title}>{this.transformDate(item.service[0].endDate)}</Title>
                                                                        </View>
                                                                  </View>

                                                                  <View >
                                                                        <Paragraph style={styles.paragraph}>Location</Paragraph>
                                                                        <Title style={styles.title}>{item.service[0].address} </Title>
                                                                  </View>

                                                                  <View >
                                                                        <Paragraph style={styles.paragraph}>Description</Paragraph>
                                                                        {item.service[0].description == '' ? <Text style={{ marginTop: 10, marginBottom: 10 }}>No description</Text> : <Title style={styles.title}>{item.service[0].description} </Title>}
                                                                  </View>

                                                                  <View >
                                                                        <Paragraph style={styles.paragraph}>Client</Paragraph>

                                                                        <View style={{ flexDirection: "row" }}>

                                                                              <TouchableOpacity onPress={() => this.setState({ clientModalVisibility: true, clientID: item })}>
                                                                                    <View style={{ flexDirection: "row" }}>
                                                                                          <Avatar.Image size={40} source={{ uri: 'http://192.168.1.69:8080/' + item.service[0].user[0].photo }} style={styles.photo} />

                                                                                          <View style={{ marginTop: 12 }}>
                                                                                                <Title style={styles.title}>{item.service[0].user[0].name}</Title>
                                                                                          </View>
                                                                                    </View>
                                                                              </TouchableOpacity>

                                                                              <IconButton
                                                                                    icon="message"
                                                                                    color={'#707070'}
                                                                                    size={25}
                                                                                    style={styles.open}
                                                                                    onPress={() => this.setState({ messageVisibility: true, receiverID: item.service[0].user[0]._id })}
                                                                              />

                                                                        </View>

                                                                  </View>



                                                            </Card.Content>

                                                      </Card>

                                                </View>

                                          )
                                    }}
                              />

                              {/******************************** MODALS  *************************************/}

                              <Modal
                                    isVisible={this.state.clientModalVisibility}
                                    onBackdropPress={() => this.setState({ clientModalVisibility: false })}
                              >

                                    {this.state.clientModalVisibility ?

                                          <View style={styles.clientModal}>

                                                <View style={{ alignSelf: 'center' }}>
                                                      <Avatar.Image size={65} source={{ uri: 'http://192.168.1.69:8080/' + this.state.clientID.service[0].user[0].photo }} style={styles.photo2} />
                                                </View>

                                                <Paragraph style={styles.paragraph}>Name</Paragraph>
                                                <Title style={styles.title}>{this.state.clientID.service[0].user[0].name}</Title>

                                                <Paragraph style={styles.paragraph}>Address</Paragraph>
                                                <Title style={styles.title}>{this.state.clientID.service[0].user[0].address}</Title>

                                                <Paragraph style={styles.paragraph}>Phone Number</Paragraph>
                                                <Title style={styles.title}>{this.state.clientID.service[0].user[0].phoneNumber}</Title>

                                                <Paragraph style={styles.paragraph}>Age</Paragraph>
                                                <Title style={styles.title}>{this.getAge(this.state.clientID.service[0].user[0].birthdate)}</Title>

                                                <Paragraph style={styles.paragraph}>Gender</Paragraph>
                                                <Title style={styles.title}>{this.state.clientID.service[0].user[0].gender}</Title>

                                                <Paragraph style={styles.paragraph}>Rating</Paragraph>
                                                <View style={{ flexDirection: "row" }}>
                                                      <Rating
                                                            type='custom'
                                                            imageSize={23}
                                                            tintColor='white'
                                                            readonly={true}
                                                            ratingBackgroundColor='#C0C0C0'
                                                            startingValue={this.getRating(this.state.clientID.service[0].user[0].ratingCounter, this.state.clientID.service[0].user[0].ratingTotal)}
                                                      />
                                                      <Title style={styles.ratingNumber}>{this.getRatingText(this.state.clientID.service[0].user[0].ratingCounter, this.state.clientID.service[0].user[0].ratingTotal)}</Title>
                                                </View>

                                                <View style={{ alignSelf: 'center', marginTop: 15 }}>
                                                      <Button
                                                            style={{ backgroundColor: '#D0D0D0' }}
                                                            onPress={() => this.setState({ clientModalVisibility: false })}
                                                      >
                                                            <Text style={{ color: 'white', fontWeight: "bold" }}>Close</Text>
                                                      </Button>
                                                </View>

                                          </View>

                                          : null}

                              </Modal>

                              <Modal
                                    isVisible={this.state.messageVisibility}
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
                                    show={this.state.messageAlert}
                                    showProgress={false}
                                    title="Message sent"
                                    closeOnTouchOutside={false}
                                    closeOnHardwareBackPress={false}
                                    showConfirmButton={true}
                                    confirmText="Ok"
                                    confirmButtonColor="#2292A4"
                                    onConfirmPressed={() => {
                                          this.setState({
                                                messageAlert: false,
                                                messageVisibility: false
                                          });
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
      view: {
            width: '100%',
            alignSelf: 'center',
            alignItems: 'center',
            justifyContent: 'flex-start',
            flex: 1,
            padding: 15,
            backgroundColor: '#EEEEEE'
      },
      card: {
            width: '100%',
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
      photo: {
            marginTop: 5,
            marginRight: 10
      },
      open: {
            marginTop: 5,
            marginLeft: 100,
      },
      clientModal: {
            width: '100%',
            height: '85%',
            backgroundColor: 'white',
            alignSelf: 'center',
            alignItems: 'flex-start',
            justifyContent: 'center',
            borderRadius: 20,
            paddingLeft: 30,
            paddingRight: 30,
      },
      photo2: {
            marginBottom: 15
      },
      ratingNumber: {
            bottom: 6,
            fontSize: 18,
            marginLeft: 10
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
});

