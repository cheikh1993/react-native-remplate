import React from 'react';
import {TextInput, View, Text} from 'react-native';

const InputForm = ({
  placeHolder,
  label,
  containerStyle,
  inputContainerStyle,
  inputStyle,
  value = '',
  prependComponent,
  appendComponent,
  onChange,
  onPress,
  editable,
  secureTextEntry,
  keyboardType = 'default',
  autoCompleteType = 'off',
  autoCapitalize = 'none',
  maxLength,
  placeHolderColor = 'grey',
  onSubmitEditing,
  borderError,
  message
}) => {
  
  return (
    <View
      style={{
        ...containerStyle,
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          height: 55,
          paddingHorizontal: 12,
          borderRadius: 10,
          backgroundColor: '#f3f3f3',
          borderWidth: borderError ? 1 : 0,
          borderColor: borderError ? 'red' : 'green',
          ...inputContainerStyle,
        }}>
        {prependComponent}

        <TextInput
          style={{
            flex: 1,
            paddingVertical: 0,
            ...inputStyle,
          }}
          value={value}
          placeholder={placeHolder}
          placeholderTextColor={placeHolderColor}
          secureTextEntry={secureTextEntry}
          onChangeText={text => onChange(text)}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          onPressIn={onPress}
          maxLength={maxLength}
          editable={editable}
          onSubmitEditing={onSubmitEditing}
        />
        {appendComponent}
      </View>
    </View>
  );
};

export default InputForm;
