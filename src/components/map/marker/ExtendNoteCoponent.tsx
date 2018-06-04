import React from 'react';
import { Button } from 'react-bootstrap';
import { MapSettings } from '../../../types/map/MapSettings';
import { PinData } from '../../../types/api/PinData';
import { EditNoteComponent } from './EditNoteComponent';

export interface ExtendNoteComponentProps {
    pin: PinData;
    mapData: MapSettings;
    savePin: (pin: PinData) => void;
    updateMapSettings: (mapSettings: MapSettings) => void;
    close: () => void;
}

export interface ExtendNoteState {
    visibleLeftBar: boolean;
    isEditMode: boolean;
}

export class ExtendNoteComponent extends React.Component<ExtendNoteComponentProps, ExtendNoteState> {

    references: {transportComponent: any; } =
        {transportComponent: null};

    constructor(props: ExtendNoteComponentProps) {
        super(props);
        this.state = {
            visibleLeftBar: false,
            isEditMode: false,
        };
        this.savePin = this.savePin.bind(this);
    }

    savePin(pin: PinData) {

        this.setState(
            {isEditMode: false},
            () => this.props.savePin(pin)
        );
    }

    showLeftBar() {
        this.setState(
            {
                visibleLeftBar: true,
            });
    }

    hideLeftBar() {
        this.setState({
            visibleLeftBar: false
        });
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

    render() {
        if (this.state.isEditMode) {
            return this.renderEditNote();
        }
        return (
            <div className="OpenedLeftBar">
                <div>
                    <Button
                        className="CloseLeftBarButton"
                        onClick={this.props.close}
                    >
                        Close
                    </Button>
                </div>
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
                    {/*<Button className="btn btn-danger" onClick={() => this.props.deletePin(this.props.pin)}>*/}
                        {/*Delete*/}
                    {/*</Button>*/}
                </div>
            </div>
        );
    }
}
