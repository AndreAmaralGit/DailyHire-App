import React, { useState } from 'react';
import DatePicker from 'react-native-datepicker';
import moment from "moment";
import { View, StyleSheet, Text } from 'react-native';
import { theme } from '../core/theme';

const Date = ({ errorText, ...props }) => {


      return (
            <View style={styles.container}>
                  <DatePicker
                        style={{
                              width: '100%',

                        }}

                        mode="date"
                        showIcon={false}
                        format="DD-MM-YYYY"
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        customStyles={{
                              dateInput: {
                                    alignItems: 'flex-start',
                                    padding: 5,
                                    borderWidth: 2,
                                    borderColor: "#717171",
                                    borderTopRightRadius: 10,
                                    borderTopLeftRadius: 10,
                                    borderBottomLeftRadius: 10,
                                    borderBottomRightRadius: 10,
                                    width: '100%',
                                    height: 50,
                                    marginBottom: 10,
                              },
                              dateText: {
                                    fontSize: 16,
                                    color: 'black',
                                    paddingLeft: 10,
                                    paddingRight: 10
                              },
                              placeholderText: {
                                    fontSize: 16,
                                    color: '#717171',
                                    paddingLeft: 10,
                                    paddingRight: 10
                              }
                        }}
                        {...props}
                  />
                  {errorText ? <Text style={styles.error}>{errorText}</Text> : null}
            </View>
      )

};

const styles = StyleSheet.create({
      container: {
            width: '100%',
            marginVertical: 12,
      },
      error: {
            fontSize: 14,
            color: theme.colors.error,
            paddingHorizontal: 4,
            paddingTop: 4,
      },
});

export default Date;