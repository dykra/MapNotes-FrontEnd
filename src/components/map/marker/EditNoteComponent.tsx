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
        this.handleSave = this.handleSave.bind(this);
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
        return pin;
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
        pin.data.attributes.forEach((value, index, attributes) => {
            if (value.name === key) {
                value.value = event.target.value;
                attributes[index] = value;
            }
        });
        this.setState({pin});
    }

    renderModalBody() {
        const attributes = this.state.pin.data.attributes;
        return(
            <Modal.Body>
                <Form >
                    <FormGroup
                        controlId="NewNote"
                    >
                        {attributes.map(attribute => (
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
                {this.renderAddAtributeNote()}
            </Modal.Body>
        );
    }

    deleteEmptyInputs() {
        const pin = this.state.pin;
        pin.data.attributes = pin.data.attributes.filter(attr => attr.value !== '');
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
                            this.deleteEmptyInputs();
                            this.props.close();
                        }}
                    >
                        Close
                    </Button>
                    <Button
                        className="btn btn-primary"
                        onClick={this.handleSave}
                    >
                        Save
                    </Button>
                </Modal.Footer>
            </div>
        );
    }

    handleSave() {

        const pin = this.state.pin;
        const emptyDefaultAttr: string[] = [];
        const mismatchType: any[] = [];
        const emptyAttrWarning: string[] = [];

        const isBoolean = ((type: string) =>  {
            return(type === 'yes' || type === 'no' || type === 'n' || type === 'y');
        });
        pin.data.attributes.forEach((attr) => {
            if (attr.value === '')  {
                if (this.checkIfDefault(attr.name)) {
                    emptyDefaultAttr.push(attr.name);
                } else {
                    emptyAttrWarning.push(attr.name);
                }
            } else if ((attr.type === 'pln' || attr.type === 'number'  || attr.type === 'm^2')
                && isNaN(Number(attr.value)) ) {
                    mismatchType.push({name: attr.name, type: attr.type});

            } else if (attr.type === 'yes/no' && !isBoolean(attr.value.toLowerCase())) {
                mismatchType.push({name: attr.name, type: attr.type});
            }

        });
        if (emptyDefaultAttr.length === 0 && mismatchType.length === 0) {
            let warningStatement = '';
            if (emptyAttrWarning.length !== 0) {
                warningStatement = '\nAdditional attributes (' + emptyAttrWarning + ' )in the note are incomplete.' +
                    ' Attributes will be deleted.';
            }
            if (confirm('Are you sure you want to save?' + warningStatement)) {
                this.deleteEmptyInputs();
                this.props.savePin(this.state.pin);
            }

        } else {
            let errorStatement = '';
            if (emptyDefaultAttr.length !== 0) {
                errorStatement += 'Default attributes ( ' + emptyDefaultAttr + ' ) must be filled out. \n';
            }
            if (mismatchType.length !== 0) {
                mismatchType.forEach(e => {
                    errorStatement += 'The value of attribute ' + e.name + ' has incompatible type. ' +
                        'Require - ' + e.type + '.\n';
                });
            }
            alert(errorStatement);
        }
    }

    checkIfDefault(name: string) {
        const defaults = this.props.mapData.attributes.map(e => e.name);
        const isDefault = defaults.filter(e => e === name );
        return isDefault.length;
    }
}
