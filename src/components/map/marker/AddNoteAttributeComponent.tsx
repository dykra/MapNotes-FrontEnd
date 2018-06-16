import * as React from 'react';
import { Button, Checkbox } from 'react-bootstrap';
import { FormGroup, FormControl, Form, Col, ControlLabel } from 'react-bootstrap/lib';
import { TYPES } from '../../../constants';
import { PinData } from '../../../types/api/PinData';

export interface AddAttributeComponentProps {
    cancel: () => void;
    save: (name: string, type: string, isDefault: boolean ) => void;
    pin: PinData;
}

export interface AddAttributeComponentState {
    selectedType: string;
    isDefault: boolean;
    name: string;
}

export class AddNoteAttributeComponent extends React.Component<AddAttributeComponentProps, AddAttributeComponentState> {

    constructor(props: any) {
        super(props);
        this.state = {
            selectedType: 'Choose type',
            isDefault: false,
            name: ''
        };
        this.handleTypeChange = this.handleTypeChange.bind(this);
        this.handleCheckbox = this.handleCheckbox.bind(this);
        this.handleNameEnter = this.handleNameEnter.bind(this);
        this.handleSave = this.handleSave.bind(this);
    }

    handleTypeChange(selectedType: string) {
        this.setState({selectedType});
    }

    handleCheckbox() {
        this.setState({
            isDefault: !this.state.isDefault
        });

    }

    handleSave() {
        if (!this.checkIfNameValid()) {
            alert('Attribute with name ' + this.state.name + ' already exists. ');
        } else if (this.getValidationStateName() === 'success' && this.getValidationStateType() === 'success') {
            this.props.save(this.state.name, this.state.selectedType, this.state.isDefault);
        } else {
            alert('Fill out all mandatory fields');
        }
    }
    checkIfNameValid() {
        const attributes = this.props.pin.data.attributes;
        let isValid = true;
        attributes.forEach( e => {
            if (e.name === this.state.name) {
                isValid = false;
            }
        });
        return isValid;
    }

    handleNameEnter(event: any) {
        this.setState({
            name: event.target.value
        });
    }

    getValidationStateName() {
        const length = this.state.name.length;
        if (length > 2) {
            return 'success';
        } else if (length < 1) {
            return 'error';
        }
        return null;
    }

    getValidationStateType() {
        if (this.state.selectedType === 'Choose type') {
            return 'error';
        } else {
            return 'success';
        }
    }

    render() {
        return(
            <div>
                <Form horizontal={true}>
                    <FormGroup
                        controlId="NewAttrName"
                        validationState={this.getValidationStateName()}
                    >
                        <Col componentClass={ControlLabel} sm={2}>
                            Name
                        </Col>
                        <Col sm={10}>
                            <FormControl
                                onChange={this.handleNameEnter}
                                type="string"
                                placeholder="Name of your new attribute"
                            />
                        </Col>
                    </FormGroup>

                    <FormGroup
                        controlId="newAttrType"
                        validationState={this.getValidationStateType()}
                    >
                        <Col componentClass={ControlLabel} sm={2}>
                            Type
                        </Col>
                            {this.createButtonTypes()}
                    </FormGroup>
                    <FormGroup>
                        <Col smOffset={2} sm={4}>
                           <Checkbox onClick={this.handleCheckbox} onSelect={this.handleCheckbox}>
                                Add attribute as default</Checkbox>
                        </Col>
                    </FormGroup>
                </Form>
                <Button className="btn btn-secondary" onClick={this.props.cancel}>
                    Cancel
                </Button>
                <Button className="btn btn-primary" onClick={this.handleSave}>
                    Add
                </Button>
            </div>
        );
    }

    createButtonTypes() {
        const buttonTypes: JSX.Element[] = [];
        const isButtonChoose = (type: string) => {return (this.state.selectedType === type); } ;

        TYPES.map(type => {
               buttonTypes.push(
                    <Button
                        className={'typeButton'}
                        id={type}
                        key={type}
                        value={type}
                        onClick={() => this.handleTypeChange(type)}
                        active={isButtonChoose(type)}

                    > {type.toString()}
                    </Button>
                );
            }

        );
        return buttonTypes;
    }
}
