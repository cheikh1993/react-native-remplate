import React, { useEffect, useState } from 'react'
import { View,Text, TouchableOpacity } from 'react-native'
import { Header } from '../../components';

const SinglePost = ({route, navigation}) => {

  const [singlepost, setSinglePost] = useState({})
  console.log(navigation);
  useEffect(() => {
    let {item} = route.params
    setSinglePost(item)
  },[])
  const {Likes, categorie,content,email,title} = singlepost
  console.log(categorie);
  return (
    <View>
      <Header
        title={categorie}
        leftComponent={
          <TouchableOpacity 
          onPress={() => navigation.goBack()}
          >
            <Text>Go Back</Text>
          </TouchableOpacity>
        }
      />
    </View>
  );
}

export default SinglePost