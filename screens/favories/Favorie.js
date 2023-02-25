import React from 'react'
import { View,Text, Image } from 'react-native'
import { useSelector } from 'react-redux'
import { icons } from '../../constants'

const Favorie = () => {
    const user = useSelector(state => state.auth.user)

    const {password, ...others} = user[0]
    console.log(others);
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
            <Text></Text>
        </View>
  )
}

export default Favorie