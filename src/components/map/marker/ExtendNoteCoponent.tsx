import React from 'react';
import { Button } from 'react-bootstrap';
import { MapSettings } from '../../../types/map/MapSettings';
import { PinData } from '../../../types/api/PinData';
import { EditNoteComponent } from './EditNoteComponent';
import * as Glyphicon from 'react-bootstrap/lib/Glyphicon';

export interface ExtendNoteComponentProps {
    pin: PinData;
    mapData: MapSettings;
    savePin: (pin: PinData) => void;
    updateMapSettings: (mapSettings: MapSettings) => void;
    showInLeftBar: (component: any) => void;
    deletePin: (pin: PinData) => void;
}

export interface ExtendNoteState {
    isEditMode: boolean;
    pin: PinData;
}

export class ExtendNoteComponent extends React.Component<ExtendNoteComponentProps, ExtendNoteState> {

    constructor(props: ExtendNoteComponentProps) {
        super(props);
        this.state = {
            isEditMode: false,
            pin: this.props.pin,
        };
        this.savePin = this.savePin.bind(this);
    }

    savePin(pin: PinData) {
        this.setState(
            {isEditMode: false, pin},
            () => this.props.savePin(pin)
        );
    }

    renderPinAttributes() {
        const attributes = this.state.pin.data.attributes;
        return attributes.map(attribute => (
            <div key={attribute.name}>
                <b>{attribute.name} </b> {attribute.value}
            </div>
        ));
    }

    renderEditNote() {
        return (
            <EditNoteComponent
                pin={this.state.pin}
                mapData={this.props.mapData}
                savePin={this.savePin}
                updateMapSettings={this.props.updateMapSettings}
                close={() => this.setState({isEditMode: false})}
            />
        );
    }

    close() {
        this.props.showInLeftBar(undefined);
    }

    render() {
        if (this.state.isEditMode) {
            return this.renderEditNote();
        }
        return (
            <div>
                <div>
                    <Button
                        className="CloseLeftBarButton btn btn-primary"
                        onClick={() => this.close()}
                    >
                        <Glyphicon glyph="remove"/>
                    </Button>
                </div>
                <div>
                    <Button
                        className="btn btn-primary"
                        onClick={() => this.setState({isEditMode: true})}
                    >
                        Edit
                    </Button>
                    <Button
                        className="btn btn-danger"
                        onClick={() => {
                            this.props.deletePin(this.state.pin);
                            this.close();
                        }}
                    >
                        Delete
                    </Button>
                </div>
                {this.renderPinAttributes()}
            </div>
        );
    }
}
