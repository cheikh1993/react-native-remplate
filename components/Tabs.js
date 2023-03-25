import React from 'react';
import {
  TouchableNativeFeedback,
  Text,
  Image,
  TouchableOpacity,
  Animated,
  Pressable,
  View,
} from 'react-native';
import { icons } from '../constants';

const Tabs = ({
  styleContainer,
  styleIcon,
  icon,
  label,
  styleLabel,
  onPress,
  isFocus,
}) => {

  const animated = new Animated.Value(1);
  const fadeIn = () => {
    Animated.timing(animated, {
      toValue: 0.4,
      duration: 150,
      useNativeDriver: true,
    }).start();
  };

  const fadeOut = () => {
    Animated.timing(animated, {
      toValue: 1,
      duration: 250,
      useNativeDriver: true,
    }).start();
  };
  return (
    <Pressable
      onPress={onPress}
      onPressIn={fadeIn} onPressOut={fadeOut}
      style={({ pressed }) => [

        {
          flex: 1,
          overflow: 'hidden',
          ...styleContainer,

        }
      ]}>

      <Animated.View style={{
        flex: 1,
        alignItems: 'center',
        opacity: animated,
        justifyContent: 'center',

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
      </Animated.View>
    </Pressable>
  );
};

export default Tabs;
