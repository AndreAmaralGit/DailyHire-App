import React, { useState } from 'react';
import DatePicker from 'react-native-datepicker';
import moment from "moment";
import { View, StyleSheet, Text } from 'react-native';
import { theme } from '../core/theme';

const Birthdate = ({ errorText, ...props }) => {

      const ageRestrict = moment().subtract(18, "years");

      return (
            <View style={styles.container}>
                  <DatePicker
                        style={{
                              padding: 10,
                              width: '100%',
                              backgroundColor: '#ffffff',
                              borderTopRightRadius: 25,
                              borderTopLeftRadius: 25,
                              borderBottomLeftRadius: 25,
                              borderBottomRightRadius: 25,
                              height: 50,
                        }}

                        mode="date"
                        showIcon={false}
                        placeholder="Birthdate"
                        format="DD-MM-YYYY"
                        minDate="01-01-1950"
                        maxDate={new Date(ageRestrict)}
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        customStyles={{
                              dateInput: {
                                    alignItems: 'flex-start',
                                    padding: 5,
                                    borderWidth: 0,
                                    marginBottom: 10,
                              },
                              dateText: {
                                    fontSize: 16,
                                    color: 'black'
                              },
                              placeholderText: {
                                    fontSize: 16,
                                    color: '#717171'
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

export default Birthdate;