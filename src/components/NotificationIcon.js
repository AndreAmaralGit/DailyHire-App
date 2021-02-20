import React, { Component } from 'react';
import { View, Text } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { UserContext } from '../UserContext';


export default class NotificationIcon extends Component {

      static contextType = UserContext;

      handleOptionChange(event) {

            const user = this.context

      }

      render() {
            return (
                  <View>

                        { this.context.user['showBadge'] ?
                              <View style={{ position: 'absolute', marginLeft: 10, bottom: 10, backgroundColor: '#ff4c4c', borderRadius: 9, width: 18, height: 18, justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={{ color: 'white' }}>{this.context.user['counter']}</Text>
                              </View> : null
                        }

                  </View>
            )
      }
};

