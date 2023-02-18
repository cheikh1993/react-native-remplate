import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {MotiView, useAnimationState} from 'moti';
import { Header, InputForm, TextButtom } from '../../components';
import { icons } from '../../constants';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
const user = [
  {
    id: 1,
    name: 'cheikh',
  },
  {
    id: 2,
    name: 'mansour',
  },
  {
    id: 3,
    name: 'Ndeye faye',
  },
  {
    id: 4,
    name: 'Daba Tine',
  },
  {
    id: 6,
    name: 'Ousmane Faye',
  },
];

// const API_URL =
//   Platform.OS === 'ios' ? 'http://localhost:3000' : 'http://10.0.2.2:3000';
const API_URL = 'https://node-sql-faye-api.vercel.app';

const Test = ({navigation}) => {
const animationStates = useAnimationState({
  hideModal:{
    opacity: 0,
    scale: 0
  },
  showModal:{
    opacity: 1,
    scale: 1.1,
  },
  
  
})

  const [uid, setId] = useState({});
  const [shoeFatlist, setShowFlatList] = useState(false);
  const [users, setUser] = useState({});
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [categorie, setCategorie] = useState('');
  const {id, name,username} = uid;
  useEffect(() => {
    getUser();

    animationStates.transitionTo("hideModal")
    
  }, []);
  const getUser = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/user`);

      setUser(res.data);
    } catch (error) {
      console.log(error);
    }
  };

const handSubmit = async () => {
try {
 const res =  await axios.post(`${API_URL}/api/post/add`,{
    title,
    content,
    categorie,

    uid: id
  })
  console.log(res.data);
  navigation.replace("Home")
} catch (error) {
  console.log(error.response.data);
}
}
  return (
    <View style={styles.container}>
      <Header
        title={'Ajouter des Postes'}
        leftComponent={
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text>Go Back</Text>
          </TouchableOpacity>
        }
        rightComponent={
          <TouchableOpacity
            style={{
              padding: 5,
            }}>
            <Image
              source={icons.menu}
              style={{
                width: 20,
                height: 20,
                tintColor: 'tomato',
              }}
            />
          </TouchableOpacity>
        }
      />
      <View style={{
        flex: 1,
        justifyContent: "center"
      }}>
        
        <KeyboardAwareScrollView
          enableOnAndroid={true}
          keyboardDismissMode="on-drag"
          keyboardShouldPersistTaps="handled"
          extraScrollHeight={-300}
          contentContainerStyle={{
            flexGrow: 1,
            paddingHorizontal: 20,
            justifyContent: "center"
          }}>
          <Text
            style={{
              color: '#000',
              fontSize: 14,
            }}>
            Title
          </Text>
          <InputForm
            onSubmitEditing={handSubmit}
            value={title}
            placeHolder={'Votre email'}
            onChange={text => setTitle(text)}
            containerStyle={{
              marginTop: 10,
            }}
            prependComponent={
              <Image
                source={icons.back}
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
              Content
            </Text>
            <InputForm
              containerStyle={{
                marginTop: 9,
              }}
              onSubmitEditing={handSubmit}
              value={content}
              onChange={text => setContent(text)}
              placeHolder="Votre mot de pass"
            
            />
          
            <Text
              style={{
                color: '#000',
                fontSize: 14,
              }}>
              User
            </Text>
            <InputForm

            prependComponent={
              <TouchableOpacity  
              onPress={() => setShowFlatList(true)  }
              >
                <Image 
                source={icons.google}

                style={{
                  height: 20,
                  width: 20,
                  tintColor: "red",
                  marginRight: 20
                }}
                />
              </TouchableOpacity>
            }
              containerStyle={{
                marginTop: 9,
              }}
              onSubmitEditing={handSubmit}
              value={id}
              placeHolder= {name ? name + username : "Ajouter un utilisateur"}
             
            />
            <Text
              style={{
                color: '#000',
                fontSize: 14,
              }}>
              Categorie
            </Text>
            <InputForm
              containerStyle={{
                marginTop: 9,
              }}
              onSubmitEditing={handSubmit}
              value={categorie}
              onChange={text => setCategorie(text)}
              placeHolder="Votre Categorie"
             
            />
          </View>
          <View
            style={{
              marginTop: 15,
              alignItems: 'flex-end',
            }}>
            <TextButtom
            containerStyle={{
              marginTop: 10,
              height: 60,
              backgroundColor: "orange",
              width: "100%"
            }}
onPress={handSubmit}
              label={'Valider'}
              
              labelStyle={{
                color: 'white',
                fontSize: 20
              }}
            />
          </View>
       
        </KeyboardAwareScrollView>
        {/* <TextInput
          style={{
            width: 200,
            padding: 10,
            backgroundColor: 'white',
            alignItems: 'center',
          }}
          placeholder={email ? email : 'votre nom'}
        /> */}
      </View>

      {shoeFatlist && (
        <View
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            left: 0,
            bottom: 0,
            backgroundColor: '#000000c9',
            paddingHorizontal: 12,
          }}>
          <MotiView
            // state={animationStates}
            from={{opacity: 0, scale: 0.8}}
            animate={{opacity: 1, scale: 1.2}}
            transition={{
              type: 'timing',
              duration: 300,
            }}
            style={{
              position: 'absolute',
              top: 150,
              right: 40,
              left: 30,
              bottom: 70,
              backgroundColor: 'white',
              paddingBottom: 30,
              paddingHorizontal: 15,
              borderRadius: 10,
            }}>
            <TouchableOpacity
              onPress={() => setShowFlatList(false)}
              style={{
                margin: 5,
                alignSelf: 'flex-end',
                height: 40,
                padding: 4,
              }}>
              <Text>X</Text>
            </TouchableOpacity>
            <FlatList
              showsVerticalScrollIndicator={false}
              data={users}
              keyExtractor={i => i.id}
              renderItem={({item, index}) => (
                <TouchableOpacity
                  onPress={() => {
                    // if (animationStates.current === 'showModal') {
                    //   animationStates.transitionTo('hideModal');
                    // }
                    setId(item);
                    setShowFlatList(false);
                  }}
                  style={{
                    paddingVertical: 20,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: 10,
                    marginBottom: 3,
                    // borderBottomColor: 'lightgrey',
                    // borderBottomWidth: .4,
                  }}>
                  <Text
                    style={{
                      fontSize: 18,
                      textTransform: 'capitalize',
                      color: '#000',
                    }}>
                    {item.name + " " + item.username}
                  </Text>

                  <Image
                    source={icons.love}
                    style={{
                      width: 15,
                      height: 15,
                      tintColor: 'grey',
                    }}
                  />
                </TouchableOpacity>
              )}
            />
          </MotiView>
        </View>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
export default Test;
