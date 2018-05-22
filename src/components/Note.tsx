import * as React from 'react';
import { Button, Modal } from 'react-bootstrap';
import AddAttribute from './AddAttribute';
import Form from 'reactstrap/lib/Form';
import * as FormGroup from 'react-bootstrap/lib/FormGroup';
import Col from 'reactstrap/lib/Col';
import * as FormControl from 'react-bootstrap/lib/FormControl';

interface NoteState {
    input: any;
    types: String[];
    isAddNewAttrClick: boolean;

}
export default class Note extends React.Component<any, NoteState> {

    constructor(props: any) {
        super(props);
        this.state = {
            input: '',
            types: [ 'm^2', 'pln', 'yes', 'no' ],
            isAddNewAttrClick: false
        };
        this.handleAddNew = this.handleAddNew.bind(this);
        this.closeAddingAttribute = this.closeAddingAttribute.bind(this);
        this.handleAddingNewAttribute = this.handleAddingNewAttribute.bind(this);

    }

    handleAddNew() {
        this.setState({isAddNewAttrClick: true});
    }

    closeAddingAttribute() {
        this.setState({isAddNewAttrClick: false});
    }

    addAttribute() {
        return (
            <AddAttribute
                cancelClick={this.closeAddingAttribute}
                saveNewAttribute={this.handleAddingNewAttribute}
            />
        );
    }

    handleAddingNewAttribute(name: String, type: String, isDefault: boolean) {
        console.log('saving');
        console.log(name.toString());
        console.log(type.toString());
        console.log(isDefault);
        this.props.saveAttribute(name, type, isDefault);
        this.closeAddingAttribute();

    }

    render() {
        let returnFunction;
        if (this.state.isAddNewAttrClick) {
            returnFunction = this.addAttribute();
        } else {
            returnFunction = <div/>;
        }

        return(
            <div className="static-modal">

            <Modal.Dialog>

                <Modal.Header>
                    <Modal.Title>Create new note</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form >
                        <FormGroup
                            onSubmit={(evt) => this.props.handleSubmit(evt)}
                            controlId="NewNote"
                            // validationState={this.getValidationStateName()}
                        >

                        {this.props.inputs.map((input: any, index: any) => (

                                <div key={index}>
                            <Col sm={2}>
                                {input.name}

                            </Col>
                            <Col sm={10}>
                                <FormControl
                                    onChange={(evt) => this.props.handleChange(evt, index, input.name, input.type)}
                                    placeholder="Enter a value"
                                />
                            </Col>
                                </div>
                            )
                            )}
                        </FormGroup>

                            {this.props.newAttrs.map((input: any, index: any) => (
                                    <div key={index}>
                                        <FormGroup
                                            controlId="NewNote"
                                            // validationState={this.getValidationStateName()}
                                        >
                                        <Col sm={2}>
                                            {input.name}

                                        </Col>
                                        <Col sm={8}>
                                            <FormControl
                                                onChange={(evt) =>
                                                    this.props.handleChange(evt, index, input.name, input.type)}
                                                placeholder="Enter a value"
                                            />
                                        </Col>
                                        <Col sm={2}>
                                            <Button
                                                className={'deleteNewAttrNote'}
                                                bsSize="xsmall"
                                                onClick={() => this.deleteAttr(input, index)}
                                            >X
                                            </Button>
                                        </Col>
                                        </FormGroup>
                                    </div>
                                )
                            )}

                    </Form>

                    <div>{returnFunction}</div>
                </Modal.Body>
                <Modal.Footer>

                    <Button onClick={this.handleAddNew} bsSize="xsmall">Add new attribute</Button>
                    <button className="btn btn-secondary" onClick={this.props.closeClick}> Close</button>
                    <button onClick={(evt) => this.props.handleSubmit(evt)} className="btn btn-primary">
                        Save changes
                    </button>
                </Modal.Footer>
            </Modal.Dialog>
        </div>
        );
    }

    deleteAttr(input: any, index: any) {
        this.props.deleteAttribute(input, index);
    }

    // getValidationStateName() {
    //     const length = this.state.name.length;
    //     if (length > 2) {
    //         return 'success';
    //     } else if (length < 1) {
    //         return 'error';
    //     }
    //     return null;
    // }
}