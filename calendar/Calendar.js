import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image, Alert, FlatList, Dimensions } from 'react-native';

const colors = ['#F00', '#00F', '#FA0', '#0AF', '#A0F', '#F0A', '#0F0', '#0FF', '#0FA'];

import Date from '../calendar/Date.js';

class Header extends Component{
    render(){
        return <View style={styles.header}>
            <TouchableOpacity style={styles.headerButton} onPress={this.props.onPressLeft}>
                <Image style={styles.backgroundImage} source={require('../images/iconsNavigation/arrowLeft.png')}/>
            </TouchableOpacity>
            <Text style={styles.headerText}>{this.props.text}</Text>
            <TouchableOpacity style={styles.headerButton} onPress={this.props.onPressRight}>
                <Image style={styles.backgroundImage} source={require('../images/iconsNavigation/arrowRight.png')}/>
            </TouchableOpacity>
        </View>
    }
}

const monthStyles = StyleSheet.create({
    block: {
        width: '100%',
        backgroundColor: '#FFFFFF',
        padding: 20
    },
    list: {
        flexDirection: 'column'
    },
    line: {
        width: '100%',
        height: 1,
        backgroundColor: '#DDDDDD'
    },
    row: {
        width: '100%',
        marginVertical: 0,
        height: (Dimensions.get('window').width - 40) / 7,
        flexDirection: 'row'
    },
    rowBack: {
        height: 100,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        position: 'absolute',
        left: 0
    },
    rowDay: {
        width: '100%',
        marginVertical: 0,
        flexDirection: 'row'
    },
    cellEmpty: {
        width: (Dimensions.get('window').width - 40) / 7,
        height: (Dimensions.get('window').width - 40) / 7
    },
    cell: {
        width: (Dimensions.get('window').width - 40) / 7 - 10,
        height: (Dimensions.get('window').width - 40) / 7 - 10,
        margin: 5,
    },
    cellDay: {
        width: (Dimensions.get('window').width - 40) / 7 - 10,
        fontSize: 20,
        margin: 5,
        color: '#CAA3DB',
        textAlign: 'center'
    },
    cellCircle: {
        width: '100%',
        height: '100%',
        backgroundColor: '#FFFC',
        borderRadius: 100
    },
    cellText: {
        color: '#333333',
        paddingTop: 8,
        fontSize: 20,
        textAlign: 'center'
    },
    nameText: {
        color: '#B57EC9',
        fontSize: 28,
        marginLeft: 20,
        marginBottom: 5
    }
});

class CalendarCell extends Component{
    render(){
        if(this.props.item === 0)
            return <View style={monthStyles.cellEmpty} />;
        else
            return <View style={monthStyles.cell}>
                <TouchableOpacity style={monthStyles.cellCircle} >
                    <Text style={monthStyles.cellText}>{this.props.item}</Text>
                </TouchableOpacity>
            </View>;
    }
}

class CalendarMonth extends Component{
    renderCell({item, index}){
        // check if less or more - then 0
        return <CalendarCell item={(item <= 0 || item > Date.monthLengths[this.props.month]) ? 0 : item} />
    }
    renderRow({item, index}){
        const events = this.props.events;
        let eventLines = [];

        for(let i = 0; i < events.length; i++){
            const start = Date.getDate(events[i].startdate), end = Date.getDate(events[i].enddate);
            // TODO !!! Add better condition (may have started before and ended after)
            if((start.year === this.props.year && start.month === this.props.month) ||
                (end.year === this.props.year && end.month === this.props.month)){
                const maxWidth = Dimensions.get('window').width - 40;
                const left = maxWidth / 7 * (start.day - item[0] + start.hour / 24);
                const width = maxWidth / 7 * (end.day - item[0] + end.hour / 24) - left;

                const line = <View
                    style={[monthStyles.rowBack, {left: left, width: width, backgroundColor: colors[i] + '2', borderColor: colors[i]}]}
                    key={i}
                />
                eventLines.push(line)
            }
        }

        return(
            <View>
                { eventLines }
                <View style={monthStyles.line} />
                <FlatList
                    style={monthStyles.row}
                    data={item}
                    keyExtractor={(item, index) => item}
                    renderItem={ this.renderCell.bind(this) }
                />
            </View>
        )
    }
    render(){
        return(
            <View style={monthStyles.block}>
                <Text style={monthStyles.nameText} >{Date.monthNames[this.props.month]}</Text>
                <FlatList
                    contentContainerStyle={monthStyles.rowDay}
                    data={ Date.dayNames.map(x => x.charAt(0)) }
                    renderItem={ ({item}) => <Text style={monthStyles.cellDay}>{item}</Text> }
                    keyExtractor={(item, index) => index}
                />
                <FlatList
                    style={monthStyles.list}
                    data={Date.generateMonth(this.props.year, this.props.month)}
                    extraData={this.state}
                    keyExtractor={(item, index) => item}
                    renderItem={this.renderRow.bind(this)}
                />
            </View>
        );
    }
}

const eventsStyles = StyleSheet.create({
    block: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        backgroundColor: '#ecf0f1'
    },
    header: {
        width: '100%',
        height: 50,
        backgroundColor: '#A05ABF',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    headerText: {
        color: '#FFF',
        fontSize: 26,
        marginTop: 4,
        marginLeft: 20
    },
    headerButton: {
        width: 40,
        height: 40,
        margin: 5
    },
    headerImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'stretch',
        position: 'absolute'
    },
    body: {
        width: '100%',
        height: 200
    },
    bodyHidden: {
        height: 0
    },
    event: {
        width: Dimensions.get('window').width - 10,
        height: 40,
        backgroundColor: '#FFF',
        marginHorizontal: 5,
        marginTop: 5,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    eventColor: {
        width: 30,
        height: 30,
        margin: 5,
        borderWidth: 2,
        borderRadius: 15
    },
    eventName: {
        marginLeft: 10,
        marginTop: 4,
        fontSize: 22,
        color: '#8E44AD'
    },
    moreButton: {
        height: 30,
        backgroundColor: '#A05ABF',
        borderRadius: 15,
        margin: 5,
    },
    moreText: {
        color: '#FFFFFF',
        fontSize: 20,
        marginHorizontal: 15
    },
});

class CalendarEvents extends Component{
    state = { open: false };
    renderItem({item, index}){
        return(
            <View style={eventsStyles.event}>
                <Text style={eventsStyles.eventName} >{item.name}</Text>
                <View style={{flexDirection: 'row'}}>
                    <TouchableOpacity style={eventsStyles.moreButton} >
                        <Text style={eventsStyles.moreText}>More</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[eventsStyles.eventColor, {borderColor: colors[index], backgroundColor: colors[index] + '2'}]}
                        onPress={() => { this.props.setDate(item.startdate) }}
                    />
                </View>
            </View>
        )
    }
    render(){
        return(
            <View style={eventsStyles.block}>
                <View style={eventsStyles.header} >
                    <Text style={eventsStyles.headerText}>Events</Text>
                    <TouchableOpacity style={eventsStyles.headerButton} onPress={() => this.setState({open: !this.state.open})}>
                        <Image
                            source={this.state.open ? require('../images/iconsNavigation/arrowDown.png') : require('../images/iconsNavigation/arrowTop.png')}
                            style={eventsStyles.headerImage}
                        />
                    </TouchableOpacity>
                </View>
                <View style={this.state.open ? eventsStyles.body : eventsStyles.bodyHidden} >
                    <FlatList
                        data={this.props.events}
                        keyExtractor={(item, index) => item.name}
                        renderItem={this.renderItem.bind(this)}
                    />
                </View>
            </View>
        );
    }
}

export default class Calendar extends Component{
    constructor(props){
        super();
        this.state = {
            currentMonth: 0,
            currentYear: 2018,
            events: []
        };

        this.getEvents.call(this);
    }
    getEvents(){
        fetch("https://lvivevent.herokuapp.com/" + 'events', {
            method: 'GET'
        })
            .then((response) => response.json())
            .then((events) => {
                this.setState({ events })
            }).catch(() => {})
    }
    setDate(string){
        const date = Date.getDate(string);
        this.setState({currentMonth: date.month, currentYear: date.year})
    }
    addMonth(number){
        let month = this.state.currentMonth + number;
        if(month >= 11) this.setState({currentMonth: 0, currentYear: this.state.currentYear + 1});
        else if(month < 0) this.setState({currentMonth: 11, currentYear: this.state.currentYear - 1});
        else this.setState({currentMonth: month});
    }
    render(){
        return <View style={styles.page}>
            <Header onPressLeft={this.addMonth.bind(this, -1)}
                    onPressRight={this.addMonth.bind(this, 1)}
                    text={this.state.currentYear}
            />
            <CalendarMonth month={this.state.currentMonth} year={this.state.currentYear} events={this.state.events}/>
            <CalendarEvents events={this.state.events} setDate={this.setDate.bind(this)}/>
        </View>
    }
}

const styles = StyleSheet.create({
    page: {
        backgroundColor: '#ecf0f1',
        width: '100%',
        height: '100%'
    },
    backgroundImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'stretch',
        position: 'absolute'
    },
    header: {
        width: '100%',
        height: 50,
        backgroundColor: '#8E44AD',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    headerButton: {
        width: 50,
        height: 50
    },
    headerText: {
        fontSize: 28,
        marginTop: 4,
        color: '#FFFFFF'
    }
});