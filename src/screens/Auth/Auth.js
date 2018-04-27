import React, { Component } from 'react';
import { Text, View, Button, TextInput, 
    KeyboardAvoidingView, Keyboard, 
    TouchableWithoutFeedback,StyleSheet, 
    ImageBackground, Dimensions } from 'react-native';
import startMainTabs from '../MainTabs/startMainTabs';
import Icon from 'react-native-vector-icons/Ionicons';
import DefaultInput from '../../components/UI/DefaultInput/DefaultInput';
import HeadingText from '../../components/UI/HeadingText/HeadingText';
import MainText from '../../components/UI/MainText/MainText';
import background from '../../../assets/dogwallnew.jpg';
import CustomButton from '../../components/UI/CustomButton/CustomButton';
import validate from '../../utility/validation';
import { connect } from 'react-redux';
import { authStatus } from '../../store/actions/index';


class Auth extends Component {

    state = {
     viewMode: Dimensions.get('window').height > 500 ? 'portrait' : 'landscape',
     authMode: 'login',
     controls: {
         email:{
             value:'',
             valid:false,
             touched:false,
             validationRules:{
                 isEmail:true
             }
         },
         password:{
            value:'',
            valid:false,
            touched:false,
            validationRules:{
                minLength:6
            }
        },
         confirmPassword:{
            value:'',
            valid:false,
            touched:false,
            validationRules:{
                equalTo:'password'
            }
        }
     }
    }

    constructor(props){
        super(props);
        Dimensions.addEventListener('change', this.updateStyles);
    }

    componentWillUnmount() {
        Dimensions.removeEventListener('change', this.updateStyles);
    }

    updateStyles = (dims) => {
        this.setState({
            viewMode: dims.window.height > 500 ? 'portrait' : 'landscape'
        });
    }

    authHandler = () => {
        const authData = {
            email: this.state.controls.email.value,
            password: this.state.controls.password.value,
        };
        this.props.onLogin(authData);
        startMainTabs();
    }

    authSwitcher = () => {
        this.setState(prevState=>{
            return {
                authMode: prevState.authMode === 'login' ? 'signup' : 'login'
            }
        })
    }

    updateInputState = (key,value) => {
        let connectedValue;

        if(this.state.controls[key].validationRules.equalTo){
            const equalControl = this.state.controls[key].validationRules.equalTo;
            const equalValue = this.state.controls[equalControl].value;
            connectedValue = {
                ...connectedValue,
                equalTo: equalValue
            };    
        }

        if(key==='password'){
            connectedValue = {
                ...connectedValue,
                equalTo: value
            };
        }
        this.setState(prevState => {
            return {
                controls:{
                    ...prevState.controls,
                    confirmPassword:{
                        ...prevState.controls.confirmPassword,
                        valid: key === 'password'? 
                        validate(prevState.controls.confirmPassword.value, 
                                 prevState.controls.confirmPassword.validationRules,
                                 connectedValue
                                ) 
                                : prevState.controls.confirmPassword.valid
                    },
                    [key]:{
                        ...prevState.controls[key],
                        value: value,
                        valid: validate(value, prevState.controls[key].validationRules, connectedValue),
                        touched: true
                    }
                }
            }
        });
    }

    render() {
        let header = null;
        let confirmPasswordControl = null;
        let introText = this.state.authMode === 'login' ? 'Log In !' : 'Sign Up !';
        if(this.state.viewMode === 'portrait'){
            header = (
                <MainText>
                    <HeadingText>{introText}</HeadingText>
                </MainText>
            );
        }
        if(this.state.authMode==='signup'){
            confirmPasswordControl = (
                <View style={this.state.viewMode === 'portrait' ? styles.portraitPasswordWrapper : styles.landscapePasswordWrapper}>    
                    <DefaultInput placeholder="Confirm Password"
                     style={styles.input}
                     secureTextEntry
                     keyboardType='default'
                     value={this.state.controls.confirmPassword.value}
                     onChangeText={(val)=>{this.updateInputState('confirmPassword',val)}}
                     valid={this.state.controls.confirmPassword.valid}
                     touched={this.state.controls.confirmPassword.touched}
                     />
                 </View>   
            );
        }

        return (
            <ImageBackground source={background} style={styles.backgroundImage}>
            <KeyboardAvoidingView style={styles.container} behavior='padding'>
             {header}
             <CustomButton 
               color="#29aaf4" 
               onPress={this.authSwitcher}>
               Switch to {this.state.authMode === 'login'? 'Signup' : 'Login'}
             </CustomButton>
             <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
             <View style={styles.inputContainer}>
                <DefaultInput placeholder="E-Mail" style={styles.input}
                 value={this.state.controls.email.value}
                 autoCapitalize='none'
                 autoCorrect={false}
                 keyboardType='email-address'
                 onChangeText={(val)=>{this.updateInputState('email',val)}}
                 valid={this.state.controls.email.valid}
                 touched={this.state.controls.email.touched}
                />
                <View style={this.state.viewMode === 'portrait' || this.state.authMode === 'login'
                ? styles.portraitPasswordContainer 
                : styles.landscapePasswordContainer}>
                 <View style={this.state.viewMode === 'portrait' || this.state.authMode === 'login'
                 ? styles.portraitPasswordWrapper 
                 : styles.landscapePasswordWrapper}>
                    <DefaultInput placeholder="Password"
                    secureTextEntry
                    keyboardType='default'
                    style={styles.input}
                    value={this.state.controls.password.value}
                    onChangeText={(val)=>{this.updateInputState('password',val)}}
                    valid={this.state.controls.password.valid}
                    touched={this.state.controls.password.touched}
                    />
                 </View>
                 {confirmPasswordControl}
                </View>
             </View>
             </TouchableWithoutFeedback> 
            <CustomButton color="#29aaf4" onPress={this.authHandler}
            disabled={
                !this.state.controls.email.valid ||
                !this.state.controls.password.valid ||
                !this.state.controls.confirmPassword.valid && this.state.authMode === 'signup'
            }
            >Submit
            </CustomButton> 
            </KeyboardAvoidingView>
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    input:{
        backgroundColor: "#eee",
        borderColor: "#bbb"
    },
    backgroundImage:{
        width: '100%',
        flex: 1,
    },
    inputContainer:{
        width: '80%'
    },
    textHeader:{
        fontSize: 30,
        fontWeight: 'bold'
    },
    landscapePasswordContainer:{
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    portraitPasswordContainer:{
        flexDirection: 'column',
        justifyContent: 'flex-start'
    },
    landscapePasswordWrapper:{
        width: '45%'
    },
    portraitPasswordWrapper:{
        width: '100%'
    }
});

const mapDispatchToProps = dispatch => {
    return {
        onLogin: authData => dispatch(authStatus(authData))
    }
};

export default connect(null,mapDispatchToProps)(Auth);