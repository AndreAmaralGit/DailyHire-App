import * as React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { theme } from '../core/theme';
import { useState } from 'react';

const GOOGLE_PLACES_API_KEY = 'YOUR_API_KEY'; // Place here your google maps API key

const GooglePlaces = ({ errorText, ...props }) => {

      const onTextInputChange = function (event) {
            props.updateAddressState(event.nativeEvent.text);
      };

      return (
            <View style={styles.container}>
                  <GooglePlacesAutocomplete
                        placeholder='Address'
                        query={{
                              key: GOOGLE_PLACES_API_KEY,
                              language: 'en', // language of the results
                        }}
                        textInputProps={{
                              placeholderTextColor: '#717171',
                              onChange: onTextInputChange
                        }}
                        onFail={(error) => console.error(error)}
                        currentLocation={false}
                        enablePoweredByContainer={false}
                        returnKeyType={'search'}
                        styles={{
                              textInputContainer: {
                                    backgroundColor: 'rgba(0,0,0,0)',
                                    borderTopRightRadius: 25,
                                    borderTopLeftRadius: 25,
                                    borderBottomLeftRadius: 25,
                                    borderBottomRightRadius: 25,
                                    marginBottom: 10

                              },
                              textInput: {
                                    marginLeft: 0,
                                    marginRight: 0,
                                    height: 50,
                                    color: 'black',
                                    fontSize: 16,
                                    borderTopRightRadius: 25,
                                    borderTopLeftRadius: 25,
                                    borderBottomLeftRadius: 25,
                                    borderBottomRightRadius: 25,
                              },
                              description: {
                                    fontWeight: 'bold',
                                    color: 'black',
                              },
                              row: {
                                    backgroundColor: 'rgba(0,0,0,0)'
                              }
                        }}
                        {...props}
                  />
                  {errorText ? <Text style={styles.error}>{errorText}</Text> : null}
            </View>
      );
};

const styles = StyleSheet.create({
      container: {
            flex: 1,
            justifyContent: 'center',
            paddingTop: 0,
            backgroundColor: 'rgba(0,0,0,0)',
            width: '100%',
            marginTop: 15

      },
      error: {
            fontSize: 14,
            color: theme.colors.error,
            paddingHorizontal: 4,
            paddingTop: 4,
      },
});

export default GooglePlaces;
