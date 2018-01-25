import React, {Component} from 'react';
import { BackHandler, AppRegistry, Alert, View } from 'react-native';

import Login from "./loginComponents/Login.js";
import Register from "./loginComponents/Register.js"
import Menu from "./menuComponents/Menu.js";
import MainMenu from "./menuComponents/MainMenu.js";
import EventsList from "./menuComponents/EventsList.js";
import Event from "./menuComponents/Event.js";
import NewEvent from "./menuComponents/NewEvent.js";

import SideMenu from './node_modules/react-native-side-menu/index.js'

// some constants
const url = "https://lvivevent.herokuapp.com/";

// attributes: id (unique for tab), title (text displayed), onPress (function, optional)
const defaultMenuData = {
    settings: [
        {id: 'settings', title: 'Main settings', icon: 'settings', onPress: () => {Alert.alert('Info', 'worked!')}}
    ],
    messages: [
        {id: 'test1', icon: 'chat', title: 'Test message 1'},
        {id: 'test2', icon: 'chat', title: 'Test message 2'}
    ],
    events: [
        {id: 'events', title: 'Events', icon: 'menu', onPress: () => {setMenu('events', null)}},
        {id: 'newEvent', title: 'New Event', icon: 'calendar', onPress: () => {setMenu('newEvent', null)}}
    ],
    profile: [
        {id: 'profile'},
        {id: 'friends', title: 'Friends', icon: 'profile.png'},
        {id: 'profileSettings', title: 'Profile Settings', icon: 'settings'},
        {id: 'logout', title: 'Log Out', icon: 'settings', onPress: () => {setAppState('login')}}
    ]
};

export default class Application extends Component {
    constructor(properties){
        super();
        this.state = {
            appState: "menu",
            menuState: "events",
            menuStateDetails: null,
            // the information showed in the Menu (details in the Menu.js file)
            menuHeader: {
                name: 'me', buttons: []
            }
        };

        this.setMenuHeader = this.setMenuHeader.bind(this);
        this.getMenu = this.getMenu.bind(this);
        this.getPage = this.getPage.bind(this);
        this.setMenu = this.setMenu.bind(this);
        this.setAppState = this.setAppState.bind(this);

        // set back button
        BackHandler.addEventListener('hardwareBackPress', () => { return true });

        // make global
        window.setMenu = this.setMenu;
        window.setAppState = this.setAppState;
    }
    setMenuHeader(menuHeader){
        this.setState({menuHeader})
    }
    setAppState(appState){
        this.setState({appState})
    }

    setMenu(menuState, menuStateDetails){
        this.setState({menuState, menuStateDetails});
    }
    getMenu(){
        if(this.state.menuState === 'events' || !this.state.menuState) {
            return <Menu
                innerPage={<EventsList url={"https://lvivevent.herokuapp.com/"} setMenuHeader={this.setMenuHeader} setMenu={this.setMenu}/>}
                menuHeader={this.state.menuHeader}
            />
        }
        else if(this.state.menuState === 'event'){
            return <Menu
                innerPage={<Event url={"https://lvivevent.herokuapp.com/"} setMenuHeader={this.setMenuHeader} event={this.state.menuStateDetails}/>}
                menuHeader={this.state.menuHeader}
            />
        }
        else if(this.state.menuState === 'newEvent'){
            return <Menu
                innerPage={<NewEvent url={"https://lvivevent.herokuapp.com/"} setMenuHeader={this.setMenuHeader}/>}
                menuHeader={this.state.menuHeader}
            />
        }
    }
    getPage(){
        if(this.state.appState === "login")
            return(<Login
                onSuccess={() => { this.setState({appState: "menu"}); }}
                register={() => { this.setState({appState: "register"}); }}
                url={url}
            />);
        else if(this.state.appState === "register")
            return(<Register
                onSuccess={() => {this.setState({appState: "login"}); }}
                login={() => { this.setState({appState: "login"}); }}
                url={url}
            />);

        else if(this.state.appState === "menu")
            return(
                <SideMenu
                    edgeHitWidth={60}
                    toleranceX={10}
                    openMenuOffset={280}
                    bounceBackOnOverdraw={false}
                    isOpen={false}
                    menu={ <MainMenu data={defaultMenuData}/> }
                >
                    { this.getMenu() }
                </SideMenu>
            );
    }
    render(){
        return(
            <View style={{backgroundColor: "#8E44AD", height: '100%', width: '100%'}}>
                { this.getPage.call(this) }
            </View>
        );
    }
}