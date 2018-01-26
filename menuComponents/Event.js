import React, {Component} from 'react';
import {View, Text, Image, FlatList, TouchableOpacity, StyleSheet, Alert, Dimensions} from 'react-native';

import Icon from '../menuComponents/Icon.js';

// TODO automate the data creation process, instead by creating a separate component for startdate, organisator... manually

class EventData extends Component{
    render(){
        return(
        <View style={dataItemStyle.body} >
            <Icon style={dataItemStyle.image} icon={this.props.icon} />
            <Text style={dataItemStyle.name}> {this.props.title} </Text>
            <Text style={dataItemStyle.text}> {this.props.text} </Text>
        </View>);
    }
}

class EventText extends Component{
    render(){
        return(
            <View>
                <View style={textItemStyle.header} >
                    <Text style={textItemStyle.title}>{this.props.title}</Text>
                </View>
                <View style={textItemStyle.body} >
                    <Text style={textItemStyle.text} >{this.props.text}</Text>
                </View>
            </View>
        );
    }
}

class EventImage extends Component{
    constructor(props){
        super();
        this.state = {height: 0};

        // set the height of image to maximum possible value, so that the image won't be cut
        Image.getSize(props.image, (width, height) => {this.setState({
            height: (Dimensions.get('window').width - 24) / width * height
        })});
    }
    render(){
        return(
            <View style={imageItemStyle.body} >
                <Image resizeMode={'contain'}
                       style={[{height: this.state.height}, imageItemStyle.image]}
                       source={{uri: this.props.image}}
                />
            </View>
        );
    }
}

class EventTitle extends Component{
    render(){
        return(
            <View style={titleItemStyle.body} >
                <Text style={titleItemStyle.title}>{this.props.title}</Text>
            </View>
        );
    }
}

export default class Event extends Component{
    constructor(props){
        super();
        this.props = props;

        const menuHeader = {
            name: props.event,
            buttons: [
                {id: 'description', title: 'Description', onPress: this.setPageState.bind(this, 'description')},
                {id: 'transfer', title: 'Transfer', onPress: this.setPageState.bind(this, 'transfer')},
                {id: 'timetable', title: 'Timetable', onPress: this.setPageState.bind(this, 'timetable')}
            ]
        };

        this.state = {
            pageState: 'description',
            data: {}
        };

        this.loadEvent.call(this);
        props.setMenuHeader(menuHeader);
    }
    setPageState(pageState){
        this.setState({pageState: pageState});
    }
    loadEvent(){
        let events;
        fetch("https://lvivevent.herokuapp.com/" + 'getEvent/' + this.props.event, {
            method: 'GET'
        })
            .then((response) => response.json())
            .then((data) => {
                this.setState({data});
            })
            .catch(() => { Alert.alert('error')});

    }
    render(){
        if(this.state.pageState === 'description')
            return(
                <View>
                    <EventTitle title={this.state.data.name} />
                    { this.state.data.image ? <EventImage image={this.state.data.image} /> : null }
                    <EventData icon={'profile'} title={'Organisator'} text={this.state.data.organisator || 'unknown'} />
                    <EventData icon={'clock'} title={'Start date'} text={this.state.data.startdate || 'unknown'} />
                    <EventData icon={'clock'} title={'End date'} text={this.state.data.enddate || 'unknown'} />

                    <EventText title={'Description'} text={this.state.data.description || 'No description given.'}/>
                </View>
            );
        if(this.state.pageState === 'transfer')
            return(
                <EventText title={'Transfer'} text={this.state.data.transfer || 'No transfer description given.'}/>
            );
        if(this.state.pageState === 'timetable')
            return(
                <EventText title={'Timetable'} text={this.state.data.timetable || 'No timetable description given.'}/>
            );
    }
}

const dataItemStyle = StyleSheet.create({
    body: {
        width: Dimensions.get('window').width - 20,
        height: 40,
        marginHorizontal: 10,
        marginTop: 8,
        flexDirection: 'row',
        backgroundColor: '#FFFFFF'
    },
    name: {
        marginTop: 8,
        width: 120,
        fontSize: 18,
        color: '#BBBBBB'
    },
    text: {
        marginTop: 4,
        fontSize: 22,
        color: '#999999'
    },
    image: {
        width: 30,
        height: 30,
        margin: 5,
        tintColor: '#2E72A0',
        marginHorizontal: 10
    }
});

const textItemStyle = StyleSheet.create({
    header: {
        width: Dimensions.get('window').width - 20,
        height: 40,
        marginHorizontal: 10,
        marginTop: 8,
        flexDirection: 'row',
        backgroundColor: '#A05ABF'
    },
    title: {
        margin: 4,
        marginLeft: 20,
        fontSize: 22,
        color: '#FFFFFF'
    },
    body: {
        width: Dimensions.get('window').width - 20,
        marginHorizontal: 10,
        backgroundColor: '#FFFFFF'
    },
    text: {
        margin: 10,
        color: '#999999',
        fontSize: 18
    }
});

const imageItemStyle = StyleSheet.create({
    body: {
        width: Dimensions.get('window').width - 20,
        marginHorizontal: 10,
        marginTop: 8,
        backgroundColor: '#FFFFFF'
    },
    image: {
        width: Dimensions.get('window').width - 24,
        resizeMode: 'contain',
        margin: 2
    }
});

const titleItemStyle = StyleSheet.create({
    body: {
        width: Dimensions.get('window').width - 20,
        height: 40,
        marginHorizontal: 10,
        marginTop: 8,
        flexDirection: 'row',
        backgroundColor: '#FFFFFF'
    },
    title: {
        width: Dimensions.get('window').width - 60,
        margin: 0,
        marginHorizontal: 20,
        fontSize: 26,
        textAlign: 'center',
        color: '#A05ABF'
    }
});