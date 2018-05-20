import React from 'react';
import { Button } from 'react-bootstrap';
import * as ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar';
import { MarkerData } from '../types/MarkerData';
import { deletePin, getAllPins } from '../api/PinApi';
import { PinData } from '../types/PinData';
import { addPin } from '../api/MapApi';

interface GroupsComponentState {
    visibleColors: boolean;
}

export default class GroupsComponent extends React.Component<any, GroupsComponentState> {
    constructor(props: {}) {
        super(props);
        this.showColors = this.showColors.bind(this);
        this.hideColors = this.hideColors.bind(this);
        this.handleRed = this.handleRed.bind(this);
        this.state = {
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

        var gotPins: PinData[] = [];
        getAllPins(function (pins: PinData[]) {
            console.log('my pins');
            console.log(pins);
            gotPins = pins;
        });

        for (let pin of gotPins) {
            console.log(pin);
            deletePin(pin.id, function () { return; });
            var oldMarker: MarkerData = pin.data;
            var newMarker: MarkerData = {
                position: oldMarker.position,
                isWindowOpened: oldMarker.isWindowOpened,
                groupName: 'pink',
            };
            var newPin: PinData = {
                data: newMarker,
                id: pin.id,
            };
            addPin(1, newPin, function () { return; });
        }

        // var marker: MarkerData = {
        //     position: new google.maps.LatLng(5.2, 10.6),
        //     isWindowOpened: false,
        //     groupName: 'pink',
        // };
        //
        // var marker2: MarkerData = {
        //     position: new google.maps.LatLng(5.2, 12.6),
        //     isWindowOpened: false,
        //     groupName: 'pink',
        // };
        //
        // let markers = [];
        // let

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
