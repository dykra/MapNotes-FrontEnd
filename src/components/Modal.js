import React from 'react';
import {
    Button,
    ButtonToolbar,
    ControlLabel,
    DropdownButton,
    FormControl,
    FormGroup,
    MenuItem,
    Modal
} from 'react-bootstrap';






export default class MyModal extends React.Component {

    constructor(props) {
        super(props);
        this.closeClick = this.props.closeClick
        this.state = {value: 'submit'};
        this.handleChangeModal = this.handleChangeModal.bind(this);
    }

    handleChangeModal(event, index) {
        this.setState({value: event.target.value});
        console.log('chosen value ', event.target.value)
        this.props.handleChange(event, index, 'type')
    }

    render() {
        return (
            <div className="static-modal">
                <Modal.Dialog>
                    <Modal.Header>
                        <Modal.Title> Hello in MapNotes </Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <form onSubmit={(evt) => this.props.handleSubmit(evt)}>
                            {this.props.inputs.map((input, index) =>
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
                                            <select onChange={(evt) => this.handleChangeModal(evt, index)}>
                                                <option value="default type">default type</option>
                                                <option value="m^2">m^2</option>
                                                <option value="pln">pln</option>
                                                <option value="yes">yes</option>
                                                <option value="no">no</option>
                                            </select>
                                        </label>
                                </div>
                            )}
                        </form>

                    </Modal.Body>

                    <Modal.Footer>
                        <Button onClick = {this.props.handleNewInput} bsSize="xsmall">Add new input</Button>
                        <Button onClick = {this.props.closeClick}>Close</Button>
                        <Button onClick = {(evt) => this.props.handleSubmit(evt)} bsStyle="primary">Save changes</Button>
                    </Modal.Footer>
                </Modal.Dialog>
            </div>
        );
    }
}



