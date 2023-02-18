import React from 'react'
import { View,Text, Image } from 'react-native'
import { icons } from '../../constants'

const Favorie = () => {
  return (
    <View style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor:"white",
        paddingHorizontal: 30
    }}>
        <Image 
        source={icons.love}
        style={{
            height: 100,
           width: 100,
            tintColor: "tomato",
            marginBottom: 120
        }}
        />
        <Text>Vos favories sont actuellement vide vous pouvez ajouter en clique sur le button add
            </Text>
        </View>
  )
}

export default Favorie