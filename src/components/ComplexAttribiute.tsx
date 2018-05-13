// import * as Button from 'react-bootstrap/lib/Button';
import * as React from 'react';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import * as Button from 'react-bootstrap/lib/Button';
import * as Modal from 'react-bootstrap/lib/Modal';
import * as FormGroup from 'react-bootstrap/lib/FormGroup';
import * as Col from 'react-bootstrap/lib/Col';
import * as FormControl from 'react-bootstrap/lib/FormControl';
import { ComplexAttrType } from '../types/ComplexAttrType';

interface ComplexAttributeState {
    simpleAttributes: Array<string>;
    complexAttributes: Array<ComplexAttrType>;
    show: boolean;
    newComplexAttrName: string;
    newComplexAttrValue: string;
}

export default class ComplexAttribute extends React.Component<any, ComplexAttributeState> {

    constructor(props: {}) {
        super(props);
        this.createListOfButtons = this.createListOfButtons.bind(this);
        this.onChangeAttributeNameInput = this.onChangeAttributeNameInput.bind(this);
        this.onChangeAttributeValueInput = this.onChangeAttributeValueInput.bind(this);
        this.handleClickAddNewComplexAttr = this.handleClickAddNewComplexAttr.bind(this);
        this.handleDeleteRow = this.handleDeleteRow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.state = {
            simpleAttributes: [ 'price' , 'size' , 'aaa' ],
            complexAttributes: [],
            show: false,
            newComplexAttrName: '',
            newComplexAttrValue: '',
        };
    }

    onChangeAttributeNameInput(event: any) {
        this.setState({
            newComplexAttrName: event.target.value
        });
    }
    onChangeAttributeValueInput(event: any) {
        console.log('on change value input');
        console.log(event.target.value);
        this.setState({
            newComplexAttrValue: this.state.newComplexAttrValue + '[' + event.target.value + ']'
        });
    }

    createListOfButtons() {
        let simpleAttButtons = [];
        simpleAttButtons.push(
            <Button
                className={'simpleAttrButton'}
                id={'+'}
                value={'+'}
                onClick={this.onChangeAttributeValueInput}
            > +
            </Button>);
        for ( let i = 0 ; i < this.state.simpleAttributes.length ; i++ ) {
            simpleAttButtons.push((
                <Button
                    className={'simpleAttrButton'}
                    id={this.state.simpleAttributes[i]}
                    value={this.state.simpleAttributes[i]}
                    onClick={this.onChangeAttributeValueInput}
                > {this.state.simpleAttributes[i]}
                </Button>
            ));
        }
        return simpleAttButtons;
    }

    handleClickAddNewComplexAttr() {
        this.setState({
            show: true
        });
    }

    handleDeleteRow(row: any) {
        console.log('delete row:');
        console.log(row[0]);
        alert('The row is deleted:\n');
        console.log(this.state.complexAttributes);
        // this.detachmentService.getAllDetachments(this.props.session.sessionID, this.getAllDetachments);
    }

    handleClose() {
        console.log('close ');
        this.setState({
            show: false,
        });
    }
    handleSave() {
        let complexAttr: ComplexAttrType = {
                'name': this.state.newComplexAttrName,
                'value': this.state.newComplexAttrValue};

        this.setState({
            complexAttributes: this.state.complexAttributes.concat(complexAttr)
        });

        this.setState({
            newComplexAttrName: '',
            newComplexAttrValue: '',
        });
        console.log('save');
        this.handleClose();
    }

    render() {
        const options = {
            onDeleteRow: this.handleDeleteRow
        };

        let a;
        if (this.state.show) {
            a = (
                <div>
                    <Modal.Dialog>
                        <Modal.Header>
                            <Modal.Title>Add new complex attribute</Modal.Title>
                        </Modal.Header>

                        <Modal.Body>
                            <FormGroup>
                                <Col sm={8}> Attribute name
                                    <FormControl
                                        placeholder="attribute name"
                                        onChange={this.onChangeAttributeNameInput}
                                    />
                                </Col>
                                <Col sm={8}> Attribute value
                                    <FormControl
                                        placeholder={this.state.newComplexAttrValue}
                                        onChange={this.onChangeAttributeValueInput}
                                    />
                                </Col>
                            </FormGroup>
                            <FormGroup controlId="formControlsSelect">
                                <div className={'simpleAttrButtonList'}>{this.createListOfButtons()}</div>
                            </FormGroup>
                        </Modal.Body>

                        <Modal.Footer>
                            <Button onClick={this.handleClose}>Close</Button>
                            <Button onClick={this.handleSave} bsStyle="primary">Save changes</Button>
                        </Modal.Footer>
                    </Modal.Dialog>
                </div>);
        } else {
            a = <div/>;
        }

        let b;
        switch (this.state.complexAttributes) {
            case []:
                b = <div/>;
                break;
            default:
                b = (
                    <div className={'complexAttributes'}>
                        <div>
                            <Button
                                className={'newComplexAttrButton'}
                                bsSize="small"
                                active={true}
                                onClick={this.handleClickAddNewComplexAttr}
                            >New
                            </Button>
                        </div>
                        <BootstrapTable
                            deleteRow={true}
                            selectRow={{mode: 'radio'}}
                            data={this.state.complexAttributes}
                            options={options}
                        >
                            <TableHeaderColumn
                                dataField="name"
                                editable={false}
                                isKey={true}
                            > complex attribute name
                            </TableHeaderColumn>
                            <TableHeaderColumn
                                dataField="value"
                                editable={true}
                            >complex attribute value
                            </TableHeaderColumn>
                        </BootstrapTable>
                    </div>);
                break;
        }
        return <div> {a} {b} </div>;
    }
}