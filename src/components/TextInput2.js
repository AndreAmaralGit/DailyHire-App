import React, { memo } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { TextInput as Input } from 'react-native-paper';
import { theme } from '../core/theme';


const TextInput2 = ({ errorText, ...props }) => (
      <View style={styles.container}>
            <Input
                  style={styles.input}
                  selectionColor={theme.colors.primary}
                  underlineColor="transparent"
                  {...props}
            />
            {errorText ? <Text style={styles.error}>{errorText}</Text> : null}
      </View>
);

const styles = StyleSheet.create({
      container: {
            width: '100%',
            marginVertical: 12,
      },
      input: {
            backgroundColor: '#EEEEEE',
            borderWidth: 2,
            borderColor: "#717171",
            borderTopRightRadius: 10,
            borderTopLeftRadius: 10,
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10,
            paddingLeft: 4
      },
      error: {
            fontSize: 14,
            color: theme.colors.error,
            paddingHorizontal: 4,
            paddingTop: 4,
      },
});

export default memo(TextInput2);
