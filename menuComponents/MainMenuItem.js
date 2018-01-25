import React, {Component} from 'react';
import {View, Text, TouchableOpacity,  Alert, StyleSheet, Image, FlatList} from 'react-native';

const profileStyles = StyleSheet.create({
    item: {
        width: '100%',
        height: 80,
        flexDirection: 'row'
    },
    itemSelected: {
        width: '100%',
        height: 80,
        backgroundColor: '#FFFFFF22',
        flexDirection: 'row'
    },
    pictureHolder: {
        margin: 5,
        borderRadius: 45,
        borderWidth: 2,
        borderColor: '#FFFFFF99',
        width: 70,
        height: 70
    },
    picture: {
        width: 66,
        height: 66,
        borderRadius: 45,
        resizeMode: 'stretch'
    },
    text: {
        color: '#FFFFFFAA',
        fontSize: 20,
        maxWidth: 180,
        lineHeight: 30,
        height: 30,
        marginTop: 12,
        marginBottom: 0
    },
    textSelected: {
        color: '#FFFFFF',
        fontSize: 20,
        maxWidth: 180,
        lineHeight: 30,
        height: 30,
        marginTop: 12,
        marginBottom: 0
    },
    textUnder: {
        color: '#FFFFFF55',
        fontSize: 16,
        width: 180
    },
    textUnderSelected: {
        color: '#FFFFFFAA',
        fontSize: 16,
        width: 180
    }
});
class ProfileItem extends Component {
    render(){
        const style = this.props.selected ? profileStyles.itemSelected : profileStyles.item;
        const textStyle = this.props.selected ? profileStyles.textSelected : profileStyles.text;
        const textUnderStyle = this.props.selected ? profileStyles.textUnderSelected : profileStyles.textUnder;

        return(
            <TouchableOpacity style={style} onPress={() => {this.props.onPress(this.props.id)}}>
                <View style={profileStyles.pictureHolder}>
                    <Image style={profileStyles.picture} source={require('../images/trump.jpg')} />
                </View>
                <View style={{flexDirection: 'column'}}>
                    <Text style={textStyle} > {'Andriy Dmytruk Andriyovitch'} </Text>
                    <Text style={textUnderStyle} > {'Profile'} </Text>
                </View>
            </TouchableOpacity>
        );
    }
}

const buttonStyles = StyleSheet.create({
    item: {
        height: 50,
        flexDirection: 'row'
    },
    itemSelected: {
        height: 50,
        flexDirection: 'row',
        backgroundColor: '#FFFFFF22'
    },
    image: {
        width: 40,
        height: 40,
        margin: 5,
        resizeMode: 'stretch',
        tintColor: '#FFFFFFAA'
    },
    imageSelected: {
        width: 40,
        height: 40,
        margin: 5,
        resizeMode: 'stretch',
        tintColor: '#FFFFFF'
    },
    text: {
        color: '#FFFFFFAA',
        fontSize: 20,
        marginLeft: 10,
        marginTop: 8
    },
    textSelected: {
        color: '#FFFFFF',
        fontSize: 20,
        marginLeft: 10,
        marginTop: 8
    },
});
class ButtonItem extends Component{
    setImage(){
        const imageStyle = this.props.selected ? buttonStyles.image : buttonStyles.imageSelected;
        if(this.props.icon === 'settings')
            return <Image style={imageStyle} source={require('../images/icons/settings.png')} />
        else
            return <Image style={imageStyle} source={require('../images/icons/menu.png')} />
    }
    render(){
        const style = this.props.selected ? buttonStyles.itemSelected : buttonStyles.item;
        const textStyle = this.props.selected ? buttonStyles.textSelected : buttonStyles.text;

        return (
            <TouchableOpacity style={style} onPress={() => { this.props.onPress(this.props.id) }}>
                { this.setImage.call(this) }
                <Text style={textStyle}> {this.props.title} </Text>
            </TouchableOpacity>
        );
    }
}

export default class MainMenuItem extends Component{
    // Properties: data {id, title}; onPress(id); selected = bool
    render() {
        if(this.props.id === 'profile')
            return <ProfileItem id={this.props.id} onPress={this.props.onPress} selected={this.props.selected} />
        else if(this.props.type === 'button' || ! this.props.type)
            return <ButtonItem id={this.props.id} onPress={this.props.onPress}
                               selected={this.props.selected} title={this.props.title} icon={this.props.icon} />
    }
}