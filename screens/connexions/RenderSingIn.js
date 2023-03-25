import { MotiText, MotiView } from "moti";
import { Shadow } from "react-native-shadow-2";
import { Dimensions, Image, TouchableOpacity, Text, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { InputForm, Loading, TextButtom } from "../../components";
import { icons } from "../../constants";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { login } from "../../redux/redux-toolkit/ApiCall";
const { height, width } = Dimensions.get("screen")

const RenderSingIn = ({ navigation }) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [visible, setIsvible] = useState(false)
    const dispatchs = useDispatch()
    const { error, message, user, loading } = useSelector(state => state.auth)
    if (user.others) {
        navigation.replace("Home")
    }
    const handSubmit = async () => {



        login({ email, password }, dispatchs)
        setEmail('');
        setPassword('');
    };
    return (

        <>
            {loading && <Loading
                title={"Attendez ..."}
            />}
            {/* {
                showMessage && 
                    <MotiView 
                    
                        from={{ translateX: 1000, opacity: 0, scale: 0.8 }}
                        animate={{translateX: 0, opacity: 1, scale: 1 }}
                        transition={{
                            type: 'timing',
                            duration: 900,
                        }}
                    style={{
                        flex: 1,
                        position: "absolute",
                        height,
                    
                        alignItems: "center",
                        justifyContent: "center",
                        width,
                        padding: 10,
                        backgroundColor: "teal",
                        zIndex: 12
                    }}>
                        <Text style={{
                            backgroundColor: "red"
                        }}>message</Text>
                    </MotiView>
            } */}
            <MotiView

                style={[
                    {
                        marginTop: 10,
                        height: height * 0.55,
                    },
                ]}>
                <Shadow>
                    <View
                        style={{
                            flex: 1,
                            backgroundColor: 'white',
                            borderRadius: 5,
                            width: width * 0.92,
                            padding: 10,
                        }}>
                        <Text
                            style={{
                                color: '#000',
                                fontSize: 20,
                                letterSpacing: 1,
                                fontWeight: '600',
                                textTransform: 'capitalize',
                                marginTop: 8,
                                width: '60%',
                            }}>
                            Connectez-vous pour continuer !
                        </Text>

                        <KeyboardAwareScrollView
                            enableOnAndroid={true}
                            keyboardDismissMode="on-drag"
                            keyboardShouldPersistTaps="handled"
                            extraScrollHeight={-300}
                            contentContainerStyle={{
                                flexGrow: 1,
                                paddingHorizontal: 10,
                            }}>
                            <Text
                                style={{
                                    color: '#000',
                                    fontSize: 14,
                                }}>
                                E-mail
                            </Text>
                            <InputForm
                                onSubmitEditing={handSubmit}
                                value={email}
                                placeHolder={'Votre email'}
                                onChange={text => setEmail(text)}
                                containerStyle={{
                                    marginTop: 10,
                                }}
                                prependComponent={
                                    <Image
                                        source={icons.bus}
                                        style={{
                                            height: 22,
                                            width: 22,
                                            tintColor: 'tomato',
                                            marginRight: 10,
                                        }}
                                    />
                                }
                                appendComponent={
                                    <Image
                                        source={icons.compass}
                                        style={{
                                            width: 22,
                                            height: 22,
                                            tintColor: '#000',
                                        }}
                                    />
                                }
                            />
                            <View
                                style={{
                                    marginTop: 10,
                                }}>
                                <Text
                                    style={{
                                        color: '#000',
                                        fontSize: 14,
                                    }}>
                                    Mot de passe
                                </Text>
                                <InputForm
                                    containerStyle={{
                                        marginTop: 9,
                                    }}
                                    onSubmitEditing={handSubmit}
                                    value={password}
                                    onChange={text => setPassword(text)}
                                    placeHolder="Votre mot de pass"
                                    secureTextEntry={!visible}
                                    appendComponent={
                                        <TouchableOpacity
                                            onPress={() => setIsvible(!visible)}
                                            style={{
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                            }}>
                                            <Image
                                                source={visible ? icons.airplane : icons.barMenu}
                                                style={{
                                                    width: 20,
                                                    height: 20,
                                                    tintColor: visible ? 'red' : '#000',
                                                }}
                                            />
                                        </TouchableOpacity>
                                    }
                                />
                            </View>
                            <View
                                style={{
                                    marginTop: 15,
                                    alignItems: 'flex-end',
                                }}>
                                <TextButtom
                                    label={'Mot de passe oublie ?'}
                                    labelStyle={{
                                        color: '#000',
                                    }}
                                />
                            </View>

                            {
                                error && <MotiText from={{ translateX: 600, opacity: 0, scale: 0 }}

                                    animate={{
                                        translateX: 0, opacity: 1, scale: 1
                                    }}
                                    transition={{
                                        type: "timing",
                                        duration: 450


                                    }}
                                    style={{
                                        color: "red",
                                      
                                        fontSize: 16,
                                        fontWeight: "00"
                                    }}
                                >{message}</MotiText>
                            }

                        </KeyboardAwareScrollView>
                        {/* { loading && <Text>loading.....</Text> } */}
                        <TextButtom
                            label={'Se connecter'}
                            containerStyle={{
                                height: 50,
                                backgroundColor: 'tomato',
                                marginBottom: 10,
                            }}
                            onPress={() => {
                                handSubmit();
                            }}
                            labelStyle={{
                                color: 'white',
                                fontSize: 18,
                            }}
                        />
                    </View>
                </Shadow>
            </MotiView>
        </>
    );
}

export default RenderSingIn;