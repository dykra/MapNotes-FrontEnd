import * as React from 'react';
import { Button, Modal } from 'react-bootstrap';

export default class Note extends React.Component<any, any> {

    constructor(props: any) {
        super(props);
        this.state = {
            data: []
        };

    }

    render() {

        return(
            <div>

                <Modal.Dialog >

                    <Modal.Header>
                        <Modal.Title>Create new note</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="container-fluid">
                        <form onSubmit={(evt) => this.props.handleSubmit(evt)}>

                            {this.props.inputs.map((input: any, index: any) => (

                                <div key={index}>

                                    {(input.name).localeCompare('') !== 0 &&
                            <label>

                                <div className="col-8 col-sm-6">

                                {input.name}
                                </div>
                                <div className="col-8 col-sm-6">
                                <input
                                    onChange={(evt) => this.props.handleChange(evt, index, input.name)}
                                    value={input.value}
                                />
                                </div>

                            </label>}
                            {(input.name).localeCompare('') === 0 &&
                                        <div>
                                                <input
                                                    // onChange={(evt) =>this.props.handleChange(evt,index, input.name)}
                                                    value={input.name}
                                                />
                                                <input
                                                    onChange={(evt) => this.props.handleChange(evt, index, input.name)}
                                                    value={input.value}
                                                />
                                            <select>
                                                <option value="default type">default type</option>
                                                <option value="m^2">m^2</option>
                                                <option value="pln">pln</option>
                                                <option value="yes">yes</option>
                                                <option value="no">no</option>
                                            </select>
                                            </div>
                            }

                                </div>)
                            )}

                        </form>
                            </div>

                    </Modal.Body>
                    <Modal.Footer>

                        <Button onClick={this.props.handleNewInput} bsSize="xsmall">Add new attribute</Button>
                        <button className="btn btn-secondary"  onClick={this.props.closeClick}> Close</button>
                        <button onClick={(evt) => this.props.handleSubmit(evt)} className="btn btn-primary">
                            Save changes</button>
                    </Modal.Footer>
                </Modal.Dialog>
            </div>
        );
    }
}