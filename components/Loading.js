import React from 'react'
import { ActivityIndicator, View, Text } from 'react-native';

const Loading = ({title, styleTitle}) => {
  return (
    <View
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: '#000',
        opacity: 0.85,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10,
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          padding: 10,
          height: 90,
          borderRadius: 5,
          backgroundColor: '#fff',
          width: '80%',
          justifyContent: 'space-evenly',
        }}>
        <ActivityIndicator size="large" color="#0000ff" />

        <Text
          style={{
            ...styleTitle
          }}>
          {title}
        </Text>
      </View>
    </View>
  );
}

export default Loading