import React, { useState } from 'react';
import moment from "moment";
import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import { theme } from '../core/theme';
import DateTimePicker from '@react-native-community/datetimepicker';

const Birthdate = ({ errorText, ...props }) => {

      const ageRestrict = moment().subtract(18, "years");
      //const [date, setDate] = useState(new Date());
      const [mode, setMode] = useState('date');
      const [show, setShow] = useState(false);



      const showMode = (currentMode) => {
            setShow(true);
            setMode(currentMode);
      };

      const showDatepicker = () => {
            showMode('date');
      };

      return (
            <View style={{ width: '100%' }}>

                  <TouchableOpacity style={styles.container}
                        onPress={showDatepicker}>

                        <Text>teste</Text>

                        {show && (
                              <DateTimePicker
                                    testID="dateTimePicker"

                                    mode={mode}
                                    is24Hour={true}
                                    display="default"

                                    maximumDate={new Date(ageRestrict)}
                                    {...props}
                              />
                        )}

                        {errorText ? <Text style={styles.error}>{errorText}</Text> : null}

                  </TouchableOpacity>
            </View>
      )

};

const styles = StyleSheet.create({
      container: {
            width: '100%',
            backgroundColor: 'white',
            marginVertical: 12,
            borderTopRightRadius: 25,
            borderTopLeftRadius: 25,
            borderBottomLeftRadius: 25,
            borderBottomRightRadius: 25,
            height: 50,

      },
      error: {
            fontSize: 14,
            color: theme.colors.error,
            paddingHorizontal: 4,
            paddingTop: 4,
      },
});

export default Birthdate;