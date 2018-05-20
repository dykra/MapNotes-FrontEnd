import * as React from 'react';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import { BootstrapTable, DeleteButton, TableHeaderColumn } from 'react-bootstrap-table';
import * as Button from 'react-bootstrap/lib/Button';
import * as Modal from 'react-bootstrap/lib/Modal';
import * as FormGroup from 'react-bootstrap/lib/FormGroup';
import * as Col from 'react-bootstrap/lib/Col';
import * as FormControl from 'react-bootstrap/lib/FormControl';
import { ComplexAttrType } from '../types/ComplexAttrType';
import _ from 'lodash';
import * as ModalBody from 'react-bootstrap/lib/ModalBody';

interface ComplexAttributeState {
    showAddNewComplexAttr: boolean;
    complexAttributes: Array<ComplexAttrType>;
    newComplexAttrName: string;
    newComplexAttrValue: string;
    operators: Array<string>;
    simpleAttrAvailableNames: Array<string>;
}

export default class ComplexAttribute extends React.Component<any, ComplexAttributeState> {

    private static getSimpleAttributesAvailableNames(simpleAttr: Array<any>) {
        console.log('gettng simple attr names');
        let a: Array<string> = [];
        for (let i  = 0; i < simpleAttr.length; i++) {
            if (simpleAttr[i].type === 'pln' || simpleAttr[i].type === 'm^2') {
                console.log('adding');
                a = a.concat(simpleAttr[i].name);
            }
        }
        return a;
    }

    constructor(props: any) {
        super(props);
        this.state = {
            complexAttributes: [],
            showAddNewComplexAttr: false,
            newComplexAttrName: '',
            newComplexAttrValue: '',
            operators: ['+', '-', '*', '/'],
            simpleAttrAvailableNames: ComplexAttribute.getSimpleAttributesAvailableNames(this.props.simpleAttr),
        };
        this.createListOfButtonsWithSimpleAttr = this.createListOfButtonsWithSimpleAttr.bind(this);
        this.createListOfButtonsWithOperands = this.createListOfButtonsWithOperands.bind(this);
        this.onChangeAttributeNameInput = this.onChangeAttributeNameInput.bind(this);
        this.onChangeAttributeValueInput = this.onChangeAttributeValueInput.bind(this);
        this.onChangeAttributeValueInputForButtons = this.onChangeAttributeValueInputForButtons.bind(this);
        this.handleClickAddNewComplexAttr = this.handleClickAddNewComplexAttr.bind(this);
        this.handleDeleteRow = this.handleDeleteRow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.isProperValueInput = this.isProperValueInput.bind(this);
        this.handleClickOnSaveComplexAttrButton = this.handleClickOnSaveComplexAttrButton.bind(this);
        this.checkIfAttributeType = this.checkIfAttributeType.bind(this);
        this.checkIfOperator = this.checkIfOperator.bind(this);
        this.isNewAttrNameUsed = this.isNewAttrNameUsed.bind(this);
        this.createCustomDeleteButton = this.createCustomDeleteButton.bind(this);
    }

    isProperValueInput() {
        let operatorPlace: boolean = false;

        if (this.state.newComplexAttrValue.length === 0 ) {
            return false;
        }

        for (let i = 0; i < this.state.newComplexAttrValue.length - 1; i++ ) {

            if (this.state.newComplexAttrValue[i] === '[' ) {
                let newAttr = '';
                i++;

                if ( this.state.newComplexAttrValue[i] === ']' ) {
                    return false;
                }

                while (this.state.newComplexAttrValue[i] !== ']'
                && i <= this.state.newComplexAttrValue.length ) {
                    newAttr = newAttr +  this.state.newComplexAttrValue[i];
                    console.log(newAttr);
                    i++;
                }

                if (this.state.newComplexAttrValue[i] !== ']' && this.state.newComplexAttrValue.length === i) {
                    return false;
                }

                if (operatorPlace) {
                    operatorPlace = false;
                    if (!this.checkIfOperator(newAttr)) {
                        return false;
                    }
                } else {
                    operatorPlace = true;
                    if (!this.checkIfAttributeType(newAttr)) {
                        return false;
                    }
                }
            } else {
                console.log(this.state.newComplexAttrValue[i]);
                return false;
            }
        }
        if (!operatorPlace) {
            return false;
        }
        return true;
    }

    checkIfAttributeType(newAttr: string) {
        console.log('checking if attr type');
        console.log(newAttr);
        return (_.includes(this.state.simpleAttrAvailableNames, newAttr) || !isNaN(Number(newAttr)));
    }

    checkIfOperator(newAttr: string) {
        console.log('checking if operator');
        console.log(newAttr);
        return _.includes(this.state.operators, newAttr);
    }

    onChangeAttributeNameInput(event: any) {
        this.setState({
            newComplexAttrName: event.target.value
        });
    }

    onChangeAttributeValueInput(event: any) {
        console.log('on change value input sb types');
        console.log(event.target.value);
        this.setState({
            newComplexAttrValue: event.target.value
        });
    }

    onChangeAttributeValueInputForButtons(event: any) {
        console.log('on change value input');
        console.log(event.target.value);
        this.setState({
            newComplexAttrValue: this.state.newComplexAttrValue + '[' + event.target.value + ']'
        });
    }

    createListOfButtonsWithSimpleAttr() {
        let simpleAttButtons = [];
        for (let i = 0; i < this.props.simpleAttr.length; i++) {
            if (this.props.simpleAttr[i].type === 'pln' || this.props.simpleAttr[i].type === 'm^2') {
                simpleAttButtons.push((
                    <Button
                        className={'simpleAttrButton'}
                        id={this.props.simpleAttr[i].name}
                        value={this.props.simpleAttr[i].name}
                        onClick={this.onChangeAttributeValueInputForButtons}
                    > {this.props.simpleAttr[i].name}
                    </Button>
                ));
            }
        }
        return simpleAttButtons;
    }

    createListOfButtonsWithOperands() {
        let operatorButtons = [];
        for ( let i = 0 ; i < this.state.operators.length ; i++ ) {
            operatorButtons.push((
                <Button
                    className={'simpleAttrButton'}
                    id={this.state.operators[i]}
                    value={this.state.operators[i]}
                    onClick={this.onChangeAttributeValueInputForButtons}
                > {this.state.operators[i]}
                </Button>
            ));
        }
        return operatorButtons;
    }

    handleClickAddNewComplexAttr() {
        if (this.state.simpleAttrAvailableNames.length === 0) {
            alert('there is no simple attributes from which you can make complex attributes!');

        } else {
            this.setState({
                showAddNewComplexAttr: true
            });
        }
    }

    handleDeleteRow(row: any) {
        alert('The row is deleted:\n');
        let newComplesAttributes = _.filter(this.state.complexAttributes, (attr) => attr.name !== row[0]);
        this.setState({
            complexAttributes: newComplesAttributes
        });
    }

    handleClose() {
        this.setState({
            newComplexAttrName: '',
            newComplexAttrValue: '',
        });
        console.log('close ');
        this.setState({
            showAddNewComplexAttr: false,
        });
    }

    isNewAttrNameUsed() {
        let simpleNames: Array<string>  = _.map(this.props.simpleAttr, i => i.name);
        let complexNames: Array<string>  = _.map(this.state.complexAttributes, i => i.name);

        return (_.includes(simpleNames, this.state.newComplexAttrName) ||
            _.includes(complexNames, this.state.newComplexAttrName));

    }

    handleSave() {
        if (this.state.newComplexAttrName.length === 0) {
            alert('name cannot be empty!');
        } else if (this.isNewAttrNameUsed()) {
            alert('name already in use!');
        } else if (!this.isProperValueInput()) {
            alert('incorresct input !');
        } else {

            let complexAttr: ComplexAttrType = {
                'name': this.state.newComplexAttrName,
                'value': this.state.newComplexAttrValue
            };

            this.setState({
                complexAttributes: this.state.complexAttributes.concat(complexAttr)
            });

            console.log('save');
            this.handleClose();
        }
    }

    handleClickOnSaveComplexAttrButton() {
        console.log('saving complex attr');
        this.props.handleSaveComplexAttr(this.state.complexAttributes);
    }

    createCustomDeleteButton() {
        return (
            <DeleteButton
                btnText="Delete"
                className="DeleteComplexAttrButton"
                onClick={this.handleDeleteRow}
            />
        );
    }

    render() {
        const options = {
            onDeleteRow: this.handleDeleteRow,
            deleteBtn: this.createCustomDeleteButton
        };

        let simpleAttrTable = (
            <BootstrapTable
                data={this.props.simpleAttr}
            >
                <TableHeaderColumn
                    dataField="name"
                    editable={false}
                    isKey={true}
                > simple attr name
                </TableHeaderColumn>
                <TableHeaderColumn
                    dataField="type"
                    editable={false}
                >type
                </TableHeaderColumn>
            </BootstrapTable>);

        let newComplexAttrModal;
        if (this.state.showAddNewComplexAttr) {
            newComplexAttrModal = (
                <div>
                    <Modal.Dialog>
                        <Modal.Header>
                            <Modal.Title>Add new complex attribute</Modal.Title>
                        </Modal.Header>

                        <Modal.Body>
                            <FormGroup className={'complexAttributeModalBody'}>
                                <Col sm={10}> Attribute name
                                    <FormControl
                                        placeholder="attribute name"
                                        onChange={this.onChangeAttributeNameInput}
                                    />
                                </Col>
                                <Col sm={10}> Attribute value
                                    <FormControl
                                        value={this.state.newComplexAttrValue}
                                        onChange={this.onChangeAttributeValueInput}
                                    />
                                </Col>
                                <Col  sm={10} className={'operatorButtonList'}>
                                    {this.createListOfButtonsWithOperands()}
                                </Col>
                                <Col  sm={10} className={'simpleAttrButtonList'}>
                                    {this.createListOfButtonsWithSimpleAttr()}
                                </Col>
                            </FormGroup>
                        </Modal.Body>

                        <Modal.Footer>
                            <Button onClick={this.handleClose}>Close</Button>
                            <Button
                                onClick={this.handleSave}
                                bsStyle="primary"
                            >Save changes
                            </Button>
                        </Modal.Footer>
                    </Modal.Dialog>
                </div>);
        } else {
            newComplexAttrModal = <div/>;
        }

        let complexAttTable;
        switch (this.state.complexAttributes) {
            case []:
                complexAttTable = <div/>;
                break;
            default:
                complexAttTable = (
                    <div>
                        <div>
                            <Button
                                className={'NewComplexAttrButton'}
                                bsSize="small"
                                bsStyle="success"
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

        return (
            <div>
                <Modal.Dialog>
                    <Modal.Header>
                        <Modal.Title> Hello in MapNotes </Modal.Title>
                    </Modal.Header>

                    <div className={'ComplexAttributes'}>
                        <ModalBody>
                            <div className={'AttrTable'}> {simpleAttrTable} </div>
                            <div className={'AttrTable'}> {complexAttTable} </div>
                            <div>{newComplexAttrModal} </div>
                        </ModalBody>
                        <Modal.Footer>
                            <Button
                                bsSize="medium"
                                onClick={this.props.handleBackToSimpleAttr}
                            >Back to simple attributes
                            </Button>
                            <Button
                                bsSize="medium"
                                onClick={this.handleClickOnSaveComplexAttrButton}
                                bsStyle="primary"
                            >Save complex attributes
                            </Button>
                        </Modal.Footer>
                    </div>
                </Modal.Dialog>
            </div>
        );

    }
}