import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import Picker from 'react-native-simple-modal-picker';
import { theme } from '../core/theme';

export default class WorkArea extends Component {
      constructor(props) {
            super(props)
            this.state = {
                  selectedIndex: -1
            }

            this.data = [
                  {
                        name: 'Alfaiate',
                        value: '1'
                  },
                  {
                        name: 'Canalizador',
                        value: '2'
                  },
                  {
                        name: 'Carpinteiro',
                        value: '3'
                  },
                  {
                        name: 'Eletricista',
                        value: '4'
                  },
                  {
                        name: 'Estofador',
                        value: '5'
                  },
                  {
                        name: 'Estucador',
                        value: '6'
                  },
                  {
                        name: 'Jardineiro',
                        value: '7'
                  },
                  {
                        name: 'Ladrilhador',
                        value: '8'
                  },
                  {
                        name: 'Lenhador',
                        value: '9'
                  },
                  {
                        name: 'Marceneiro',
                        value: '10'
                  },
                  {
                        name: 'Marmorista',
                        value: '11'
                  },
                  {
                        name: 'Mecânico',
                        value: '12'
                  },
                  {
                        name: 'Pintor',
                        value: '13'
                  },
                  {
                        name: 'Sapateiro',
                        value: '14'
                  },
                  {
                        name: 'Serralheiro',
                        value: '15'
                  },
                  {
                        name: 'Vidraceiro',
                        value: '16'
                  },
            ]
      }

      render() {
            return (
                  <View style={{ width: '100%' }}>
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
            if (this.state.selectedIndex == -1) {
                  return 'Work Area';
            } else {
                  return this.data[this.state.selectedIndex].name
            }
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
                              onValueChange={(value, selectedIndex) => this.update(selectedIndex)} />
                        <View style={styles.subContainer}>
                              <TouchableOpacity style={styles.dropDownContainer}
                                    onPress={() => this.dropDownPicker.setModalVisible(true)}>
                                    <Text style={[(this.state.selectedIndex == '-1') ? styles.workAreaPlaceholder : styles.workArea]}>
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
            marginBottom: 22,

      },
      subContainer: {
            margin: 8,
      },
      dropDownContainer: {
            borderBottomWidth: 1,
            padding: 8,
            borderBottomWidth: 0,
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