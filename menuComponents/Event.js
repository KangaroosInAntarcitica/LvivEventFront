import React, {Component} from 'react';
import {View, Text, Image, FlatList, TouchableOpacity, StyleSheet, Alert} from 'react-native';

const defaultEvent = {
    name: 'Loading Event',
    organisator: 'Not loaded yet',
    image: null,
    startdate: 'Not loaded yet',
    enddate: 'Not loaded yet',
    description: 'Description not loaded yet',
    transfer: 'Transfer not loaded yet',
    timetable: 'Timetable not loaded yet',
};

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
            pageState: 'transfer',
            data: defaultEvent
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
            return(<Text> {this.state.data.description} </Text>);
        if(this.state.pageState === 'transfer')
            return(<Text> {this.state.data.transfer} </Text>);
        if(this.state.pageState === 'timetable')
            return(<Text> {this.state.data.timetable} </Text>);
    }
}