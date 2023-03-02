import React, { useContext, useEffect, useRef } from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  StatusBar,
  FlatList,
  ScrollView,
  ImageBackground,
  Dimensions,
  Modal,
  TouchableWithoutFeedback,
  Animated,
} from 'react-native';
import { InputForm, Loading, Tabs, TextButtom, UpdateModif } from '../../components';
import Header from '../../components/Header';
import { icons, images } from '../../constants';
import { AuthContext } from '../../context/AuthContext';
import { Shadow } from 'react-native-shadow-2';
import axios from 'axios';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Favorie, Notification, Search } from '../jndex';
import { useDispatch, useSelector } from 'react-redux';
import { AddFavorie, getUsers } from '../../redux/redux-toolkit/ApiCall';
const { height, width } = Dimensions.get('screen');
const ITEM_SIZE = width * 0.3;

const API_URL = 'https://node-sql-faye-api.vercel.app';
// const API_URL = "http://10.0.2.2:3000/"

const Home = ({ navigation }) => {
  const { user } = useContext(AuthContext);
  const [menu, setMenu] = React.useState(1);
  const [showcat, setShowcat] = React.useState('');
  const [cat, setCat] = React.useState({});
  const [post, setPost] = React.useState([]);
  const [showLoading, setShowLoading] = React.useState(false);
  const [showModal, setShowModal] = React.useState(false);
  const [title, setTitle] = React.useState('');
  const [content, setContent] = React.useState('');
  const [categorie, setCategorie] = React.useState('');
  const [showMenubar, setShowMenubar] = React.useState(true)
  const scrollx = useRef(new Animated.Value(0)).current;
  const { userInfo, padding, errorMessage } = useSelector(state => state.user)
const userId = useSelector(state => state.auth.user)
  let postcat = post.filter(a => a.categorie === showcat);
  const dataCategorie = Object.keys(cat).map(i => ({
    id: i,
    cat: cat[i],
  }));
  const getCategorie = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/post/cat`);
      setCat(res.data);
    } catch (error) {
      console.log(error);
    }
  };
const dispatch = useDispatch()


useEffect(() => {
  getCategorie();
  getPost()
  getUsers(dispatch)
  }, []);
  const getPost = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/post`);
      setPost(res.data);
    } catch (err) {
      console.log(err.response.data);
    }
  };
  const handlLike = async id => {

    const getLikesId = async () => {
      try {
        const likes = await axios.get(`${API_URL}/api/post/${id}`);

        const likeUpdate = likes.data.map(l => l.likes);
        console.log(likeUpdate[0]);

        try {
          const update = await axios.put(`${API_URL}/api/post/like/${id}`, {
            likes: likeUpdate[0] + 1,
          });
          console.log(update.data);
          getPost()
        } catch (error) {
          console.log(error.response.data);
        }
      } catch (error) {
        console.log(error.response.data);
      }
    };
    getLikesId();


  };
  const renderModal = () => {
    return (
      <View
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          backgroundColor: '#5d5d5d75',
          zIndex: 10,
        }}>
        <Modal animationType="slide" visible={showModal} transparent={true}>
          <KeyboardAwareScrollView
            enableOnAndroid={true}
            keyboardDismissMode="on-drag"
            keyboardShouldPersistTaps="handled"
            extraScrollHeight={-300}
            contentContainerStyle={{
              flexGrow: 1,
              paddingHorizontal: 10,
            }}
            style={{
              position: 'absolute',
              bottom: 50,
              top: 50,
              left: 15,
              right: 15,
              backgroundColor: 'white',
              padding: 10,
              borderTopRightRadius: 5,
              borderTopLeftRadius: 5,
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <TouchableOpacity
                style={{
                  width: 35,
                  height: 35,
                  borderRadius: 23,
                  elevation: 20,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: 'tomato',
                }}>
                <Text
                  style={{
                    color: 'white',
                    fontWeight: 'bold',
                    fontSize: 20,
                    letterSpacing: 1,
                    fontFamily: 'serif',
                  }}>
                  CF
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setShowModal(false)}
                style={{
                  alignSelf: 'flex-end',
                  width: 30,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderColor: '#000',
                  borderWidth: 0.4,
                  padding: 5,
                  borderRadius: 5,
                }}>
                <Text
                  style={{
                    color: '#000',
                    fontSize: 20,
                    fontWeight: 'bold',
                  }}>
                  X
                </Text>
              </TouchableOpacity>
            </View>
            <KeyboardAwareScrollView
              enableOnAndroid={true}
              keyboardDismissMode="on-drag"
              keyboardShouldPersistTaps="handled"
              extraScrollHeight={-300}
              contentContainerStyle={{
                flexGrow: 1,
                paddingHorizontal: 10,
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  color: '#000',
                  fontSize: 14,
                  marginBottom: 10,
                }}>
                Titre de l'annonce
              </Text>
              <InputForm
                // onSubmitEditing={handSubmit}
                value={title}
                placeHolder={"Votre Titre de l'annonce "}
                onChange={text => setTitle(text)}
                containerStyle={{
                  marginBottom: 15,
                }}
                prependComponent={
                  <Image
                    source={icons.google}
                    style={{
                      height: 22,
                      width: 22,
                      marginRight: 10,
                    }}
                  />
                }
                appendComponent={
                  <Image
                    source={icons.twitter}
                    style={{
                      width: 22,
                      height: 22,
                      tintColor: '#000',
                    }}
                  />
                }
              />
              <Text
                style={{
                  color: '#000',
                  fontSize: 14,
                  marginBottom: 10,
                }}>
                Contenu de l'annonce
              </Text>
              <InputForm
                // onSubmitEditing={handSubmit}
                value={content}
                placeHolder={'Ajouter un contenu '}
                onChange={text => setContent(text)}
                containerStyle={{
                  marginBottom: 15,
                }}
                prependComponent={
                  <Image
                    source={icons.bookmark}
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
                    source={icons.google}
                    style={{
                      width: 22,
                      height: 22,
                      tintColor: '#000',
                    }}
                  />
                }
              />
              <Text
                style={{
                  color: '#000',
                  fontSize: 14,
                  marginBottom: 10,
                }}>
                Categorie de l'annonce
              </Text>
              <InputForm
                // onSubmitEditing={handSubmit}
                value={categorie}
                placeHolder={"categorie de l'annonce"}
                onChange={text => setCategorie(text)}
                containerStyle={{
                  marginBottom: 15,
                }}
                prependComponent={
                  <Image
                    source={icons.twitter}
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
                    source={icons.menu}
                    style={{
                      width: 22,
                      height: 22,
                      tintColor: '#000',
                    }}
                  />
                }
              />
            </KeyboardAwareScrollView>
            <TextButtom
              labelStyle={{
                color: 'white',
                fontWeight: 'bold',
              }}
              label={"Creer l'article"}
              containerStyle={{
                height: 50,
                backgroundColor: 'tomato',
              }}
            />
          </KeyboardAwareScrollView>
        </Modal>
      </View>
    );
  };

  const renderHome = () => {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#6b6a6a',
        }}>
        {showLoading && <Loading title={'Patientez svp...'} />}
        {post.length == 0 && <Loading title={'TAKHIRLOUL TOUTI...'} />}

        <View
          style={{
            padding: 10,
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: '#323f4e',
          }}>
          <TouchableOpacity
            style={{
              marginRight: 10,
              borderWidth: showcat === '' ? 1 : null,
              borderRadius: 5,
              borderColor: showcat === '' ? '#ffffff' : null,
              padding: 5,
            }}
            onPress={() => {
              setShowLoading(true);
              setShowcat('');
              setTimeout(() => {
                setShowLoading(false);
              }, 1000);
            }}>
            <Text
              style={{
                color: '#ffffff',
                textTransform: 'uppercase',
              }}>
              Tous
            </Text>
          </TouchableOpacity>
          <View
            style={{
              width: width,
              backgroundColor: '#323f4e',
            }}>
            <FlatList
              data={dataCategorie}
              horizontal
              snapToInterval={ITEM_SIZE}
              decelerationRate={'fast'}
              contentContainerStyle={{
                paddingLeft: ITEM_SIZE,
                paddingRight: ITEM_SIZE + 25,
              }}
              // onScroll={Animated.event(
              //   [{ nativeEvent: { contentOffset: { x: scrollx } } }],
              //   { useNativeDriver: true },
              // )}
              showsHorizontalScrollIndicator={false}
              keyExtractor={item => item.id}
              renderItem={({ item, index }) => {
                const inputRange = [
                  (index - 1) * ITEM_SIZE,
                  index * ITEM_SIZE,
                  (index + 1) * ITEM_SIZE,
                ];
                const opacity = scrollx.interpolate({
                  inputRange,
                  outputRange: [0.4, 1, 0.4],
                });
                const scale = scrollx.interpolate({
                  inputRange,
                  outputRange: [0.7, 1.5, 0.7],
                });
                return (
                  <TouchableOpacity
                    onPress={() => {
                      // setSelectedTab(item.id);
                      setShowcat(item.cat.categorie);

                      setShowLoading(true);
                      // setShowcat(item.cat.categorie);
                      setTimeout(() => {
                        setShowLoading(false);
                      }, 1000);
                    }}
                    style={{
                      alignItems: 'center',
                      // width: ITEM_SIZE  ,
                      padding: 10,

                                           justifyContent: 'center',
                      // opacity: showcat == item.cat.categorie ? 1 : 0.55,
                      borderBottomColor:
                        showcat == item.cat.categorie ? '#fff' : null,
                      borderBottomWidth:
                        showcat == item.cat.categorie ? 2 : null,
                      // backgroundColor: showcat == item.categorie ? 'red' : '#1f1f1f',
                    }}>
                    <Text
                      style={{
                        fontSize: 83 / dataCategorie.length,

                        fontWeight: 'bold',
                        fontFamily: 'sans-serif',
                        color: '#ffffff',
                        textTransform: 'uppercase',

                        // opacity,
                        // transform: [
                        //   {
                        //     scale,
                        //   },
                        // ],
                      }}>
                      {item.cat.categorie}
                      {/* {item.categorie} */}
                    </Text>
                  </TouchableOpacity>
                );
              }}
            />
          </View>
        </View>
        {showcat ? (
          <FlatList
            data={postcat}
            keyExtractor={item => item.id_post}
            renderItem={({ item, i }) => {
              return (
                <View
                  style={{
                    width,
                    paddingBottom: 7,
                  }}>
                  <View
                    style={{
                      width: '100%',
                      backgroundColor: 'white',
                    }}>
                    <TouchableOpacity
                      style={{
                        padding: 10,
                        width: '50%',
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}>
                      <Text
                        style={{
                          fontSize: 20,
                          fontWeight: 'bold',
                          color: 'tomato',
                          textTransform: 'capitalize',
                          marginRight: 10,
                        }}>
                        {item.name}
                      </Text>
                      <Image
                        source={images.sport}
                        style={{
                          height: 30,
                          width: 30,
                          borderRadius: 20,
                        }}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity>
                      <Image
                        source={{ uri: item.img }}
                        style={{
                          width: '100%',
                          height: height * 0.3,
                          resizeMode: 'cover',
                        }}
                      />
                    </TouchableOpacity>
                    <View
                      style={{
                        flex: 1,
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}>
                      <View
                        style={{
                          flex: 3,
                          marginTop: 10,
                          paddingLeft: 20,
                        }}>
                        <Text
                          style={{
                            width: '80%',
                            fontSize: 25,
                            fontWeight: 'bold',
                          }}>
                          {item.title}
                        </Text>

                        <Text
                          numberOfLines={4}
                          style={{
                            fontSize: 15,
                            color: 'grey',
                            textAlign: 'justify',
                          }}>
                          {item.content}
                        </Text>
                      </View>
                      <View style={{flexDirection: "row"}}>
                        <TouchableOpacity
                          onPress={() =>
                            navigation.push('SinglePost', {
                              item: item,
                            })
                          }
                          style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}>
                          <View style={{
                            flexDirection: "row",
                          marginRight: 10
                          }}><Text
                            style={{
                              color: 'tomato',
                              textDecorationLine: 'underline',
                            }}>
                              Voir Plus
                            </Text>
                            <TouchableOpacity
                              onPress={() =>
                                AddFavorie({ uid, pid: item.id_post }, dispatchs)
                              }
                              style={{
                                
                                alignItems: 'center',
                                justifyContent: 'center',
                              }}>
                              <Text
                                style={{
                                  color: 'blue',
                                  marginLeft: 9
                                }}>
                                Add 
                              </Text>
                            </TouchableOpacity></View>
                        </TouchableOpacity>
                       
                      </View>
                    </View>
                    <View
                      style={{
                        flex: 1,
                        marginTop: 10,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginHorizontal: 12,
                        marginBottom: 6,
                      }}>
                      <TouchableOpacity
                        onPress={() => handlLike(item.id_post)}
                        style={{
                          flex: 1,
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'space-evenly',
                          padding: 10,
                          borderRadius: 10,
                          backgroundColor: '#e2e0e072',
                        }}>
                        <Text> {
                          item.likes > 1 ? "Likes" : "Like"
                        } </Text>
                        {
                          item.likes > 1 && <Text>{item.likes}</Text>
                        }
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={{
                          flex: 1,
                          flexDirection: 'row',
                          alignItems: 'center',
                          marginHorizontal: 10,
                          justifyContent: 'space-evenly',
                          padding: 10,
                          borderRadius: 10,
                          backgroundColor: '#e2e0e072',
                        }}>
                        <Text>Comment</Text>
                        <Text>10</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={{
                          flex: 1,
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'space-evenly',
                          padding: 10,
                          borderRadius: 10,
                          backgroundColor: '#e2e0e072',
                        }}>
                        <Text
                          style={{
                            color: 'tomato',
                            fontWeight: '400',
                          }}>
                          Share
                        </Text>
                        <Text>9</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              );
            }}
          />
        ) : (
          <FlatList
            data={post}
            keyExtractor={item => item.id_post}
            renderItem={({ item, i }) => {
              return (
                <View
                  style={{
                    width,
                    paddingBottom: 7,
                  }}>
                  <View
                    style={{
                      width: '100%',
                      backgroundColor: 'white',
                    }}>
                    <View style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      paddingHorizontal: 12,
                      alignItems: "center"
                    }}>
                      <TouchableOpacity
                        style={{
                          width: '70%',
                          alignItems: 'center',
                          flexDirection: 'row',
                          margin: 10,
                        }}>
                        <Text
                          style={{
                            fontSize: 13,
                            marginRight: 10,
                          }}>
                          {item.name}
                        </Text>
                        <Text
                          style={{
                            fontSize: 13,
                          }}>
                          {item.username}
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                      onPress={() => console.log("menusx")}
                      style={{
                        height: 23,
                        width: 23,
                        alignItems: "center",
                        justifyContent: "center"
                      }}>
                       <Image  source={icons.menub}
                       style={{
                        height: 20,
                        width: 20,
                        tintColor: "grey"
                       }}
                       />
                      </TouchableOpacity>
                    </View>
                    <TouchableOpacity>
                      <Image
                        source={ post.length % 2 ? images.beach : images.sport }
                        style={{
                          width: '100%',
                          height: height * 0.3,
                          resizeMode: 'cover',
                        }}
                      />
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={{
                        marginTop: 10,
                        paddingHorizontal: 20,
                      }}>
                      <Text
                        style={{
                          width: '80%',
                          fontSize: 25,
                          fontWeight: 'bold',
                        }}>
                        {item.title}
                      </Text>

                      <Text
                        numberOfLines={4}
                        style={{
                          fontSize: 15,
                          color: 'grey',
                          textAlign: 'justify',
                        }}>
                        {item.content}
                      </Text>
                    </TouchableOpacity>
                    <View
                      style={{
                        flex: 1,
                        marginTop: 10,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginHorizontal: 12,
                        marginBottom: 6,
                      }}>
                      <TouchableOpacity
                        style={{
                          flex: 1,
                          alignItems: 'center',
                          justifyContent: 'center',
                          padding: 10,
                          borderRadius: 30,
                          backgroundColor: '#e2e0e072',
                        }}>
                        <Text>Likes</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={{
                          flex: 1,
                          alignItems: 'center',
                          justifyContent: 'center',
                          padding: 10,

                          borderRadius: 30,
                          backgroundColor: '#e2e0e072',
                          marginHorizontal: 5,
                        }}>
                        <Text>Comment</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={{
                          flex: 1,
                          alignItems: 'center',
                          justifyContent: 'center',
                          padding: 10,

                          borderRadius: 30,
                          backgroundColor: '#e2e0e072',
                        }}>
                        <Text>Share</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              );
            }}
          />
        )}
      </View>
    );
  };
  function renderMenu() {
    switch (menu) {
      case 1:
        return renderHome();
      case 2:
        return <Notification />;

      case 3:
        return <Search />;
      case 4:
        return <Favorie />;
    }
  }

  const userss = useSelector(state => state.auth.user)
  const l = userss.others?.name[0] + userss.others?.username[0]
  const { loading, favorie, error } = useSelector(state => state.favorie)
    console.log(error);
const dispatchs = useDispatch()
  const nitt = useSelector(state => state.auth.user)
  const uid = nitt?.others?.id;
  

  return (
    <View style={styles.container}>
      {showModal && renderModal()}
      <StatusBar backgroundColor="white" barStyle={'dark-content'} />
     {
      showMenubar && <UpdateModif />
     }
      <Header
        title={'Bienvenue'}
        titleStyle={{
          fontSize: 30,
          color: '#000',
          fontWeight: 'bold',
          textTransform: 'uppercase',
        }}
        leftComponent={
          <TouchableOpacity
            style={{
              width: 30,
              height: 30,
              borderRadius: 3,
              alignItems: 'center',
              justifyContent: 'center',
              borderWidth: 0.5,
              borderColor: 'grey',
            }}>
            <Image
              source={icons.menu}
              style={{
                width: 20,
                height: 20,
                tintColor: '#202020',
              }}
            />
          </TouchableOpacity>
        }
        rightComponent={
          <TouchableOpacity
            style={{
              width: 35,
              height: 35,
              borderRadius: 23,
              elevation: 20,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'tomato',
            }}>
            <Text
              style={{
                color: 'white',
                fontWeight: 'bold',
                fontSize: 20,
                letterSpacing: 1,
                fontFamily: 'serif',
              }}>
              { l &&  l.toLocaleUpperCase()}
            </Text>
          </TouchableOpacity>
        }
      />
      <View
        style={{
          flex: 1,
          backgroundColor: '#f3f3f3',
        }}>
        {renderMenu()}
      </View>

      <View
        style={{
          // margin: 10,
          // position: 'absolute',
          // bottom: 2,
          // left: 5,
          // right: 5,
          borderTopRightRadius: 10,
          height: 60,
          flexDirection: 'row',
          borderTopLeftRadius: 10,
          backgroundColor: '#fff',
          ...styles.shadow1,
        }}>
        <Tabs
          icon={icons.home}
          styleIcon={{
            width: 20,
            height: 20,
            tintColor: 'grey',
          }}
          label="Home"
          isFocus={menu === 1 ? true : false}
          onPress={() => setMenu(1)}
        />
        <Tabs
          icon={icons.notification}
          styleIcon={{
            width: 20,
            height: 20,
          }}
          label="Notification"
          isFocus={menu === 2 ? true : false}
          onPress={() => setMenu(2)}
        />
        <Tabs
          styleContainer={{
            marginTop: -20,
            backgroundColor: 'white',
            marginHorizontal: 5,
            borderRadius: 140,

            ...styles.shadow,
          }}
          icon={icons.plus}
          styleIcon={{
            width: 20,
            height: 20,
          }}
          onPress={() => navigation.navigate('Test')}
        />
        <Tabs
          isFocus={menu === 3 ? true : false}
          onPress={() => setMenu(3)}
          icon={icons.search}
          styleIcon={{
            width: 20,
            height: 20,
          }}
          label="Recherche"
        />
        <Tabs
          isFocus={menu === 4 ? true : false}
          onPress={() => setMenu(4)}
          icon={icons.love}
          styleIcon={{
            width: 20,
            height: 20,
          }}
          label="Favories"
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '"#000"',
  },
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
  shadow1: {
    shadowColor: '#fff',

    shadowOffset: {
      width: 1,
      height: 4,
    },
    shadowOpacity: 0.89,
    shadowRadius: 20,
    elevation: 23,
  },
});
export default Home;
