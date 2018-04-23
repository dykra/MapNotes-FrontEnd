import React from 'react';
import {Button, Modal} from 'react-bootstrap';


export default class MyModal extends React.Component {

    constructor(props) {
        super(props);
        this.closeClick = this.props.closeClick
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
                                <div key={index}>
                                    <input
                                        onChange={(evt) => this.props.handleChange(evt, index, 'name')}
                                        value={input.name}
                                    />
                                    <input
                                        onChange={(evt) => this.props.handleChange(evt, index, 'type')}
                                        value={input.type}
                                    />
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



