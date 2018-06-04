import * as React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { AddAttributeComponent } from './AddAttributeComponent';
import Form from 'reactstrap/lib/Form';
import * as FormGroup from 'react-bootstrap/lib/FormGroup';
import Col from 'reactstrap/lib/Col';
import * as FormControl from 'react-bootstrap/lib/FormControl';
import { MapSettings } from '../../../types/map/MapSettings';
import { PinData } from '../../../types/api/PinData';

export interface EditNoteComponentProps {
    pin: PinData;
    mapData: MapSettings;
    savePin: (pin: PinData) => void;
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
            // pin: this.props.pin,
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
        console.log('debug');
        console.log(this.props.mapData);
        const defaultAttr = this.props.mapData.attributes;

        if (pin.data.attributes.length === 0 ) {
            for (let i = 0; i < defaultAttr.length; i++) {
                pin.data.attributes.push({name: defaultAttr[i].name, type: defaultAttr[i].type, value: ''});
            }
        }
        console.log('pin' + pin);
        return pin;

    }

    handleAddingNewAttribute(nameAttr: string, typeAttr: string, isDefault: boolean) {
        const pin = this.state.pin;
        if (isDefault) {
            const mapAttr = this.state.mapData;
            mapAttr.attributes.push({name: nameAttr, type: typeAttr});

        }
        pin.data.attributes.push({name: nameAttr, type: typeAttr, value: ''});
        this.setState({
            pin,
            isAddNewAttrClick: false
        });
    }

    renderAddAtributeNote() {
        if (this.state.isAddNewAttrClick) {
            return (
                <AddAttributeComponent
                    cancel={() => this.setState({isAddNewAttrClick: false})}
                    save={this.handleAddingNewAttribute}
                />
            );
        }
        return null;
    }

    handleChange (key: any, event: any) {
        const pin = this.state.pin;
        pin.data.attributes[key] = event.target.value;
        this.setState({pin});
    }

    renderModalBody() {
        const attributes = this.state.pin.data.attributes;
        console.log(attributes);
        // const defaultAttrs = this.state.mapAttr.attributes;
        // const keys = Object.keys(defaultAttrs);
        // keys.concat(Object.keys(attributes));
        // console.log(keys);
        const keys = Object.keys(attributes);
        console.log(keys);
        return(
            <Modal.Body>
                <Form >
                    <FormGroup
                        controlId="NewNote"
                    >
                        {attributes.map((name: any, type: any, value: any) => (
                            <div key={name}>
                                <Col sm={4}>
                                    {name}
                                </Col>
                                <Col sm={8}>
                                    <FormControl
                                        onChange={(event) => this.handleChange(name, event)}
                                        placeholder="Enter a value"
                                        value={value}
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
                        <Button className="btn btn-secondary" onClick={this.props.close}>
                            Close
                        </Button>
                        <Button className="btn btn-primary" onClick={() => this.props.savePin(this.state.pin)}>
                            Save
                        </Button>
                    </Modal.Footer>
                </Modal.Dialog>
            </div>
        );
    }
}
