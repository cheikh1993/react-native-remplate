import React, { useEffect } from 'react'
import { View, Text, Image } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { icons } from '../../constants'
import { getFavoriePost } from '../../redux/redux-toolkit/ApiCall'
import { getFavorie } from '../../redux/redux-toolkit/favoriePostSlice'

const Favorie = () => {
    const user = useSelector(state => state.auth.user)
    const { loading, favorie, error } = useSelector(state => state.favorie)
    const dispatch = useDispatch()
    const userId = user.others.id
    console.log(favorie);
    useEffect(() => {
        getFavoriePost(userId, dispatch)
    }, [])

    return (
        <View style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "white",
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
            {favorie.length < 0 ? <Text>Vos favoricces sont actuellement vide vous pouvez ajouter en clique sur le button add
            </Text> : <View>

                <Text>Vos Favorie</Text>
            </View>}
            <Text></Text>
        </View>
    )
}

export default Favorie