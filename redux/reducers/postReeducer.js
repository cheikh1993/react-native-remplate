const INITIALSTATE = {
    loading: false,
    post: null,
    err: null
}
import React from 'react'
import { GET_POST } from '../actions/post';

const postReeducer = (state= INITIALSTATE, action) => {
  switch (action.type) {
   case GET_POST : 
   return {
    loading: false,
    post: action.paylaod,
    err: null
   }
   default :
    return state
}
}
export default postReeducer;