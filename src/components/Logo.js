import React, { memo } from 'react';
import { Image, StyleSheet } from 'react-native';

const Logo = () => (
  <Image source={require('../assets/logotipo2x.png')} style={styles.image} />
);

const styles = StyleSheet.create({
  image: {
    width: 230,
    height: 127,
    marginBottom: 18,
  },
});

export default memo(Logo);
