import React from 'react';
import { StyleSheet, Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  variante?: 'contained' | 'link';
}

export function Button({ title, variante = 'contained', ...rest }: ButtonProps) {
  return (
    <TouchableOpacity
      style={styles[variante]}
      {...rest}
    >
      <Text style={styles.text}>
        {title}
      </Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  link: {
    height: 56,
  },
  contained: {
    backgroundColor: '#00f',
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    fontSize: 16,
    color: '#ffffff'
  }
})