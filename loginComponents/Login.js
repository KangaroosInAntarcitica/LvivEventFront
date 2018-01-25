import React, {Component} from 'react';
import {Text, View, StyleSheet, Image, TextInput, TouchableOpacity, Dimensions} from 'react-native';

import Icon from '../menuComponents/Icon.js'

// properties: url, onSuccess, register
export default class Login extends Component {
    constructor(properties) {
        super();
        this.state = {
            message: "",
            error: false
        };
    }

    submit() {
        if (! (this.state.username && this.state.password)) {
            this.setState({message: "Nothing to submit!", error: false})
        }
        else{
            this.setState({message: "Loading", error: false});

            // Get status and print it back to user (formated)
            fetch(this.props.url + 'login', {
                method: 'POST',
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    username: this.state.username,
                    password: this.state.password
                })
            }).then((response) => {
                return response.json()
            }).then((data) => {
                let status = data.status;
                let message = status.charAt(0).toUpperCase() + status.slice(1) + "!";

                // do the default on success activity
                if (data.status == 'success') {
                    this.setState({message, error: false});
                    this.props.onSuccess();
                } else{
                    this.setState({message, error: true});
                }
            }).catch(() => {
                this.setState({message: "Error occurred!", error: true})
            });
        }
    }

    render() {
        return (
            <View style={styles.page}>
                <Image source={require('../images/login/logoHighDefinition.png')} style={styles.logo} />
                <Text style={this.state.error ? styles.informationError : styles.information}> {this.state.message} </Text>
                <View style={styles.form} >
                    <View style={styles.inputBox} >
                        <Image style={styles.inputImage} source={require('../images/icons/profile.png')} />
                        <TextInput
                            placeholder="Login"
                            onChangeText={(username) => {this.setState({username: username})}}
                            onSubmitEditing={() => {this.refs.password.focus();}}
                            style={styles.input}
                            returnKeyType="go"
                            underlineColorAndroid={'#0000'}
                        />
                    </View>
                    <View style={styles.inputBox} >
                        <Image style={styles.inputImage} source={require('../images/icons/lock.png')} />
                        <TextInput
                            ref="password"
                            placeholder="Password"
                            secureTextEntry
                            onChangeText={(password) => {this.setState({password: password})}}
                            onSubmitEditing={this.submit.bind(this)}
                            style={styles.input}
                            underlineColorAndroid={'#0000'}
                        />
                    </View>
                    <TouchableOpacity onPress={this.submit.bind(this)} style={styles.button}>
                        <Text style={styles.buttonText}> Log in </Text>
                    </TouchableOpacity>
                    <View style={styles.registerContainer}>
                        <TouchableOpacity onPress={this.props.register}>
                            <Text style={styles.registerText}>Create Account</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.props.register}>
                            <Text style={styles.registerText}>Forgot Password?</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}

// padding is added if page width is greater than 340, else not added
const styles = StyleSheet.create({
    page: {
        width: "100%",
        height: "100%",
        padding: Dimensions.get('window').width < 340 ? "0%" : "10%",
        backgroundColor: "#FFFFFF",
        justifyContent: "center",
        alignItems: "center"
    },
    logo: {
        resizeMode: "contain",
        width: '100%',
        height: '40%'
    },
    information: {
        height: 36,
        fontSize: 24,
        color: "#999999",
        textAlign: "center",
        margin: 5
    },
    informationError: {
        height: 36,
        fontSize: 24,
        color: "#ff6a4d",
        textAlign: "center",
        margin: 5
    },

    form: {
        width: "100%",
        maxWidth: 260,
        height: 210
    },
    // height: 55
    inputBox: {
        paddingRight: 5,
        paddingLeft: 0,
        paddingBottom: 10,
        margin: 5,
        marginBottom: 10,
        height: 40,
        width: "100%",
        borderColor: '#999999',
        borderBottomWidth: 2,
        flexDirection: 'row'
    },
    inputImage: {
        width: 30,
        height: 30,
        margin: 5,
        resizeMode: 'stretch',
        tintColor: '#999999'
    },
    input: {
        height: 45,
        fontSize: 20,
        margin: 0,
        width: "100%",
    },
    // height: 60
    button: {
        margin: 5,
        marginTop: 15,
        height: 40,
        borderRadius: 20,
        backgroundColor: "#a05abf",
        width: "100%"
    },
    buttonText: {
        paddingVertical: 7,
        textAlign: "center",
        fontSize: 17,
        color: "#FFFFFF"
    },
    // height: 40
    registerContainer: {
        width: '100%',
        height: 30,
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 10
    },
    registerText: {
        color: '#999999',
        backgroundColor: 'transparent',
        paddingHorizontal: 5,
    },
});