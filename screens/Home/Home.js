import React, { useContext, useEffect, useRef, useState } from 'react';

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
import { InputForm, Loading, PostItem, Tabs, TextButtom, UpdateModif } from '../../components';
import Header from '../../components/Header';
import { icons, images } from '../../constants';
import { AuthContext } from '../../context/AuthContext';
import { Shadow } from 'react-native-shadow-2';
import axios from 'axios';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Favorie, Notification, Search } from '../jndex';
import { useDispatch, useSelector } from 'react-redux';
import { AddFavorie, getCategoriePost, getFavoriePost, getPosts, getUsers } from '../../redux/redux-toolkit/ApiCall';
const { height, width } = Dimensions.get('screen');
const ITEM_SIZE = width * 0.3;

const API_URL = 'https://node-sql-faye-api.vercel.app';
// const API_URL = "http://10.0.2.2:3000/"

const Home = ({ navigation }) => {
  const { user } = useContext(AuthContext);
  const [menu, setMenu] = React.useState(1);
  const [showcat, setShowcat] = React.useState("postCategorie");
  const [cat, setCat] = React.useState({});
  const [post, setPost] = React.useState([]);
  const [showLoading, setShowLoading] = React.useState(false);
  const [showModal, setShowModal] = React.useState(false);
  const [title, setTitle] = React.useState('');
  const [content, setContent] = React.useState('');
  const [categorie, setCategorie] = React.useState('');
  const [showMenubar, setShowMenubar] = React.useState(true)
  const scrollx = useRef(new Animated.Value(0)).current;
  const [categoriePost, setCategoriePost] = useState([])
  const { error, posts, errorMessage, postCategorie } = useSelector(state => state.post)
  // let postcat = posts.filter(a => a.categorie === postCategorie);



  const dataCategorie = Object.keys(postCategorie).map(i => ({
    id: i,
    cat: postCategorie[i],
  }));
  const dispatch = useDispatch()
  const dispatchc = useDispatch()
  const dispatchp = useDispatch()


  useEffect(() => {
    getCategoriePost(dispatch)
    getPosts(dispatch)

    getUsers(dispatch)
  }, []);

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
          backgroundColor: 'white',
        }}>
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
                {l && l.toLocaleUpperCase()}
              </Text>
            </TouchableOpacity>
          }
        />
        {showLoading && <Loading title={'Patientez svp...'} />}
        {posts.length == 0 && <Loading title={'TAKHIRLOUL TOUTI...'} />}

        <View
          style={{
            padding: 10,
            flexDirection: 'row',
            width,
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
            showsHorizontalScrollIndicator={false}
            keyExtractor={item => item.id}
            renderItem={({ item }) => {
              return (

                <TouchableOpacity style={{
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "teal",
                  padding: 6,
                  borderRadius: 5,
                  marginRight: 3
                  
                }}><Text style={{
                  color: "#fff",
                  fontSize: 14,
                  fontWeight: "400",
                  textTransform: "capitalize"
                }}>{item.cat.categorie}</Text></TouchableOpacity>
                )
              }}
              />
              </View>
          </View>
       <View
       
       style={{
        marginTop: 12,
        paddingHorizontal: 12
       }}>
        <FlatList 
        ListFooterComponent={
          <View style={{paddingBottom: 120}} />
        }
        data={posts}
        keyExtractor={item => `${item.id_post}`}
        renderItem={({item,index}) => <PostItem item={item} index={index} />}
        />
       </View>
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
  const dispatchs = useDispatch()
  const nitt = useSelector(state => state.auth.user)
  const uid = nitt?.others?.id;

  return (
    <View style={styles.container}>
      {showModal && renderModal()}
      <StatusBar backgroundColor="white" barStyle={'dark-content'} />

      <View
        style={{
          flex: 1,
          backgroundColor: '#f3f3f3',
        }}>
        {renderMenu()}
      </View>

      <View
        style={{
  
          borderTopRightRadius: 10,
          height: 60,
          flexDirection: 'row',
          borderTopLeftRadius: 10,
          backgroundColor: '#fff',
          ...styles.shadow,

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
