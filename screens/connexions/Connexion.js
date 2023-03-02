import {MotiView, useAnimationState} from 'moti';
import React, {useContext, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Animated,
  Dimensions,
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Shadow} from 'react-native-shadow-2';
import 'react-native-reanimated';
import {CheckBox, IconButton, InputForm, Loading, TextButtom} from '../../components';
import {icons} from '../../constants';
import {AuthContext} from '../../context/AuthContext';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../redux/redux-toolkit/ApiCall';
import RenderSingIn from './RenderSingIn';
const {height, width} = Dimensions.get('screen');

const Connexion = ({navigation}) => {
  const [show, setShow] = React.useState(true);
  const [password, setPassword] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [visible, setVisible] = React.useState(false);
  const [nom, setNom] = React.useState('');
  const [prenom, setPrenom] = React.useState('');
  const [adress, setAdress] = React.useState('');
  const [date, setDate] = React.useState('');
  const [checkboxSelected, setCheckboxSelected] = React.useState(false);
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [messageError, setErrorMessage] = React.useState('');
  const [error, setError] = React.useState(false);
  const [succes, setSucces] = React.useState(false);
  const [userInfo, setUser] = React.useState({});
  const [errConnect, setErrorConnect] = React.useState(false);
  const [loadings, setLoading] = React.useState(false);
  const [errConnectmessage, setErrorConnectmessage] = React.useState(false);
  const {loading, err, dispatch, user} = useContext(AuthContext);
  const URL =
    Platform.OS === 'ios' ? 'http://localhost:8800' : 'http://10.0.2.2:8800S67';
  // const API_URL =
  //   Platform.OS === 'ios' ? 'http://localhost:3000' : 'http://10.0.2.2:3000';
  const API_URL = 'https://node-sql-faye-api.vercel.app';

  const animationStates = useAnimationState({
    signIn: {
      height: height * 0.55,
    },

    signUp: {
      height: height * 0.7,
    },
  });




useEffect(() => {
  animationStates.transitionTo('signIn');
  // fetchUser()
  

  }, []);
 
  

  function renderSingUp() {
    const handSubmitSignUp = () => {
      if (password !== confirmPassword) {
        setError(true);
        setErrorMessage('The passwords are different !!!');
        setTimeout(() => {
          setError(false);
        }, 2000);
      } else if (nom.length < 6 || prenom.length < 6) {
        setError(true);
        setErrorMessage(
          'Le nom et le prenom doivent avoir au moins 6 caracteres',
        );
        setTimeout(() => {
          setError(false);
        }, 5000);
      } else if (nom === '' || prenom === '' || adress === '' || date === '') {
        setError(true);
        setErrorMessage('Le champ ne doit pas etre vide');
        setTimeout(() => {
          setError(false);
        }, 2000);
      } else if (email.length < 10) {
        setError(true);
        setErrorMessage('Le Mail doit contenir au moins 10 caracteres');
        setTimeout(() => {
          setError(false);
        }, 2000);
      } else if (adress.length < 3) {
        setError(true);
        setErrorMessage('Le Mail doit contenir au moins 10 caracteres');
        setTimeout(() => {
          setError(false);
        }, 2000);
      } else {
        setSucces(true);
        setErrorMessage('Enregistrement reussit avec succes.......');
        setNom('');
        setPrenom('');
        setAdress('');
        setDate('');
        setEmail('');
        setPassword('');

        setConfirmPassword('');
      }
    };
    return (
      <MotiView
        state={animationStates}
        style={{
          marginTop: 10,
        }}>
        <Shadow>
          <View
            style={{
              backgroundColor: 'white',
              flex: 1,
              backgroundColor: 'white',
              borderRadius: 5,
              paddingVertical: 12,
              paddingHorizontal: 10,
              borderWidth: error ? 1 : 0,
              borderColor: error ? 'red' : null,
            }}>
            <View>
              <Text
                style={{
                  fontSize: 25,
                  color: '#000',
                  textTransform: 'capitalize',
                  width: '70%',
                }}>
                Creez un nouveau compte
              </Text>
            </View>
            <KeyboardAwareScrollView
              enableOnAndroid={true}
              keyboardDismissMode="interactive"
              keyboardShouldPersistTaps="handled"
              extraScrollHeight={-300}
              contentContainerStyle={{
                paddingTop: 10,
                flexGrow: 1,
                paddingBottom: 120,
              }}>
              <InputForm
                prependComponent={
                  <Image
                    source={icons.bed}
                    style={{
                      width: 20,
                      height: 20,
                      tintColor: '#444444',
                    }}
                  />
                }
                appendComponent={
                  <Image
                    source={icons.event}
                    style={{
                      width: 20,
                      height: 20,
                      tintColor: '#444444',
                    }}
                  />
                }
                onChange={text => setEmail(text)}
                value={email}
                placeHolder={'Votre Address E-mail'}
              />
              <View
                style={{
                  marginTop: 12,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <InputForm
                  borderError={error}
                  onChange={text => setNom(text)}
                  value={nom}
                  placeHolder={'Nom'}
                  containerStyle={{
                    flex: 1,

                    marginRight: 12,
                  }}
                />
                <InputForm
                  prependComponent={
                    <Image
                      source={icons.bed}
                      style={{
                        width: 20,
                        height: 20,
                        tintColor: '#444444',
                      }}
                    />
                  }
                  appendComponent={
                    <Image
                      source={icons.event}
                      style={{
                        width: 20,
                        height: 20,
                        tintColor: '#444444',
                      }}
                    />
                  }
                  onChange={text => setPrenom(text)}
                  value={prenom}
                  placeHolder={'Prenom'}
                  containerStyle={{
                    flex: 1,
                  }}
                />
              </View>
              <InputForm
                prependComponent={
                  <Image
                    source={icons.bed}
                    style={{
                      width: 20,
                      height: 20,
                      tintColor: '#444444',
                    }}
                  />
                }
                appendComponent={
                  <Image
                    source={icons.event}
                    style={{
                      width: 20,
                      height: 20,
                      tintColor: '#444444',
                    }}
                  />
                }
                onChange={text => setDate(text)}
                value={date}
                placeHolder={'Date et lieu de naissance'}
                containerStyle={{
                  marginTop: 10,
                }}
              />
              <InputForm
                prependComponent={
                  <Image
                    source={icons.bed}
                    style={{
                      width: 20,
                      height: 20,
                      tintColor: '#444444',
                    }}
                  />
                }
                appendComponent={
                  <Image
                    source={icons.event}
                    style={{
                      width: 20,
                      height: 20,
                      tintColor: '#444444',
                    }}
                  />
                }
                onChange={text => setAdress(text)}
                value={adress}
                placeHolder={'Adress...'}
                containerStyle={{
                  marginTop: 10,
                }}
              />
              <View
                style={{
                  flexDirection: 'row',
                  flex: 1,
                }}>
                <InputForm
                  inputContainerStyle={{
                    flex: 1,
                  }}
                  prependComponent={
                    <Image
                      source={icons.bed}
                      style={{
                        width: 20,
                        height: 20,
                        tintColor: '#444444',
                      }}
                    />
                  }
                  appendComponent={
                    <Image
                      source={icons.event}
                      style={{
                        width: 20,
                        height: 20,
                        tintColor: '#444444',
                      }}
                    />
                  }
                  secureTextEntry={!visible}
                  onChange={text => setPassword(text)}
                  value={password}
                  placeHolder={'Password...'}
                  containerStyle={{
                    flex: 1,
                    marginTop: 10,
                    marginRight: 10,
                  }}
                />
                <InputForm
                  inputContainerStyle={{
                    flex: 1,
                  }}
                  prependComponent={
                    <Image
                      source={icons.bed}
                      style={{
                        width: 20,
                        height: 20,
                        tintColor: '#444444',
                      }}
                    />
                  }
                  appendComponent={
                    <Image
                      source={icons.event}
                      style={{
                        width: 20,
                        height: 20,
                        tintColor: '#444444',
                      }}
                    />
                  }
                  onChange={text => setConfirmPassword(text)}
                  value={confirmPassword}
                  placeHolder={'Confirm ...'}
                  containerStyle={{
                    flex: 1,
                    marginTop: 10,
                  }}
                />
              </View>
              <CheckBox
                checkbexContainerStyle={{
                  marginTop: 10,
                  width: width * 0.77,
                  paddingTop: 10,
                }}
                isSelected={checkboxSelected}
                onPress={() => setCheckboxSelected(!checkboxSelected)}
              />
            </KeyboardAwareScrollView>
            <TextButtom
              onPress={() => {
                handSubmitSignUp();
              }}
              containerStyle={{
                marginTop: 10,
                height: 55,
                backgroundColor: 'tomato',
              }}
              label={'Create a account'}
              labelStyle={{
                color: 'white',
                fontSize: 17,
                fontWeight: '700',
              }}
            />
          </View>
        </Shadow>
      </MotiView>
    );
  }

  function renderAuth() {
    if (show) {
      return  <RenderSingIn navigation={navigation} />
    } else {
      return renderSingUp();
    }
  }
  return (
    <View style={styles.container}>
      {loadings && <Loading title={'Taahirloul...'} />}
      <Text
        style={{
          color: '#000',
          alignSelf: 'center',
          fontSize: 30,
          marginTop: 12,
          fontWeight: 'bold',
        }}>
        <Text> {show ? 'Login In your account' : 'Register a account'} </Text>
      </Text>

      {renderAuth()}
      {error && (
        <MotiView
          from={{opacity: 0, scale: 0.8}}
          animate={{opacity: 1, scale: 1}}
          transition={{
            type: 'timing',
            duration: 450,
          }}
          style={{
            position: 'absolute',
            backgroundColor: '#333',
            padding: 10,
            alignSelf: 'center',
            bottom: 80,
            borderRadius: 5,
          }}>
          <Text
            style={{
              fontSize: 12,
              color: '#fff',
              fontWeight: '600',
            }}>
            {messageError}
          </Text>
        </MotiView>
      )}
      {succes && (
        <MotiView
          from={{opacity: 0, scale: 0.8, height: 0}}
          animate={{opacity: 1, scale: 1, height}}
          transition={{
            type: 'timing',
            duration: 450,
          }}
          style={{
            position: 'absolute',
            zIndex: 10,
            backgroundColor: '#333',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 5,
          }}>
          <Text
            style={{
              paddingHorizontal: 5,
              fontSize: 16,
              color: 'green',
              fontWeight: '600',
            }}>
            {messageError}
          </Text>
          <TouchableOpacity onPress={() => setSucces(false)}>
            <Text
              style={{
                color: 'white',
              }}>
              Enregistrer a nouveau
            </Text>
          </TouchableOpacity>
        </MotiView>
      )}
      {show ? (
        <>
          <View
            style={{
              marginTop: 10,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                color: '#000',
                marginRight: 10,
              }}>
              Pas encore de compte ? cliquez
            </Text>
            <TextButtom
              label={'ici'}
              labelStyle={{
                color: 'blue',
                textDecorationLine: 'underline',
              }}
              onPress={() => {
                if (animationStates.current === 'signIn') {
                  animationStates.transitionTo('signUp');
                  setShow(false);
                }
              }}
            />
          </View>
          <View
            style={{
              marginTop: 10,
              alignItems: 'center',
            }}>
            <Text>Oubien vous pouvvez se connectez avec</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 10,
            }}>
            <IconButton
              containerStyle={{
                borderWidth: 1,
                borderColor: 'grey',
                paddingVertical: 5,
                borderRadius: 5,
              }}
              icon={icons.google}
              iconStyle={{
                width: 30,
                height: 30,
              }}
              label={'Google'}
            />
            <IconButton
              containerStyle={{
                borderWidth: 1,
                borderColor: 'grey',
                marginHorizontal: 10,
              }}
              icon={icons.twitter}
              iconStyle={{
                width: 30,
                height: 30,
              }}
              label={'Twitter'}
            />
            <IconButton
              containerStyle={{
                borderWidth: 1,
                borderColor: 'grey',
              }}
              icon={icons.facebook}
              iconStyle={{
                width: 30,
                height: 30,
              }}
              label={'facebook'}
            />
          </View>
        </>
      ) : (
        <TextButtom
          label={'Connectez-vous'}
          labelStyle={{
            color: '#444444',
            marginRight: 10,
          }}
          onPress={() => {
            if (animationStates.current === 'signUp') {
              animationStates.transitionTo('signIn');
              setShow(true);
            }
          }}
        />
      )}
      <View
        style={{
          position: 'absolute',
          bottom: -30,
          left: -30,
          height: 75,
          width: 75,
          borderRadius: 55,
          backgroundColor: 'tomato',
        }}
      />
      <View
        style={{
          position: 'absolute',
          bottom: -30,
          right: -30,
          height: 75,
          width: 75,
          borderRadius: 55,
          backgroundColor: '#ff7056a3',
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f3f3',
    paddingHorizontal: 12,
    overflow: 'hidden',
  },
});
export default Connexion;
