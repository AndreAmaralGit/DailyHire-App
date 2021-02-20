import React, { Component, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Button, Card, Title, Paragraph, TextInput } from 'react-native-paper';
import { UserContext } from '../UserContext';
import Modal from 'react-native-modal';
import { Rating, AirbnbRating } from 'react-native-ratings';
import AwesomeAlert from 'react-native-awesome-alerts';
import { IconButton } from 'react-native-paper';
import TextInput3 from '../components/TextInput3';
import {
      messageValidator
} from '../core/utils';
import { Icon } from 'react-native-elements';

export default class Notifications extends Component {

      static contextType = UserContext;

      handleOptionChange(event) {

            const user = this.context

      }

      constructor(props) {
            super(props);

            this.state = {
                  noNotifications: false,
                  listNotifications: []
            };

      }

      componentDidMount() {

            this._navListener = this.props.navigation.addListener('didFocus', () => {
                  this.setState({ listNotifications: [], noNotifications: true })
            });

            fetch('http://localhost:8080/notifications/findNotifications', {
                  method: 'POST',
                  headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                        user: this.context.user["_id"]
                  }),
            }).then((response) => {
                  return response.json();
            }).then((responseText) => {

                  if (!(responseText && responseText.length > 0)) {
                        this.setState({ noNotifications: true })
                  } else {
                        this.setState({ listNotifications: responseText, noNotifications: false })

                        /****************** CLEAR NOTIFICATIONS *******************/

                        fetch('http://localhost:8080/notifications/clearNotifications', {
                              method: 'POST',
                              headers: {
                                    Accept: 'application/json',
                                    'Content-Type': 'application/json',
                              },
                              body: JSON.stringify({
                                    user: this.context.user["_id"]
                              }),
                        }).then((response2) => {
                              return response2.json();
                        }).then((responseText2) => {




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


      render() {

            return (

                  <ScrollView
                        contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', width: '100%', }}
                        showsVerticalScrollIndicator={false}
                        keyboardShouldPersistTaps="handled">
                        <View style={styles.view}>

                              {this.state.noNotifications ? <Text style={{ marginTop: 10, alignSelf: 'center' }}> No notifications</Text> :

                                    <FlatList
                                          data={this.state.listNotifications}
                                          keyExtractor={item => item._id}
                                          renderItem={({ item }) => {

                                                return (
                                                      <View style={{ marginBottom: 15 }}>

                                                            <View style={{ flexDirection: "row" }}>

                                                                  {(item.content == 'You have a new message') ?
                                                                        <Icon
                                                                              raised
                                                                              name='envelope'
                                                                              type='font-awesome'
                                                                              color='#2a9df4'
                                                                              reverse={true}
                                                                              reverseColor='white'
                                                                        />
                                                                        : null}

                                                                  {(item.content == 'A worker applied for your service') ?
                                                                        <Icon
                                                                              raised
                                                                              name='user'
                                                                              type='font-awesome'
                                                                              color='#aa66cc'
                                                                              reverse={true}
                                                                              reverseColor='white'
                                                                        />
                                                                        : null}

                                                                  {(item.content == 'Your service is over, you can evaluate your client') ?
                                                                        <Icon
                                                                              raised
                                                                              name='tools'
                                                                              type='font-awesome-5'
                                                                              color='#f0ad4e'
                                                                              reverse={true}
                                                                              reverseColor='white'
                                                                        />
                                                                        : null}

                                                                  {(item.content == 'A service you applied for has been approved') ?
                                                                        <Icon
                                                                              raised
                                                                              name='thumbs-up'
                                                                              type='font-awesome'
                                                                              color='#5cb85c'
                                                                              reverse={true}
                                                                              reverseColor='white'
                                                                        />
                                                                        : null}

                                                                  {(item.content == 'A service you applied for has been canceled') ?
                                                                        <Icon
                                                                              raised
                                                                              name='ban'
                                                                              type='font-awesome'
                                                                              color='#d9534f'
                                                                              reverse={true}
                                                                              reverseColor='white'
                                                                        />
                                                                        : null}

                                                                  <View style={{
                                                                        marginTop: 10, marginLeft: 10, width: '80%', justifyContent: 'center',
                                                                  }}>
                                                                        <Title style={styles.title}>{item.content}</Title>
                                                                  </View>
                                                            </View>

                                                            <View
                                                                  style={{
                                                                        borderBottomColor: 'gray',
                                                                        borderBottomWidth: 1,
                                                                        marginLeft: 70,
                                                                        width: '75%',
                                                                        marginTop: 5
                                                                  }}
                                                            />

                                                      </View>

                                                )
                                          }}
                                    />

                              }


                        </View>

                  </ScrollView>



            )
      }
};

const styles = StyleSheet.create({
      view: {
            width: '100%',
            alignSelf: 'flex-start',
            alignItems: 'flex-start',
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
            fontSize: 15,
            flexShrink: 1,
            color: '#585858'
      },
      photo: {
            marginTop: 5,
            marginRight: 10
      },
      photo2: {
            marginBottom: 15
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
      open: {
            marginTop: 5,
            marginLeft: 130,
      },
});

{/* 
                              <FlatList
                                    data={this.state.listServices}
                                    keyExtractor={item => item._id}
                                    renderItem={({ item }) => {

                                          return (
                                                <View>

                                                      <Card style={styles.card}>
                                                            <Card.Content>

                                                                 



                                                            </Card.Content>

                                                      </Card>

                                                </View>

                                          )
                                    }}
                              />*/}