import React, { Component } from 'react';
import {StyleSheet, TextInput, View, Button} from 'react-native';
import DefaultInput from '../../components/UI/DefaultInput/DefaultInput';

const postInput = props =>{
  return(
      <DefaultInput placeholder="Write Something About This Image."
      value={props.postData.value}
      valid={props.postData.valid}
      touched={props.postData.touched}
      onChangeText={props.onChangeText}/>
  ); 
}

export default postInput;
