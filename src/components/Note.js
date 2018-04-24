import React from 'react';
import {Button, Modal} from 'react-bootstrap';
import * as input from "react-bootstrap";
// import List from './AttributeList'


export default class Note extends React.Component {

    constructor() {
        super();
        this.state={
            data: [
                {"name": "Localisation", "value":"text"},
                {"name" : "size" , "value" : "m2"},
                {"name" : "price" , "value" : "number"}
            ],

        }

    }


    render() {
        return( <div className="static-modal">
                <Modal.Dialog >
                    <Modal.Header>
                        <Modal.Title>New note</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form onSubmit={(evt) => this.props.handleSubmit(evt)}>
                            {this.props.inputs.map((input, index) =>
                                <div key={index}>
                            <label>
                                {input.name}
                                <input
                                onChange={(evt) => this.props.handleChange(evt, index, input.name)}
                                value={input.value}
                                />
                            </label>


                                </div>
                            )}

                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick = {this.props.handleNewInput} bsSize="xsmall">Add new attribute</Button>
                        <Button onClick = {this.props.closeClick} > Close</Button>
                        <Button onClick = {(evt) => this.props.handleSubmit(evt)} bsStyle="primary">Save changes</Button>
                    </Modal.Footer>
                </Modal.Dialog>
            </div>
        );
    }
}




