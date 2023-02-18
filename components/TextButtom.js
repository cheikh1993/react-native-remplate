import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

const TextButtom = ({label, containerStyle, labelStyle, onPress}) => {
  return (
    <TouchableOpacity 
    onPress={onPress}
    style={{
        borderRadius: 5,
        alignItems:"center",
        justifyContent:"center",
        ...containerStyle

    }}>
<Text style={{
    ...labelStyle
}}>{label}</Text>
    </TouchableOpacity>
  )
}

export default TextButtom