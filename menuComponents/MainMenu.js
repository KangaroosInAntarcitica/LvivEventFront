import React, {Component, PureComponent} from 'react';
import {View, Text, TouchableOpacity, TouchableWithoutFeedback, Alert, StyleSheet, Image, FlatList} from 'react-native';

// Can not be changed. Main menu data should have stuff for each of this. If other - won't be displayed
const headerData = [
    {id: 'settings'},
    {id: 'messages'},
    {id: 'events'},
    {id: 'profile'}
];

class HeaderItem extends Component{
    // An option in the header menu. The defaults are in the header items. Set in the data
    // Properties: id (image is chosen by id); onPress(id); selected = bool; title (text)
    // type = 'button', 'title', 'info'
    onPress(){
        this.props.onPress(this.props.id);
    }
    render() {
        const style = this.props.selected ? styles.headerItemSelected : styles.headerItem;
        const imageStyle = this.props.selected ? styles.headerImageSelected : styles.headerImage;
        let image;
        if(this.props.id === 'settings') image = require('../images/icons/settings.png');
        else if(this.props.id === 'messages') image = require('../images/icons/chat.png');
        else if(this.props.id === 'events') image = require('../images/icons/calendar.png');
        else if(this.props.id === 'profile') image = require('../images/icons/profile.png');

        return (
            <TouchableOpacity style={style} onPress={this.onPress.bind(this)}>
                <Image style={imageStyle} source={ image } />
            </TouchableOpacity>
        );
    }
}

class MainMenuHeader extends PureComponent {
    // The header.
    // Properties: data {id}; onPress; selected = id
    renderItem = ({item}) => (
        <HeaderItem
            id={item.id}
            onPress={this.props.onPress}
            selected={!!(this.props.selected === item.id)}
            image={item.image}
        />
    );

    render()
    {
        return (
            <View style={styles.header}>
                <Image style={styles.backgroundImage} source={require('../images/mainMenuHeader.png')} />
                <FlatList contentContainerStyle={styles.headerList}
                    data={this.props.data}
                    extraData={this.props.selected}
                    keyExtractor={(item, index) => item.id}
                    renderItem={this.renderItem}
                />
            </View>
        );
    }
}

class ProfileItem extends Component {
    render(){
        const style = this.props.selected ? styles.buttonSelected : styles.button;
        const textStyle = this.props.selected ? styles.buttonTextSelected : styles.buttonText;
        const imageStyle = this.props.selected ? styles.buttonImageSelected : styles.buttonImage;
        return(
            <TouchableOpacity style={styles.profileItem}>

                <Image style={styles.profileItemPicture} source={require('../images/defaultProfile.png')} />
                <Text style={styles.profileText} > {'Yuriy Mikolayovitch'} </Text>
            </TouchableOpacity>
        );
        <Image style={styles.profileItemBack} source={require('../images/mainMenuHeader.png')} />
    }
}

class MainMenuItem extends Component{
    // Properties: data {id, title}; onPress(id); selected = bool
    onPress(){
        this.props.onPress(this.props.id);
    }
    renderButton(){
        const style = this.props.selected ? styles.buttonSelected : styles.button;
        const textStyle = this.props.selected ? styles.buttonTextSelected : styles.buttonText;
        const imageStyle = this.props.selected ? styles.buttonImageSelected : styles.buttonImage;
        return (
            <TouchableOpacity style={style} onPress={this.onPress.bind(this)}>
                <Image style={imageStyle} source={require('../images/icons/calendar.png')} />
                <Text style={textStyle}> {this.props.title} </Text>
            </TouchableOpacity>
        );
    }
    renderTitle(){
        return(
            <Text style={styles.title}> {this.props.title} </Text>
        );
    }
    render() {
        if(this.props.type === 'button' || ! this.props.type)
            return this.renderButton();
        else if(this.props.type === 'title')
            return this.renderTitle();
    }
}

export default class MainMenu extends PureComponent {
    // Properties: data
    state = {
        // responsible for current menu state (can be one of settings, messages, events, profile)
        selectedTab: 'events',
        selectedData: this.props.data['events'],
        // responsible for selected item in submenu
        selected: this.props.data['events'][0].id,
    };

    keyExtractor = (item, index) => item.id;

    changeTab = (id) => {
        this.setState({
            selectedTab: id,
            selectedData: this.props.data[id],
            selected: this.props.data[id][0].id
        });
    };

    onPressItem = (id) => {
        // updater functions are preferred for transactional updates
        this.setState({selected: id});
        // find the required element
        for(let i = 0; i < this.state.selectedData.length; i++){
            let item = this.state.selectedData[i];
            if(item.id === id && item.onPress){
                item.onPress();
            }
        }
    };

    renderItem = ({item}) => (
        <MainMenuItem
            id={item.id}
            onPress={this.onPressItem.bind(this)}
            selected={!!(this.state.selected === item.id)}
            title={item.title}
            type={item.type}
        />
    );

    render()
    {
        return (
            <View style={styles.page}>
                <MainMenuHeader data={headerData} onPress={this.changeTab.bind(this)} selected={this.state.selectedTab}/>
                <ProfileItem />
                <FlatList
                    data={this.state.selectedData}
                    extraData={this.state}
                    keyExtractor={this.keyExtractor}
                    renderItem={this.renderItem}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    page: {
        width: 280,
        height: "100%",
        backgroundColor: "#8E44AD",
        flexDirection: "column"
    },
    backgroundImage: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        resizeMode: 'stretch'
    },
    button: {
        height: 50,
        flexDirection: 'row'
    },
    buttonSelected: {
        height: 50,
        flexDirection: 'row',
        backgroundColor: '#FFFFFF22'
    },
    buttonImage: {
        width: 40,
        height: 40,
        margin: 5,
        resizeMode: 'stretch',
        tintColor: '#FFFFFFAA'
    },
    buttonImageSelected: {
        width: 40,
        height: 40,
        margin: 5,
        resizeMode: 'stretch',
        tintColor: '#FFFFFF'
    },
    buttonText: {
        color: '#FFFFFFAA',
        fontSize: 20,
        marginLeft: 10,
        marginTop: 8
    },
    buttonTextSelected: {
        color: '#FFFFFF',
        fontSize: 20,
        marginLeft: 10,
        marginTop: 8
    },
    title: {
        color: '#FFFFFF',
        fontSize: 20
    },

    header: {
        width: '100%',
        height: 50,
        marginBottom: 4
    },
    headerList: {
        width: '100%',
        height: '100%',
        justifyContent: 'space-around',
        alignContent: 'center',
        flexDirection: 'row'
    },
    headerItem: {
        width: 50,
        height: 50
    },
    headerItemSelected: {
        width: 50,
        height: 50,
        backgroundColor: '#FFFFFFAA'
    },
    headerImage: {
        height: 40,
        width: 40,
        margin: 5,
        resizeMode: 'stretch',
        tintColor: '#FFFFFF99'
    },
    headerImageSelected: {
        height: 40,
        width: 40,
        margin: 5,
        resizeMode: 'stretch',
        tintColor: '#8E44AD'
    },

    profileItem: {
        width: '100%',
        height: 100,
        backgroundColor: '#8E44AD',
        flexDirection: 'row'
    },
    profileItemBack: {
        width: '100%',
        height: 100,
        bottom: 0,
        left: 0,
        position: 'absolute',
        resizeMode: 'stretch'
    },
    profileItemPicture: {
        width: 40,
        height: 40,
        margin: 5,
        borderRadius: 100,
        resizeMode: 'stretch'
    },
    profileText: {
        color: 'white',
        fontSize: 24,
        marginHorizontal: 10,
        marginTop: 6,
        maxWidth: 210
    }
});