import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import Picker from 'react-native-simple-modal-picker'

export default class GenderPicker extends Component {
      constructor(props) {
            super(props)
            this.state = {
                  selectedIndex: 0
            }
            this.data = [
                  {
                        name: 'Male',
                        value: '1'
                  },
                  {
                        name: 'Female',
                        value: '2'
                  },
            ]
      }

      render() {
            return (
                  <View style={styles.container}>
                        {this.dropDownView()}
                  </View>
            );
      }

      update(selectedIndex) {
            this.setState({ selectedIndex });
            this.props.updateParentState(selectedIndex);
      }

      dropDownView() {
            return (
                  <View style={{
                        width: '100%',
                        marginVertical: 12,
                  }}>
                        <Picker
                              ref={instance => this.dropDownPicker = instance}
                              data={this.data}
                              label={'name'}
                              value={'value'}
                              underlineColorAndroid='transparent'
                              onValueChange={(value, selectedIndex) => this.update(selectedIndex)}
                              style={styles.picker} />
                        <View style={styles.subContainer}>
                              <TouchableOpacity style={styles.dropDownContainer}
                                    onPress={() => this.dropDownPicker.setModalVisible(true)}
                              >
                                    <Text style={styles.gender}>
                                          {this.data[this.state.selectedIndex].name}
                                    </Text>
                              </TouchableOpacity>
                        </View>
                  </View>
            )
      }
}

const styles = StyleSheet.create({
      container: {
            flex: 1,
            justifyContent: 'center',
            backgroundColor: '#ffffff',
            borderTopRightRadius: 25,
            borderTopLeftRadius: 25,
            borderBottomLeftRadius: 25,
            borderBottomRightRadius: 25,
            height: 50,
            width: '100%',
            marginVertical: 12,
      },
      subContainer: {
            margin: 8,
      },
      dropDownContainer: {
            borderBottomWidth: 1,
            padding: 8,
            borderBottomWidth: 0
      },
      gender: {
            fontSize: 16,
            color: 'black',
      },

});