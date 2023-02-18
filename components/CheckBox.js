import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {icons} from '../constants';

const CheckBox = ({checkbexContainerStyle, isSelected, onPress}) => {
  return (
    <TouchableOpacity
    onPress={onPress}
      style={{
        flex: 1,
        flexDirection: 'row',
        ...checkbexContainerStyle,
      }}>
      <View
        style={{
          width: 25,
          height: 25,
          borderWidth: isSelected ? 1 : .5,
          borderColor: isSelected ? "white" : "#444444",

          backgroundColor: isSelected ? 'tomato' : "#f3f3f3",
          borderRadius: 2,
          alignItems: 'center',
          justifyContent: 'center',
          marginRight: 10
        }}>
        {isSelected && (
          <Image
            source={icons.check}
            style={{
              width: 22,
              height: 22,
              tintColor: "white",
             
            }}
          />
        )}
      </View>
      <Text>En cliquant vous acceptez les termes du contrat</Text>
    </TouchableOpacity>
  );
};

export default CheckBox;
