import React, { Component } from 'react';
import {Image, StyleSheet } from 'react-native';


// This class was created only for optimising he use of icons.
// In react-native the require() function doesn't work with variables, that can change over time (like once given as
// props or in state), so each image we want to use needs to be pre-loaded.
// Navigation icons are not included, because they mostly do not need to be changed.
export default class Icon extends Component{
    render(){
        if(this.props.icon === 'add')
            return <Image style={this.props.style} source={require('../images/icons/add.png')} />
        if(this.props.icon === 'calendar')
            return <Image style={this.props.style} source={require('../images/icons/calendar.png')} />
        if(this.props.icon === 'chat')
            return <Image style={this.props.style} source={require('../images/icons/chat.png')} />
        if(this.props.icon === 'clock')
            return <Image style={this.props.style} source={require('../images/icons/clock.png')} />
        if(this.props.icon === 'eventEnd')
            return <Image style={this.props.style} source={require('../images/icons/eventEnd.png')} />
        if(this.props.icon === 'lock')
            return <Image style={this.props.style} source={require('../images/icons/lock.png')} />
        if(this.props.icon === 'menu')
            return <Image style={this.props.style} source={require('../images/icons/menu.png')} />
        if(this.props.icon === 'profile')
            return <Image style={this.props.style} source={require('../images/icons/profile.png')} />
        if(this.props.icon === 'profileCircle')
            return <Image style={this.props.style} source={require('../images/icons/profileCircle.png')} />
        if(this.props.icon === 'save')
            return <Image style={this.props.style} source={require('../images/icons/save.png')} />
        if(this.props.icon === 'send')
            return <Image style={this.props.style} source={require('../images/icons/send.png')} />
        if(this.props.icon === 'settings')
            return <Image style={this.props.style} source={require('../images/icons/settings.png')} />
    }
}