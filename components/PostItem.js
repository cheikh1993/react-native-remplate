import React from 'react'
import { View, Text, Image, Dimensions, TouchableOpacity, StyleSheet } from 'react-native'
import { icons, images } from '../constants'
import IconButton from './IconButton'
const { width, height } = Dimensions.get("screen")
const PostItem = ({ item, index }) => {
    return (
        <View style={{
            flex: 1,
            borderColor: "grey",
            borderBottomWidth: .5,
            marginBottom: 12,
            paddingBottom: 7,
        }}>
            <Image
                source={{ uri: "http://c.files.bbci.co.uk/1E88/production/_123161870_mediaitem123161869.jpg" }}
                style={{
                    width: "100%",
                    height: 200,
                    borderRadius: 12,
                }}
            />
            <View style={{flexDirection: "row"}}>
           

            <TouchableOpacity style={{ flex: 1 }}>
                    <Text style={{
                        color: "grey",
                        marginTop: 10,
                        fontSize: 18,
                        fontWeight: "500"

                    }}>{item.title}</Text>
                <View style={{ flex: 1,marginTop: 10 }}><Text numberOfLines={1}>{item.content}</Text></View>
                </TouchableOpacity>
                <View style={{
                    flex: 1, flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "flex-end"
                }}>

                    <IconButton
                        icon={icons.favorie}
                        iconStyle={{
                            height: 20,
                            width: 20,
                            tintColor: "tomato"
                        }}
                    />
                    <IconButton
                        icon={icons.share}
                        iconStyle={{
                            height: 20,
                            width: 20,
                            tintColor: "grey",
                            margin: 20
                        }}
                    />
                    <IconButton
                        icon={icons.menub}
                        iconStyle={{
                            height: 15,
                            width: 15,
                            tintColor: "grey"
                        }}
                    />
                </View>
        </View>
        </View>
    )
}


export default PostItem