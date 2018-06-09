import * as React from 'react';
import { Marker, InfoWindow } from 'react-google-maps';
import { PinData } from '../../../types/api/PinData';
import { MapSettings } from '../../../types/map/MapSettings';
import { BASE_ICON_URL } from '../../../constants';
import { ExtendNoteComponent } from './ExtendNoteCoponent';

export interface MarkerComponentProps {
    pin: PinData;
    mapData: MapSettings;
    index: any;
    key: any;
    savePin: (pin: PinData) => void;
    updateMapSettings: (mapSettings: MapSettings) => void;
    deletePin: (pin: PinData) => void;
    showTransportComponent: (index: any) => void;
    showInLeftBar: (component: any) => void;
    animatedId: number;
}

export interface MarkerComponentState {
    isMouseOver: boolean;
    isDetailOpen: boolean;
}

export class MarkerComponent extends React.Component<MarkerComponentProps, MarkerComponentState> {

    constructor(props: any) {
        super(props);
        this.state = {
            isMouseOver: false,
            isDetailOpen: false,
        };
        this.savePin = this.savePin.bind(this);
    }

    savePin(pin: PinData) {
        this.setState(
            () => this.props.savePin(pin)
        );
    }

    renderPinAttributes() {
        const defaults = this.props.mapData.attributes.map(e => e.name);
        const attributes = this.props.pin.data.attributes.filter(e => defaults.find(d => d === e.name));
        return attributes.map(attribute =>
            (
                <div key={attribute.name}>
                    <b>{attribute.name} </b> {attribute.value}
                </div>
            )
        );
    }

    handleMouseClick() {
        this.setState({ isDetailOpen: true },
            () => this.props.showInLeftBar(this.renderExtendNote())
        );
    }

    renderExtendNote() {
        return(
            <ExtendNoteComponent
                pin={this.props.pin}
                mapData={this.props.mapData}
                savePin={this.savePin}
                updateMapSettings={this.props.updateMapSettings}
                showInLeftBar={this.props.showInLeftBar}
                deletePin={this.props.deletePin}
            />
        );
    }

    renderSmallNote() {
        return(
            <InfoWindow onCloseClick={() => this.setState({isDetailOpen: false})}>
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
        if (this.state.isDetailOpen || this.state.isMouseOver ) {
            return this.renderSmallNote();
        }
        return null;
    }

    animation() {
        console.log('jestem w animation w markercomponent, id pinezki to');
        console.log(this.props.animatedId);
        console.log(this.props.index);
        const position = this.props.pin.data.position;
        const iconURL = BASE_ICON_URL + this.props.pin.data.groupName + '.png';
        if (this.props.animatedId === this.props.index) {
            return(
                    <Marker
                        key={this.props.index}
                        position={position}
                        icon={iconURL}
                        label={this.props.index.toString()}
                        onClick={() => this.handleMouseClick()}
                        onMouseOver={() => this.setState({isMouseOver: true})}
                        onMouseOut={() => this.setState({isMouseOver: false})}
                        onRightClick={() => this.props.showTransportComponent(this.props.index)}
                        animation={google.maps.Animation.BOUNCE}
                    />
                );
        } else if (this.props.animatedId === -1) {
            return(
                <Marker
                    key={this.props.index}
                    position={position}
                    icon={iconURL}
                    label={this.props.index.toString()}
                    onClick={() => this.handleMouseClick()}
                    onMouseOver={() => this.setState({isMouseOver: true})}
                    onMouseOut={() => this.setState({isMouseOver: false})}
                    onRightClick={() => this.props.showTransportComponent(this.props.index)}
                />
            );
        }
        return null;

    }

    render() {
        const position = this.props.pin.data.position;
        const iconURL = BASE_ICON_URL + this.props.pin.data.groupName + '.png';
        const index = this.props.index;
        const label = index !== -1 ? index.toString() : '';
        return(
            <Marker
                key={index}
                position={position}
                icon={iconURL}
                label={label}
                onClick={() => this.handleMouseClick()}
                onMouseOver={() => this.setState({isMouseOver: true})}
                onMouseOut={() => this.setState({isMouseOver: false})}
                onRightClick={() => this.props.showTransportComponent(this.props.index)}
            >
                {this.animation()}
                {this.renderNote()}
            </Marker>
        );
    }
}
