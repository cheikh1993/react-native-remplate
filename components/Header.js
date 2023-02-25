import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import { useSelector } from 'react-redux';

const Header = ({titleStyle,title,leftComponent, rightComponent}) => {

  return (
    <View
      style={{
        height: 60,
        backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        ...styles.shadow,
      }}>
        {leftComponent}
      <Text style={{
        ...titleStyle
      }}>{title}</Text>


      {rightComponent}
    </View>
  );
};
const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#000',
   
    shadowOffset: {
      width: 1,
      height: 10,
    },
    shadowOpacity: 0.89,
    shadowRadius: 20,
    elevation: 9,
  },
});
export default Header;
