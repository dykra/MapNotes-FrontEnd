import React from 'react';
import { Button } from 'react-bootstrap';
import * as ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar';
import { PinData } from '../types/PinData';
import { addPin } from '../api/MapApi';
import { MarkerData } from '../types/MarkerData';
import '../styles/GroupsStyle.css';
import MapContainer from './MapComponent';
import ReactDOM from 'react-dom';

interface GroupsComponentState {
    visibleColors: boolean;
    gotPins: PinData[];
    mapId: any;
    buttonClicked: boolean;
    // filteredList: PinData[];
}

export default class GroupsComponent extends React.Component<{mapId: any } , // , filteredList: PinData[] },
    GroupsComponentState> {
    constructor(props: {mapId: any} ) { // , filteredList: PinData[]}) {
        super(props);
        this.showColors = this.showColors.bind(this);
        this.hideColors = this.hideColors.bind(this);
        this.handleRed = this.handleRed.bind(this);
        this.handlePink = this.handlePink.bind(this);
        this.handleColor = this.handleColor.bind(this);
        this.handleGreen = this.handleGreen.bind(this);
        this.handleBlue = this.handleBlue.bind(this);
        this.handleYellow = this.handleYellow.bind(this);
        this.myCallback = this.myCallback.bind(this);

        this.state = {
            gotPins: [],
            visibleColors: false,
            mapId: this.props.mapId,
            buttonClicked: false,
            // filteredList: this.props.filteredList,
        };
    }

    showColors(event: any) {
        this.setState(
            {
                visibleColors: true,
            });
    }

    hideColors(event: any) {
        this.setState(
            {
                visibleColors: false,
            });
    }

    handleRed(event: any) {
        this.handleColor('red',  new google.maps.LatLng(10.22, 45.33));
        this.handleColor('red',  new google.maps.LatLng(50.22, 70.33));
    }

    handlePink(event: any) {
        this.handleColor('pink',  new google.maps.LatLng(20.22, 30.33));
        this.handleColor('pink',  new google.maps.LatLng(20.22, 50.33));
        this.handleColor('pink',  new google.maps.LatLng(20.22, 60.33));
    }

    handleYellow(event: any) {
        this.handleColor('yellow',  new google.maps.LatLng(30.90, 45.33));
        this.handleColor('yellow',  new google.maps.LatLng(40.22, 70.33));
        this.handleColor('yellow',  new google.maps.LatLng(10.22, 65.33));
    }

    handleBlue(event: any) {
        this.handleColor('blue',  new google.maps.LatLng(50.22, 45.33));
        this.handleColor('blue',  new google.maps.LatLng(60.77, 50.33));
        this.handleColor('blue',  new google.maps.LatLng(12.22, 37.33));
    }

    handleGreen(event: any) {
        this.handleColor('green', new google.maps.LatLng(60.22, 45.33));
        this.handleColor('green', new google.maps.LatLng(11.22, 122.33));
        this.handleColor('green', new google.maps.LatLng(98.22, 65.33));
    }

    handleColor(color: string, pos: google.maps.LatLng) {

        var marker: MarkerData = {
            // position: new google.maps.LatLng(10.22, 60.44),
            position: pos,
            isWindowOpened: false,
            groupName: color,
        };

        var pin1: PinData = {
            data: marker,
            id: 0,
        };

        // will be used after connection with filtering
        // for( let pinElement of this.state.filteredList ) {
        //     addPin(this.state.mapId, pinElement, this.myCallback);
        // }

        addPin(this.state.mapId, pin1, this.myCallback);
    }

    myCallback ( pin: PinData) {

        console.log('added pin1');
        console.log(pin);
        this.setState({buttonClicked: true});
    }
    renderMap() {
        ReactDOM.render(<MapContainer mapId={this.props.mapId}/>, document.getElementById('root'));
    }

    render() {
        let colors;
        if (this.state.visibleColors) {
            colors = (
                <div className={'OpenedColors'}>
                    <Button onClick={this.hideColors}>Hide</Button>
                    <ButtonToolbar>
                        <Button bsClass="redButton" onClick={this.handleRed}>Red</Button>
                        <Button bsClass="pinkButton" onClick={this.handlePink}>Pink</Button>
                        <Button bsClass="greenButton" onClick={this.handleGreen}>Green</Button>
                        <Button bsClass="yellowButton" onClick={this.handleYellow}>Yellow</Button>
                        <Button bsClass="blueButton" onClick={this.handleBlue}>Blue</Button>
                    </ButtonToolbar>
                </div>
            );
        }
        if ( this.state.visibleColors && this.state.buttonClicked ) {
           console.log('jestem tutaj');
           this.setState({buttonClicked: false});
           this.renderMap();
        }
        return (
            <div className={'groups'}>
                {colors}
                <Button onClick={this.showColors}>New group
                </Button>
            </div>);
    }

}
