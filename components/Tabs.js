import React from 'react';
import {
  TouchableNativeFeedback,
  Text,
  Image,
  TouchableOpacity,
  View,
} from 'react-native';
import {icons} from '../constants';

const Tabs = ({
  styleContainer,
  styleIcon,
  icon,
  label,
  styleLabel,
  onPress,
  isFocus,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        flex: 1,
        alignItems: 'center',
        overflow: 'hidden',
        justifyContent: 'center',
        ...styleContainer,
      }}>
      <Image source={icon} style={{
        tintColor: isFocus ? "#000" : "grey",
        ...styleIcon
      }} />

      {label && (
        <Text
          numberOfLines={1}
          style={{
            color: isFocus ? '#000' : 'grey',
            fontSize: 12,
            marginTop: 6,
            fontWeight: 'bold',
            ...styleLabel,
          }}>
          {label}
        </Text>
      )}
      {
        isFocus && <View 
        style={{
          position: "absolute",
          top: 0,
          borderRadius: 10,
          width: "100%",
          height: 3,
          backgroundColor: "red"
        }}
        />
      }
    </TouchableOpacity>
  );
};

export default Tabs;
