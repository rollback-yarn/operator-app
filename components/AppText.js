import React from 'react';
import { Text } from 'react-native';

export function AppText(props) {
  return <Text {...props} style={{ fontFamily: 'Roboto-Regular', ...props.style }} />
}
