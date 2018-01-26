import React, {Component, PureComponent} from 'react';
import {View, Text, TouchableOpacity,  Alert, StyleSheet, Image, FlatList} from 'react-native';

import MainMenuItem from '../menuComponents/MainMenuItem.js';
import Icon from '../menuComponents/Icon.js';

// Can not be changed. Main menu data should have stuff for each of this. If other - won't be displayed
const headerData = [
    {id: 'settings', icon: 'settings'},
    {id: 'messages', icon: 'chat'},
    {id: 'events', icon: 'calendar'},
    {id: 'profile', icon: 'profile'}
];

class HeaderItem extends Component{
    // An option in the header menu. The defaults are in the header items. Set in the data
    // Properties: id; onPress(id); selected = bool; icon = icon
    render() {
        const style = this.props.selected ? styles.headerItemSelected : styles.headerItem;
        const imageStyle = this.props.selected ? styles.headerImageSelected : styles.headerImage;

        return (
            <TouchableOpacity style={style} onPress={() => this.props.onPress(this.props.id)}>
                <Icon style={imageStyle} icon={this.props.icon} />
            </TouchableOpacity>
        );
    }
}

class MainMenuHeader extends PureComponent {
    // The header.
    // Properties: data obj{id, icon}; onPress(id); selected = id
    renderItem = ({item}) => (
        <HeaderItem
            id={item.id}
            onPress={this.props.onPress}
            selected={!!(this.props.selected === item.id)}
            icon={item.icon}
        />
    );

    render()
    {
        return (
            <View style={styles.header}>
                <Image style={styles.backgroundImage} source={require('../images/mainMenuHeader.png')} />
                <FlatList
                    contentContainerStyle={styles.headerList}
                    data={this.props.data}
                    extraData={this.props.selected}
                    keyExtractor={(item, index) => item.id}
                    renderItem={this.renderItem}
                />
            </View>
        );
    }
}

export default class MainMenu extends PureComponent {
    // Properties: data
    state = {
        // responsible for current menu state (can be one of headerData)
        // selectedTab is just the tab id
        // selectedData is the object with data corresponding to selected tab
        selectedTab: 'events',
        selectedData: this.props.data['events'],
        // responsible for selected item in submenu
        selected: this.props.data['events'][0].id,
    };

    changeTab = (id) => {
        this.setState({
            selectedTab: id,
            selectedData: this.props.data[id]
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
            icon={item.icon}
        />
    );

    render()
    {
        return (
            <View style={styles.page}>
                <MainMenuHeader data={headerData} onPress={this.changeTab.bind(this)} selected={this.state.selectedTab}/>
                <FlatList
                    data={this.state.selectedData}
                    extraData={this.state}
                    keyExtractor={(item, key) => item.id}
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
    }
});