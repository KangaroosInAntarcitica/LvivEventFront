import React, { Component, PureComponent } from 'react';
import { View, Text, TouchableOpacity, Alert, StyleSheet, Image, FlatList, ScrollView } from 'react-native';

// this is how menuHeader property should look:
// onPress is called with the button id
const defaultMenuHeader = {
    name: 'Welcome!',
    buttons: [
        {id: 'Test', title: 'Test', onPress: (id) => {Alert.alert('Pressed', 'id: ' + id)}}
    ]
};

class Header extends Component{
    render(){
        return(
            <View style={styles.header}>
                <View>
                    <TouchableOpacity onPress={ () => {} } style={styles.headerButton}>
                        <Image style={styles.backgroundImage} source={require('../images/iconsNavigation/backArrow.png')} />
                    </TouchableOpacity>
                </View>
                <Text style={styles.headerText}> { this.props.text } </Text>
                <View style={{flexDirection: 'row'}} >
                    <TouchableOpacity onPress={ ()=>{} } style={styles.headerButton} >
                        <Image style={styles.backgroundImage} source={require('../images/iconsNavigation/search.png')} />
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

class Option extends Component{
    onPress() {
        this.props.onPress(this.props.id);
    }
    render(){
        if(this.props.selected)
            return(
                <TouchableOpacity onPress={ this.onPress.bind(this) } style={styles.optionsButtonSelected}>
                    <Text style={styles.optionsTextSelected}> {this.props.title} </Text>
                </TouchableOpacity>
            );
        else
            return(
                <TouchableOpacity onPress={ this.onPress.bind(this) } style={styles.optionsButton}>
                    <Text style={styles.optionsText}> {this.props.title} </Text>
                </TouchableOpacity>
            );
    }
}

class Options extends PureComponent{
    state = { selected: null}
    onPressItem(id){
        // set
        this.setState({selected: id});
        // call the function
        for(let i = 0; i < this.props.data.length; i++){
            let item = this.props.data[i];
            if(item.id === id)
                item.onPress(id);
        }
    }
    keyExtractor(item, index){
        return item.id;
    }
    renderItem({item}){
        return(
            <Option
                title={item.title}
                id={item.id}
                onPress={this.onPressItem.bind(this)}
                selected={this.state.selected === item.id}
            />
        );
    }
    render(){
        return(
            <View style={styles.options}>
                <FlatList
                    horizontal={true}
                    contentContainerStyle={styles.optionsList}
                    data={this.props.data}
                    extraData={this.state}
                    keyExtractor={this.keyExtractor.bind(this)}
                    renderItem={this.renderItem.bind(this)}
                />
            </View>
        );
    }
}

export default class Menu extends Component{
    render(){
        return(
            <View style={styles.page}>
                <Header text={this.props.menuHeader ? this.props.menuHeader.name : defaultMenuHeader.name} />
                <Options data={this.props.menuHeader ? this.props.menuHeader.buttons : defaultMenuHeader.buttons} />

                { this.props.innerPage }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    page: {
        width: '100%',
        height: '100%',
        backgroundColor: "#ecf0f1"
    },
    backgroundImage: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        resizeMode: 'stretch'
    },
    header: {
        width: "100%",
        height: 50,
        backgroundColor: "#8e44ad",
        flexDirection: "row",
        justifyContent: "space-between"
    },
    headerButton: {
        width: 34,
        height: 34,
        backgroundColor: "#FFFFFF00",
        margin: 7,
        marginHorizontal: 10
    },
    headerText: {
        fontSize: 30,
        color: "#FFFFFF",
        fontWeight: 'bold',
        margin: 6
    },
    options: {
        width: "100%",
        height: 50,
        justifyContent: "flex-start",
        flexDirection: "row",
        backgroundColor: "#a05abf"
    },
    optionsList: {
        justifyContent: "flex-start",
        flexDirection: "row"
    },
    optionsButton: {
        height: 50,
        backgroundColor: "#a05abf"
    },
    optionsButtonSelected: {
        height: 50,
        borderBottomWidth: 5,
        backgroundColor: "#a05abf",
        borderColor: "#FFFFFF"
    },
    optionsText: {
        fontSize: 24,
        color: "#FFFFFF",
        paddingTop: 8,
        paddingHorizontal: 4,
        fontWeight: 'normal'
    },
    optionsTextSelected: {
        fontSize: 24,
        color: "#FFFFFF",
        paddingTop: 8,
        paddingHorizontal: 4,
        fontWeight: 'normal'
    },
    shadow: {
        position: 'absolute',
        left: 0,
        top: 90,
        width: "100%",
        height: 5,
        resizeMode: "stretch"
    }
});