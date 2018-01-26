import React, {Component} from 'react';
import { AppRegistry, Text, View, StyleSheet, Image, TextInput, TouchableOpacity, Dimensions } from 'react-native';


// properties: url, onSuccess, register
export default class Register extends Component{
    constructor(properties){
        super();
        this.state = {
            message: "",
            error: false
        };
    }
    submit(){
        if (! (this.state.username && this.state.email && this.state.password)) {
            this.setState({message: "Nothing to submit!", error: false})
        }
        else if (this.state.password !== this.state.passwordRepeat){
            this.setState({message: "Wrong password repeat!", error: false})
        }
        else {
            this.setState({message: "Loading"});

            let url = this.props.url;

            fetch(url + 'register', {
                method: 'POST',
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    username: this.state.username,
                    email: this.state.email,
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
    render(){
        return(
            <View>
                <View style={styles.header}>
                    <TouchableOpacity style={styles.headerButton} onPress={this.props.login} >
                        <Image style={styles.headerImage} source={require('../images/iconsNavigation/backArrow.png')} />
                    </TouchableOpacity>
                    <Text style={styles.headerText}> Registration </Text>
                    <View style={styles.headerButton}/>
                </View>
                <View style={styles.page}>
                    <Text style={this.state.error ? styles.informationError : styles.information}> {this.state.message} </Text>
                    <View style={styles.form}>
                        <View style={styles.inputBox} >
                            <Image style={styles.inputImage} source={require('../images/icons/profile.png')} />
                            <TextInput
                                placeholder="Username"
                                onChangeText={(username) => {this.setState({username})}}
                                onSubmitEditing={() => {this.refs.email.focus();}}
                                style={styles.input}
                                returnKeyType="go"
                                underlineColorAndroid={'#0000'}
                            />
                        </View>
                        <View style={styles.inputBox} >
                            <Image style={styles.inputImage} source={require('../images/icons/mail.png')} />
                            <TextInput
                                ref="email"
                                placeholder="Email"
                                onChangeText={(email) => {this.setState({email})}}
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
                                onChangeText={(password) => {this.setState({password})}}
                                onSubmitEditing={() => {this.refs.passwordRepeat.focus();}}
                                style={styles.input}
                                returnKeyType="go"
                                underlineColorAndroid={'#0000'}
                            />
                        </View>
                        <View style={styles.inputBox} >
                            <Image style={styles.inputImage} source={require('../images/icons/lock.png')} />
                            <TextInput
                                ref="passwordRepeat"
                                placeholder="Repeat Password"
                                secureTextEntry
                                onChangeText={(passwordRepeat) => {this.setState({passwordRepeat})}}
                                onSubmitEditing={this.submit.bind(this)}
                                style={styles.input}
                                underlineColorAndroid={'#0000'}
                            />
                        </View>

                        <TouchableOpacity onPress={ this.submit.bind(this) } style={styles.button}>
                            <Text style={styles.buttonText}> Register </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    header: {
        width: '100%',
        height: 50,
        backgroundColor: '#8e44ad',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    headerButton: {
        width: 50,
        height: 50
    },
    headerImage: {
        width: 30,
        height: 30,
        position: 'absolute',
        top: 10,
        left: 10
    },
    headerText: {
        color: '#FFFFFF',
        fontSize: 24,
        paddingHorizontal: 10,
        paddingTop: 10
    },

    page: {
        width: "100%",
        height: Dimensions.get('window').height - 50,
        padding: Dimensions.get('window').width < 340 ? "0%" : "10%",
        backgroundColor: "#FFFFFF",
        justifyContent: "flex-start",
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
        height: 220
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
        marginTop: 25,
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