import React from 'react';
import {Image, TouchableOpacity,Text,View} from 'react-native';

const IconButton = ({
  containerStyle,
  icon,
  iconStyle,
  label,
  labelStyle,
  onPress,
}) => {
  return (
    <View style={{
        flex: 1
    }}>
      <TouchableOpacity
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 5,
          padding: 4,
          ...containerStyle,
        }}>
            <Image 
            source={icon}
            style={{
                ...iconStyle
            }}
            />
        </TouchableOpacity>
        <Text style={{
            alignSelf: "center",
            ...labelStyle
        }}>{label}</Text>
    </View>
  );
};

export default IconButton;
