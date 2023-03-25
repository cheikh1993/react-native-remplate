import { MotiView, useAnimationState } from 'moti'
import React, { useEffect, memo } from 'react'
import { View, Text, Image, Dimensions, TouchableOpacity, StyleSheet } from 'react-native'
import { useSelector } from 'react-redux'
import { icons, images } from '../constants'
import IconButton from './IconButton'
const { width, height } = Dimensions.get("screen")
const PostItem = ({ item, index, showMenubar, setShowMenu }) => {

    const user = useSelector(state => state.auth.user)
    const uid = user?.others?.id;
    const animaionState = useAnimationState({
        up: { height: 60, },
        down: { height: 0, }
    })

    useEffect(() => {
        animaionState.transitionTo("down")
    })
    return (
        <View style={{
            flex: 1
        }}>

            <MotiView
                from={{ flex: 0, }}
                animate={{ flex: 1 }}
                transition={{
                    type: "timing",
                    duration: 560
                }}
                // onTouchMove={() => setShowMenu(null)}
                style={{
                    flex: 1,
                    borderColor: "grey",
                    borderBottomWidth: .5,
                    marginBottom: 12,
                    paddingBottom: 7,
                }}>
                <View style={{
                    flex: 1,
                    flexDirection: "row",

                }}>
                    <Image
                        source={{ uri: "http://c.files.bbci.co.uk/1E88/production/_123161870_mediaitem123161869.jpg" }}
                        style={{
                            flex: 1,
                            width: "100%",
                            height: 200,
                            borderRadius: 12,
                        }}
                    />

                </View>
                <View style={{ flexDirection: "row" }}>

                    <TouchableOpacity style={{ flex: 1 }}>
                        <Text style={{
                            color: "grey",
                            marginTop: 10,
                            fontSize: 18,
                            fontWeight: "500"

                        }}>{item.title}</Text>
                        <View style={{ flex: 1, marginTop: 10 }}>
                            <Text numberOfLines={1}>{item.content}</Text>
                        </View>
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
                            onPress={() => {
                                if (animaionState.current == "down") {
                                    setShowMenu(item.id_post)
                                    setTimeout(() => {
                                        animaionState.transitionTo("up")
                                    }, 20);
                                } else if (animaionState.current == "up") {
                                    setShowMenu(null)
                                    animaionState.transitionTo("down")
                                }
                            }}
                            icon={icons.menub}
                            iconStyle={{
                                height: 15,
                                width: 15,
                                tintColor: "grey"
                            }}
                        />
                    </View>

                </View>
                {showMenubar == item.id_post && <MotiView

                    state={animaionState}
                    style={{

                        backgroundColor: "white",
                        width: "90%",
                        borderWidth: 2,
                        margin: 5,
                        borderColor: "whitesmoke",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: 10,
                        flexDirection: "row",
                        rowGap: 10
                    }}>
                    <IconButton
                        icon={icons.detail}
                        iconStyle={{
                            height: 20,
                            width: 20,
                            tintColor: "#000",
                            margin: 20
                        }}
                    />
                    <IconButton
                        icon={icons.update}
                        iconStyle={{
                            height: 20,
                            width: 20,
                            tintColor: "#000",
                            margin: 20
                        }}
                    />
                    <IconButton
                        icon={icons.filter}
                        iconStyle={{
                            height: 20,
                            width: 20,
                            tintColor: "#000",
                            margin: 20
                        }}
                    />
                    {
                        uid == item.uid && <IconButton
                            icon={icons.deleted}
                            iconStyle={{
                                height: 20,
                                width: 20,
                                tintColor: "red",
                                margin: 20
                            }}
                        />
                    }
                </MotiView>}
            </MotiView>

        </View>
    )
}


export default memo(PostItem)