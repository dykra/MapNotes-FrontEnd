import * as React from 'react';
import { Button, Modal, Col, FormControl } from 'react-bootstrap';
import { Route } from 'react-router-dom';

import { BasicAttr } from '../../types/creation/BasicAttr';
import {  FormGroup, Form } from 'reactstrap';

interface MapAttributeState {
    types: String[];
    value: String;
    inputs: BasicAttr[];
}

export default class MapAttribute extends React.Component<any, MapAttributeState> {

    constructor(props: any) {
        super(props);

        this.state = {
            inputs : [],
            value: 'submit',
            types: [ 'm^2', 'pln', 'yes/no', 'text', 'number', 'other']
        };
        this.handleChangeType = this.handleChangeType.bind(this);
        this.handlePrepareInputs = this.handlePrepareInputs.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChangeType(event: any, index: any) {
        this.setState({value: event.target.value});
        this.handleChange(event, index, 'type');
    }

    handlePrepareInputs(isNew: boolean) {
        if (this.state.inputs.length === 0) {
            for (let i = 0; i < 5; i++) {
                this.setState((prevState: any) => ({
                    inputs: [...prevState.inputs, {name: '', type: ''}]
                }));
            }
        } else if (isNew) {
            this.setState((prevState: any) => ({
                inputs: [...prevState.inputs, {name: '', type: ''}]
            }));

        }

    }

    handleChange (evt: any, index: any, fieldName: any) {
        this.state.inputs[index][fieldName] = evt.target.value;
        this.forceUpdate();
    }

    render() {
        return(
            <div className="static-modal">
            <Modal.Dialog>
                <Modal.Header>
                    <Modal.Title> Hello in MapNotes </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form >
                        {
                            this.handlePrepareInputs(false)
                        }
                        {this.state.inputs.map((input: any, index: any) =>
                            <div className="form-inline" key={index}>
                                <FormGroup>
                                    <Col sm={10}>
                                        <FormControl
                                            onChange={(evt: any) => this.handleChange(evt, index, 'name')}
                                            type="string"
                                            placeholder="Name of your new attribute"

                                        />
                                    </Col>
                                </FormGroup>

                                <label>
                                    <select onClick={(evt) => this.handleChangeType(evt, index)}>
                                        <option value="">Default Attribute</option>
                                        {
                                            this.state.types.map(function (type: any) {
                                                return <option
                                                    key={type.toString()}
                                                    value={type.toString()}
                                                >
                                                    {type.toString()}
                                                </option>;
                                            })
                                        }

                                    </select>
                                </label>
                            </div>
                        )}
                    </Form>

                </Modal.Body>

                <Modal.Footer>
                    <Button onClick={() => this.handlePrepareInputs(true)} bsSize="small">Add new input</Button>

                    <Route
                        render={({history}) => {
                            return (
                                <Button
                                    className="closeMapAttrButton"
                                    onClick={() => history.push('/')}
                                >
                                    Close
                                </Button>
                            );
                        }}
                    />
                    <Button
                        onClick={(evt) => this.props.handleSubmit(evt, this.state.inputs)}
                        bsStyle="primary"
                    >
                        Save changes
                    </Button>
                    <Button onClick={this.props.handleAddComplexAttr} bsStyle="primary">
                        AddComplexAttr</Button>
                </Modal.Footer>
            </Modal.Dialog>
        </div>);
    }

}