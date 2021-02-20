import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import Picker from 'react-native-simple-modal-picker';
import { theme } from '../core/theme';


export default class GenderPicker2 extends Component {
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

      UserMale = () => {
            this.setState({ selectedIndex: 0 })
      }

      UserFemale = () => {
            this.setState({ selectedIndex: 1 })
      }

      render() {
            return (
                  <View style={{ width: '100%', margin: 12 }}>
                        <View style={styles.container}>
                              {this.dropDownView()}

                        </View>
                        {this.props.errorText ? <Text style={styles.error}>{this.props.errorText}</Text> : null}
                  </View>
            );
      }

      update(res) {
            this.setState({ selectedIndex: res });
            this.props.updateParentState(this.data[res].name);
      }

      checkIndex() {

            return this.data[this.state.selectedIndex].name

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
                                    onPress={() => this.dropDownPicker.setModalVisible(true)}>
                                    <Text style={styles.workArea}>
                                          {this.checkIndex()}
                                    </Text>
                              </TouchableOpacity>
                        </View>

                  </View>
            )
      }
}

const styles = StyleSheet.create({
      container: {
            justifyContent: 'center',
            backgroundColor: '#EEEEEE',
            borderTopRightRadius: 10,
            borderTopLeftRadius: 10,
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10,
            borderWidth: 2,
            borderColor: "#717171",
            height: 50,
            width: '100%',
            marginBottom: 16,

      },
      subContainer: {
            margin: 8,
      },
      dropDownContainer: {
            borderBottomWidth: 1,
            padding: 8,
            borderBottomWidth: 0
      },
      workArea: {
            fontSize: 16,
            color: 'black',
      },
      workAreaPlaceholder: {
            fontSize: 16,
            color: '#717171',
      },
      error: {
            fontSize: 14,
            color: theme.colors.error,
            paddingHorizontal: 4,
            paddingTop: 0,
            marginBottom: 15
      },

});