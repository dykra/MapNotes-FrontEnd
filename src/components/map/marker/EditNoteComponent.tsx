import * as React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { AddNoteAttributeComponent } from './AddNoteAttributeComponent';
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
            const index = pin.data.attributes.findIndex(value => value.name === attribute.name);
            if (index === -1) {
                pin.data.attributes.push({name: attribute.name, type: attribute.type, value: ''});
            }
        });

        const complexAttr = [];
        complexAttr.push( {name: 'Ac', 'attrList': ['a', 'c'],
            'opList': ['+'] });

        complexAttr.push({ name: 'BD', 'attrList': ['a', 'c', 'd'],
            'opList': ['*', '-']});

        complexAttr.forEach(complexAttribute => {
            const index = pin.data.attributes.findIndex(value => value.name === complexAttribute.name);
            if (index === -1) {
                pin.data.attributes.push({name: complexAttribute.name, type: 'computed', value: ''});
            }
        });

        return pin;
    }

    countSingleOperation(opType: string, attribute1: number, attribute2: number) {
        switch (opType) {
            case '+':
                return attribute1 + attribute2;
            case '-':
                return attribute1 - attribute2;
            case '*':
                return attribute1 * attribute2;
            case '/':
                return attribute1 / attribute2;
            default:
                return 0;
        }
    }

    countrComplexAttributeValue(complexAttributeName: string) {
        return '10';
    }

    handleComplexAttrib() {
        const pin = this.props.pin;
        // const complexAttr = this.props.mapData.complexAttributes;

        const complexAttr = [];
        complexAttr.push( {name: 'Ac', 'attrList': ['a', 'c'],
            'opList': ['+'] });

        complexAttr.push({ name: 'BD', 'attrList': ['a', 'c', 'd'],
            'opList': ['*', '-']});

        complexAttr.forEach(complexAttribute => {
            const index = pin.data.attributes.findIndex(value => value.name === complexAttribute.name);
            if (index === -1) {
                pin.data.attributes.push({name: complexAttribute.name, type: 'computed', value: ''});
            }
        });

       complexAttr.forEach( complexAttribute => {
            const index = pin.data.attributes.findIndex(value => value.name === complexAttribute.name);
            console.log(index);
            console.log(this.countrComplexAttributeValue(complexAttribute.name));
            pin.data.attributes[index].value = this.countrComplexAttributeValue(complexAttribute.name);
        });
    }

    handleAddingNewAttribute(nameAttr: string, typeAttr: string, isDefault: boolean) {
        const pin = this.state.pin;
        if (isDefault) {
            const mapAttr = this.state.mapData;
            mapAttr.attributes.push({name: nameAttr, type: typeAttr});
            this.props.updateMapSettings(mapAttr);
        }
        const newValue = {name: nameAttr, type: typeAttr, value: ''};
        const index = pin.data.attributes.findIndex(value => value.name === nameAttr);
        if (index !== -1) {
            pin.data.attributes[index] = newValue;
        } else {
            pin.data.attributes.push(newValue);
        }
        this.setState({
            pin,
            isAddNewAttrClick: false
        });
    }

    renderAddAttributeNote() {
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
        pin.data.attributes.forEach((value, index, attributes) => {
            if (value.name === key) {
                value.value = event.target.value;
                attributes[index] = value;
            }
        });
        this.handleComplexAttrib();
        console.log(this.state.pin.data.attributes);
        this.setState({pin});
    }

    isBasicType(attibute: any) {
        if ( attibute.type === 'computed') {
            return false;
        }
        return true;
    }

    renderModalBody() {
        const attributes = this.state.pin.data.attributes;
        return(
            <Modal.Body>
                <Form >
                    <FormGroup
                        controlId="NewNote"
                    >
                        {attributes.filter(this.isBasicType).map(attribute => (
                            <div key={attribute.name}>
                                <Col sm={4}>
                                    {attribute.name}
                                </Col>
                                <Col sm={8}>
                                    <FormControl
                                        onChange={(event) => this.handleChange(attribute.name, event)}
                                        placeholder="Enter a value"
                                        value={attribute.value}
                                    />
                                </Col>
                            </div>
                        ))}
                    </FormGroup>
                </Form>
                {this.renderAddAttributeNote()}
            </Modal.Body>
        );
    }

    cancelNewInputs() {
        const pin = this.state.pin;
        for (let key in pin.data.attributes) {
            if (pin.data.attributes[key].value === '') {
                delete pin.data.attributes[key];
            }
        }
        this.setState({
            pin,
            isAddNewAttrClick: false
        });
    }

    render() {
        return(
            <div>
                <Modal.Title>Edit note</Modal.Title>

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
            </div>
        );
    }
}