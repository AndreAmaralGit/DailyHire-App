import React, { Component, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import { UserContext } from '../UserContext';

const LeftContentOpen = props => <Avatar.Icon {...props} icon="check-all" />
const LeftContentPending = props => <Avatar.Icon {...props} icon="account-clock" />
const LeftContentHistory = props => <Avatar.Icon {...props} icon="history" />

const MyServicesWorker = ({ navigation }) => {

      return (

            <View style={styles.view}>
                  <TouchableOpacity style={{ width: '100%' }} onPress={() => navigation.navigate('OpenServicesWorkerOption')}>
                        <Card style={styles.card}>
                              <Card.Title title="Open Services" left={LeftContentOpen} />

                        </Card>
                  </TouchableOpacity>

                  <TouchableOpacity style={{ width: '100%' }} onPress={() => navigation.navigate('PendingServicesWorkerOption')}>
                        <Card style={styles.card}>
                              <Card.Title title="Pending Services" left={LeftContentPending} />

                        </Card>
                  </TouchableOpacity>

                  <TouchableOpacity style={{ width: '100%' }} onPress={() => navigation.navigate('ServiceHistoryWorkerOption')}>
                        <Card style={styles.card}>
                              <Card.Title title="Service History" left={LeftContentHistory} />

                        </Card>
                  </TouchableOpacity>
            </View>

      )
};

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
      card: {
            width: '100%',
            padding: 15,
            marginVertical: 25,
            borderRadius: 20,
            elevation: 2
      }
});

export default MyServicesWorker;
