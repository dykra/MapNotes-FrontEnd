import React from 'react';
import { Button } from 'react-bootstrap';
import * as ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar';
import { PinData } from '../types/PinData';
import { addPin, getMapById } from '../api/MapApi';
import { MarkerData } from '../types/MarkerData';
import { MapData } from '../types/MapData';

interface GroupsComponentState {
    visibleColors: boolean;
    gotPins: PinData[];
}

export default class GroupsComponent extends React.Component<any, GroupsComponentState> {
    constructor(props: {}) {
        super(props);
        this.showColors = this.showColors.bind(this);
        this.hideColors = this.hideColors.bind(this);
        this.handleRed = this.handleRed.bind(this);

        this.state = {
            gotPins: [],
            visibleColors: false,
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
        return;
    }

    handlePink(event: any) {

        let groupPink = 'http://maps.google.com/mapfiles/ms/icons/pink.png';

        var marker: MarkerData = {
            position: new google.maps.LatLng(50.22, 60.44),
            isWindowOpened: false,
            groupName: groupPink,
        };

        var marker2: MarkerData = {
            position: new google.maps.LatLng(50.22, 50.44),
            isWindowOpened: false,
            groupName: groupPink,
        };

        var marker3: MarkerData = {
            position: new google.maps.LatLng(50.22, 20.44),
            isWindowOpened: false,
            groupName: groupPink,
        };

        var pin1: PinData = {
            data: marker,
            id: 1,
        };

        var pin2: PinData = {
            data: marker2,
            id: 2,
        };

        var pin3: PinData = {
            data: marker3,
            id: 3,
        };

        addPin(18, pin1, function (pin: PinData) {
            console.log('pin1 added');
            console.log(pin);
            console.log('all pins in group component');
            getMapById(18, function (map: MapData) {
                console.log(map.pins);
            });
        });

        addPin(18, pin2, function (pin: PinData) {
            console.log('pin1 added');
        });

        addPin(18, pin3, function (pin: PinData) {
            console.log('pin1 added');
        });
    }

    render() {
        let colors;
        if (this.state.visibleColors) {
            colors = (
                <div className={'OpenedColors'}>
                    <Button onClick={this.hideColors}>Hide</Button>
                    <ButtonToolbar>
                        <Button onClick={this.handleRed}>Red</Button>
                        <Button onClick={this.handlePink}>Pink</Button>
                        <Button>Blue</Button>
                        <Button>Green</Button>
                    </ButtonToolbar>
                </div>
            );
        }
        return (
            <div>
                {colors}
                <Button onClick={this.showColors}>New group
                </Button>
            </div>);
    }

}
