import React, { useEffect, useRef } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, Dimensions, ScrollView, StyleSheet, Animated } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { IconButton, Loading, PostItem } from '../../components';
import { icons, images } from '../../constants';
import { getFavoriePost, AddFavorie } from '../../redux/redux-toolkit/ApiCall';
const { width, height } = Dimensions.get("screen")
const API_URL = 'https://node-sql-faye-api.vercel.app';

const RenderHeaderFavorie = () => {
    const scrollx = useRef(new Animated.Value(0)).current

    return (
        <Animated.View style={{
            flex: 1,
            height: height * 0.34,

            backgroundColor: scrollx.interpolate({
                inputRange: [height - 100, height - 50],
                outputRange: [50, 0],
                extrapolate: "clamp"
            })

        }}>
            <View style={{
                flex: 3,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "white"
            }}><Text style={{
                fontSize: 35,
                fontWeight: "500",
                textTransform: "uppercase",
                color: "grey"
            }}>Favories</Text>
            </View>
            <View style={{
                flex: 1,
                flexDirection: "row",
                backgroundColor: "white",
                paddingRight: 10,
                justifyContent: "flex-end"
            }}>
                <IconButton
                    icon={icons.filter}
                    iconStyle={{
                        height: 18,
                        width: 18,
                        tintColor: "grey"
                    }}
                />
                <IconButton
                    icon={icons.search}
                    iconStyle={{
                        height: 18,
                        width: 18,
                        tintColor: "grey",
                        marginHorizontal: 10
                    }}
                />
                <IconButton
                    icon={icons.menub}
                    iconStyle={{
                        height: 18,
                        width: 18,
                        tintColor: "grey"

                    }}
                />
            </View>
        </Animated.View>
    )
}

const Favorie = () => {
    const user = useSelector(state => state.auth.user);
    const { loading, favorie, error } = useSelector(state => state.favorie);

    const dispatch = useDispatch();
    const uid = user?.others?.id;
    useEffect(() => {
        getFavoriePost(uid, dispatch);
    }, [uid]);



    return (
        <View
            style={{
                flex: 1,
                backgroundColor: "white",
                paddingHorizontal: 10,
                marginTop: 5
            }}>



            {loading && <Loading
                title={"Haral touti"}
            />}
            {favorie.length < 0 ? (
                <Text>
                    Vos favoricces sont actuellement vide vous pouvez ajouter en clique
                    sur le button add
                </Text>
            ) : (
                <View style={{
                }}>
                    <FlatList
                        ListHeaderComponent={RenderHeaderFavorie}

                        showsVerticalScrollIndicator={false}
                        data={favorie}
                        keyExtractor={item => `${item.id_post}`}
                        renderItem={({ item, i }) => <PostItem item={item} index={i} />}
                    />
                </View>
            )}
        </View>
    );
};
const styles = StyleSheet.create({
    shadow: {
        shadowColor: '#000',

        shadowOffset: {
            width: 1,
            height: 4,
        },
        shadowOpacity: 0.89,
        shadowRadius: 20,
        elevation: 23,
    },
})

export default Favorie;
