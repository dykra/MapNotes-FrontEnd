import * as React from 'react';
import { Marker, InfoWindow } from 'react-google-maps';
import { EditNoteComponent } from './EditNoteComponent';
import { PinData } from '../../../types/api/PinData';
import { MapSettings } from '../../../types/map/MapSettings';
import { BASE_ICON_URL } from '../../../constants';
import * as Button from 'react-bootstrap/lib/Button';

export interface MarkerComponentProps {
    pin: PinData;
    mapData: MapSettings;
    index: any;
    key: any;
    savePin: (pin: PinData) => void;
    deletePin: (pin: PinData) => void;
    showTransportComponent: (index: any) => void;
}

export interface MarkerComponentState {
    isMouseOver: boolean;
    isEditMode: boolean;
    isDetailOpen: boolean;
}

export class MarkerComponent extends React.Component<MarkerComponentProps, MarkerComponentState> {

    constructor(props: any) {
        super(props);
        this.state = {
            isMouseOver: false,
            isEditMode: false,
            isDetailOpen: false,
        };
        this.savePin = this.savePin.bind(this);
    }

    savePin(pin: PinData) {
        this.setState(
            {isEditMode: false},
            () => this.props.savePin(pin)
        );
    }

    renderEditNote() {
        return (
            <EditNoteComponent
                pin={this.props.pin}
                mapData={this.props.mapData}
                savePin={this.savePin}
                close={() => this.setState({isEditMode: false})}
            />
        );
    }

    renderPinAttributes() {
        console.log('PROPS MAPDATA', this.props.mapData);
        const attributes = this.props.pin.data.attributes;
        const keys = Object.keys(attributes);
        return keys.map(key => (
            <div>
                {key} : {attributes[key]}
            </div>
        ));
    }

    renderExtendNote() {
        return(
            <InfoWindow onCloseClick={() => this.setState({isDetailOpen: false})}>
                <div>
                    {this.renderPinAttributes()}
                    <Button
                        className="btn btn-primary"
                        onClick={() => this.setState({isEditMode: true})}
                    >
                        Edit
                    </Button>
                    <Button
                        className="btn btn-primary Save"
                        onClick={() => this.props.savePin(this.props.pin)}
                    >
                        Save
                    </Button>
                    <Button className="btn btn-danger" onClick={() => this.props.deletePin(this.props.pin)}>
                        Delete
                    </Button>
                </div>
            </InfoWindow>
        );
    }

    renderSmallNote() {
        return(
            <InfoWindow >
                <div>
                    {this.renderPinAttributes()}
                </div>
            </InfoWindow>
        );
    }

    renderNote() {
        if (this.state.isEditMode) {
            return this.renderEditNote();
        }
        if (this.state.isDetailOpen) {
            return this.renderExtendNote();
        }
        if (this.state.isMouseOver) {
            return this.renderSmallNote();
        }
        return null;
    }

    render() {
        const position = this.props.pin.data.position;
        const iconURL = BASE_ICON_URL + this.props.pin.data.groupName + '.png';
        return(
            <Marker
                key={this.props.index}
                position={position}
                icon={iconURL}
                label={this.props.index.toString()}
                onClick={() => this.setState({isDetailOpen: true})}
                onMouseOver={() => this.setState({isMouseOver: true})}
                onMouseOut={() => this.setState({isMouseOver: false})}
                onRightClick={() => this.props.showTransportComponent(this.props.index)}
            >
                {this.renderNote()}
            </Marker>
        );
    }
}
