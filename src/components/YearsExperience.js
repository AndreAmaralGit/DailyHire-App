import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import Picker from 'react-native-simple-modal-picker';
import { theme } from '../core/theme';
import { UserContext } from '../UserContext';

export default class YearsExperience extends Component {

      static contextType = UserContext;

      handleOptionChange(event) {

            const user = this.context

      }


      constructor(props) {
            super(props)
            this.state = {
                  selectedIndex: -1,
                  data: []
            }

      }

      componentDidMount() {

            let birthdate = (this.context.user["birthdate"]).substring(0, 10);
            let dateSplit = birthdate.split("-");
            let startingdate = parseInt(dateSplit[0]) + 18;

            let currentYear = new Date().getFullYear();

            for (let i = 0; i <= (currentYear - startingdate); i++) {

                  this.setState(prevState => ({
                        data: [...prevState.data, { name: startingdate + i, value: i + 1 }]
                  }))

            }

      }

      render() {
            return (
                  <View style={{ width: '100%' }}>
                        <View style={styles.container}>
                              {this.dropDownView()}

                        </View>
                  </View>
            );
      }

      update(res) {
            this.setState({ selectedIndex: res });
            this.props.updateParentState2(this.state.data[res].name);
      }

      checkIndex() {
            if (this.state.selectedIndex == -1) {
                  return 'When you start working...';
            } else {
                  return this.state.data[this.state.selectedIndex].name
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
                              data={this.state.data}
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
            marginBottom: 15,
            marginTop: 15

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