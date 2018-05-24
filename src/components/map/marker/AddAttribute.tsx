import * as React from 'react';
import { Button, Checkbox, Modal } from 'react-bootstrap';
import { FormGroup, FormControl, Form, Col, ControlLabel,
    MenuItem, DropdownButton, ButtonToolbar } from 'react-bootstrap/lib';

interface AddAttributeState {
    types: String[];
    selected: String;
    isDefault: boolean;
    name: String;
}
class AddAttribute extends React.Component<any, AddAttributeState> {

    constructor(props: any) {
        super(props);
        this.state = {
            types: [ 'm^2', 'pln', 'yes', 'no', 'text', 'number', 'other'],
            selected: 'Choose type',
            isDefault: false,
            name: ''
        };
        this.handleTypeChange = this.handleTypeChange.bind(this);
        this.handleCheckbox = this.handleCheckbox.bind(this);
        this.handleNameEnter = this.handleNameEnter.bind(this);
        this.handleSave = this.handleSave.bind(this);

    }

    render() {
        return(
            <div className="static-modal">
            <Modal.Dialog>
                <Modal.Body>
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
                            <Col sm={4}>
                                <ButtonToolbar>
                                    <DropdownButton
                                        onSelect={this.handleTypeChange}
                                        title={this.state.selected}
                                        id="dropdown-size-medium"
                                    >
                                        {
                                            this.state.types.map(function(type: any) {
                                                return (
                                                    <MenuItem key={type} eventKey={type.toString()}>
                                                    {type.toString()}
                                                </MenuItem>);
                                            })
                                        }

                                    </DropdownButton>
                                </ButtonToolbar>
                            </Col>
                        </FormGroup>
                        <FormGroup>
                            <Col smOffset={2} sm={4}>
                                <Checkbox onClick={this.handleCheckbox} onSelect={this.handleCheckbox}>
                                    Add attribute as default</Checkbox>
                            </Col>
                        </FormGroup>
                    </Form>
                </Modal.Body>

                <Modal.Footer>
                    <Button onClick={this.props.cancelClick}>Cancel</Button>
                    <Button
                        onClick={this.handleSave}
                        bsStyle="primary"
                    >
                        Save changes
                    </Button>
                </Modal.Footer>
            </Modal.Dialog>
        </div>
    );
    }

    handleTypeChange(event: any) {
        this.setState({selected: event.toString()});
    }

    handleCheckbox(event: any) {
        this.setState({
            isDefault: !this.state.isDefault
        });

    }

    handleSave() {
        if (this.getValidationStateName() === 'success' && this.getValidationStateType() === 'success') {
            this.props.saveNewAttribute(this.state.name, this.state.selected, this.state.isDefault);
        } else {
            alert('Fill out all mandatory fields');
        }
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
        if (this.state.selected === 'Choose type') {
            return 'error';
        } else {
            return 'success';
        }
    }
}
export default AddAttribute;