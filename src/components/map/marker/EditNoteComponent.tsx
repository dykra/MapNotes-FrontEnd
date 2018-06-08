import * as React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { AddNoteAttributeComponent } from './AddNoteAttributeComponent';
import Form from 'reactstrap/lib/Form';
import * as FormGroup from 'react-bootstrap/lib/FormGroup';
import Col from 'reactstrap/lib/Col';
import * as FormControl from 'react-bootstrap/lib/FormControl';
import { MapSettings } from '../../../types/map/MapSettings';
import { PinData } from '../../../types/api/PinData';
import { AttributeInfo } from '../../../types/creation/AttributeInfo';

export interface EditNoteComponentProps {
    pin: PinData;
    mapData: MapSettings;
    savePin: (pin: PinData) => void;
    updateMapSettings: (mapSettings: MapSettings) => void;
    close: () => void;
}

export interface EditNoteComponentState {
    pin: PinData;
    mapData: MapSettings;
    input: any;
    isAddNewAttrClick: boolean;
}

export class EditNoteComponent extends React.Component<EditNoteComponentProps, EditNoteComponentState> {

    constructor(props: any) {
        super(props);
        this.state = {
            mapData: this.props.mapData,
            pin: this.handlePin(),
            input: '',
            isAddNewAttrClick: false
        };
        this.handleAddingNewAttribute = this.handleAddingNewAttribute.bind(this);
        this.handlePin = this.handlePin.bind(this);
    }

    handlePin() {

        const pin = this.props.pin;
        const defaultAttr = this.props.mapData.attributes;
        defaultAttr.forEach(attribute => {
            if (!(attribute.name in pin.data.attributes)) {
                pin.data.attributes.set(attribute.name, {type: attribute.type, value: ''});
            }
        } );
        return pin;

    }

    handleAddingNewAttribute(nameAttr: string, typeAttr: string, isDefault: boolean) {
        const pin = this.state.pin;
        if (isDefault) {
            const mapAttr = this.state.mapData;
            mapAttr.attributes.push({name: nameAttr, type: typeAttr});
            this.props.updateMapSettings(mapAttr);

        }
        pin.data.attributes.set(nameAttr, {type: typeAttr, value: ''});
        this.setState({
            pin,
            isAddNewAttrClick: false
        });
    }

    renderAddAtributeNote() {
        if (this.state.isAddNewAttrClick) {
            return (
                <AddNoteAttributeComponent
                    cancel={() => this.setState({isAddNewAttrClick: false})}
                    save={this.handleAddingNewAttribute}
                />
            );
        }
        return null;
    }

    handleChange (key: any, event: any) {
        const pin = this.state.pin;
        pin.data.attributes[key].value = event.target.value;
        this.setState({pin});
    }

    getValueFromMap(p: AttributeInfo | undefined) {
        if (typeof(p) !== 'undefined') {
            return p.value;
        }
        return '';

    }

    renderModalBody() {
        const attributes = this.state.pin.data.attributes;

        const keys = Array.from(attributes.keys());

        console.log('keys', keys);
        return(
            <Modal.Body>
                <Form >
                    <FormGroup
                        controlId="NewNote"
                    >
                        {keys.map(key => (
                            <div key={key}>
                                <Col sm={4}>
                                    {key}
                                </Col>
                                <Col sm={8}>
                                    <FormControl
                                        onChange={(event) => this.handleChange(key, event)}
                                        placeholder="Enter a value"
                                        value={this.getValueFromMap(attributes.get(key))}
                                    />
                                </Col>
                            </div>
                        ))}
                    </FormGroup>
                </Form>
                {this.renderAddAtributeNote()}
            </Modal.Body>
        );
    }

    cancelNewInputs() {
        const pin = this.state.pin;
        const keys = Object.keys(pin.data.attributes);
        const attr = keys.filter(key => { return ( pin.data.attributes[key].value !== '') ; } );
        console.log(pin.data.attributes);
       console.log(attr);
       // pin.data.attributes.
        //
        // const attributes = pin.data.attributes;
        // pin.data.attributes = pin.data.attributes.filter(elem => value !== '');
        // // pin.data.attributes = pin.data.attributes.forEach((name,info) =>info.type);

        // attr.forEach((key) => {
        //     console.log('elem', key);
        //    if (pin.data.attributes.get(key).value !== '') {
        //        console.log('elem2', key);
        //        delete pin.data.attributes[key];
        //    }

        // });

        this.setState({
            pin,
            isAddNewAttrClick: false
        });

    }

    render() {
        return(
            <div className="static-modal">
                <Modal.Dialog>
                    <Modal.Header>
                        <Modal.Title>Edit note</Modal.Title>
                    </Modal.Header>

                    {this.renderModalBody()}

                    <Modal.Footer>
                        <Button
                            className="btn btn-secondary"
                            onClick={() => this.setState({isAddNewAttrClick: true})}
                        >
                            Add new attribute
                        </Button>
                        <Button
                            className="btn btn-secondary"
                            onClick={() => {
                                this.cancelNewInputs();
                                this.props.close();
                            }}
                        >
                            Close
                        </Button>
                        <Button
                            className="btn btn-primary"
                            onClick={() => this.props.savePin(this.state.pin)}
                        >
                            Save
                        </Button>
                    </Modal.Footer>
                </Modal.Dialog>
            </div>
        );
    }
}
