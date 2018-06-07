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
    updateMapSettings: (mapSettings: MapSettings) => void;
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
                updateMapSettings={this.props.updateMapSettings}
                close={() => this.setState({isEditMode: false})}
            />
        );
    }

    renderPinAttributes() {

        const defaults = this.props.mapData.attributes.map(e => e.name);
        console.log('Map data attributes', this.props.mapData.attributes);
        const attributes = this.props.pin.data.attributes;
        console.log('Props attributes', attributes);
        const res = attributes.filter(e => defaults.find(a => a === e.name) !== undefined);
        console.log(res);

        return res.map(e =>
            (
                <div key={e.name}>
                    <b>
                        {e.name}
                    </b> {e.value}
                </div>
            )
        );
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
                    <b>
                        Pin note
                    </b>
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
        if (this.state.isMouseOver && !this.state.isDetailOpen) {
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
