import * as React from 'react';
import { Button, Modal } from 'react-bootstrap';

export default class MyModal extends React.Component<any, any> {

    constructor(props: any) {
        super(props);

        this.state = {
            value: 'submit',
            types: [ 'm^2', 'pln', 'yes', 'no' ]
        };
        this.handleChangeModal = this.handleChangeModal.bind(this);
    }

    handleChangeModal(event: any, index: any) {
        this.setState({value: event.target.value});
        console.log('chosen value ', event.target.value);
        this.props.handleChange(event, index, 'type');
    }

    render() {
        return (
            <div className="static-modal">
                <Modal.Dialog>
                    <Modal.Header>
                        <Modal.Title> Hello in MapNotes </Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <form onSubmit={(evt) => this.props.handleSubmit(evt)} >
                            {this.props.inputs.map( ( input: any, index: any) =>
                                <div className="form-inline" key={index}>
                                    <input
                                        onChange={(evt) => this.props.handleChange(evt, index, 'name')}
                                        value={input.name}
                                    />
                                    <input
                                        onChange={(evt) => this.props.handleChange(evt, index, 'type')}
                                        value={input.type}
                                    />
                                        <label>
                                            <select onClick={(evt) => this.handleChangeModal(evt, index)}>
                                                <option value="">Default Attribute</option>
                                                {
                                                    this.state.types.map(function(type: any) {
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
                        </form>

                    </Modal.Body>

                    <Modal.Footer>
                        <Button onClick={this.props.handleNewInput} bsSize="xsmall">Add new input</Button>
                        <Button onClick={this.props.closeClick}>Close</Button>
                        <Button onClick={(evt) => this.props.handleSubmit(evt)} bsStyle="primary">Save changes</Button>
                        <Button onClick={this.props.handleAddComplexAttr} bsStyle="primary">
                            AddComplexAttr</Button>
                    </Modal.Footer>
                </Modal.Dialog>
            </div>
        );
    }
}