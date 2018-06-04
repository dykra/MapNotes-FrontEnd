import * as React from 'react';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import * as Button from 'react-bootstrap/lib/Button';
import { SimpleAttrType } from '../../types/SimpleAttrType';
import * as Modal from 'react-bootstrap/lib/Modal';
import _ from 'lodash';
import { ComplexAttrType } from '../../types/creation/ComplexAttrType';

interface SimpleAttributeState {
    simpleAttributes: Array<SimpleAttrType>;
    complexAttributes: Array<ComplexAttrType>;
    types: Array<string>;
}

export default class SimpleAttribute extends React.Component<any, SimpleAttributeState> {

    counter = 0;
    getSimpleAttr(simpleAttr: Array<BasicAtrrType>) {
        let simpleAttrWithIndex: Array<SimpleAttrType> = [];
        if (simpleAttr.length > 0 ) {
            simpleAttrWithIndex = _.map(simpleAttr, (attr) => {
                this.counter++;
                return {
                    'id': this.counter,
                    'name': attr.name,
                    'type': attr.type
                };
            });
        } else {
            simpleAttrWithIndex = _.map( [1, 2, 3, 4], i => {
                this.counter++;
                return {
                    'id': this.counter,
                    'name': '',
                    'type': ''
                };
            });
        }
    return simpleAttrWithIndex;
    }

    constructor(props: any) {
        super(props);

        this.state = {
            types: [ 'm^2', 'pln', 'yes', 'no' ],
            simpleAttributes: this.getSimpleAttr(this.props.simpleAttr),
            complexAttributes: this.props.complexAttr
        };
        this.handleDeleteRow = this.handleDeleteRow.bind(this);
        this.handleClickAddNewSimpleAttr = this.handleClickAddNewSimpleAttr.bind(this);
        this.handleClickCloseSimpleAttr = this.handleClickCloseSimpleAttr.bind(this);
        this.handleClickSaveSimpleAttr = this.handleClickSaveSimpleAttr.bind(this);
        this.handleAddComplexAttr = this.handleAddComplexAttr.bind(this);
        this.onBeforeSaveCell = this.onBeforeSaveCell.bind(this);
        this.prepareBasicAttr  = this.prepareBasicAttr.bind(this);
    }

    handleClickCloseSimpleAttr () {
        console.log('close simple attr back to main component');
        this.props.closeSimpleAttr();
    }

    prepareBasicAttr() {
        let simpleAttr: Array<SimpleAttrType> = _.filter(this.state.simpleAttributes,
            (attr) => attr.name !== '' && attr.type !== '');
        let basicAttr: Array<BasicAtrrType>  = _.map(simpleAttr, (attr) => {
            return {
                'name': attr.name,
                'type': attr.type
            };
        });
        return basicAttr;
    }

    handleClickSaveSimpleAttr() {
        this.props.saveSimpleAttr(this.prepareBasicAttr());
        console.log('save simple attr, back to main component');
    }

    handleAddComplexAttr() {
        console.log('save simple attr, go to complex attr');
        this.props.handleAddComplexAttr(this.prepareBasicAttr());
    }

    handleDeleteRow(row: any) {
        console.log('delete');
        console.log(row);
    }

    handleClickAddNewSimpleAttr() {
        this.counter += 1;
        let newSimpleAttr: SimpleAttrType = {
            'id': this.counter,
            'name': '',
            'type': ''
        };
        this.setState({
            simpleAttributes: this.state.simpleAttributes.concat(newSimpleAttr),
        });
    }

    isNewAttrNameUsed(newName: string) {
        let simpleNames: Array<string>  = _.map(this.state.simpleAttributes, i => i.name);
        let complexNames: Array<string>  = _.map(this.state.complexAttributes, i => i.name);

        return (_.includes(simpleNames, newName) ||
            _.includes(complexNames, newName));
    }

    onBeforeSaveCell(row: any, cellName: any, cellValue: any) {
        console.log(row);
        console.log(cellValue);
        console.log(cellName);

        console.log('on before save cell');
        let newSimpleAttr: SimpleAttrType = _.filter(this.state.simpleAttributes, (attr) => attr.id === row.id)[0];
        if ( cellName === 'name') {
            if (this.isNewAttrNameUsed(cellValue)) {
                alert ('name must be unique! ');
                return false;
            }
            newSimpleAttr.name = cellValue;
        } else if ( cellName === 'type' ) {
            newSimpleAttr.type = cellValue;
        }
        let index = _.findIndex(this.state.simpleAttributes, (attr) => attr.id === row.id);
        this.state.simpleAttributes[index] = newSimpleAttr;
        console.log(this.state.simpleAttributes);
        return true;
    }

    render() {

        const options = {
            onDeleteRow: this.handleDeleteRow,
        };

        let simpleAttr;
        switch (this.state.simpleAttributes) {
            case [] :
                simpleAttr = <div/>;
                break;
            default:
                simpleAttr = (
                    <div>
                        <Button
                            className={'NewComplexAttrButton'}
                            bsSize="small"
                            bsStyle="success"
                            active={true}
                            onClick={this.handleClickAddNewSimpleAttr}
                        >New
                        </Button>
                        <BootstrapTable
                            deleteRow={true}
                            selectRow={{mode: 'checkbox'}}
                            cellEdit={{mode: 'click', blurToSave: true, beforeSaveCell: this.onBeforeSaveCell }}
                            data={this.state.simpleAttributes}
                            options={options}
                        >
                            <TableHeaderColumn
                                dataField="id"
                                isKey={true}
                                hidden={true}
                            > id
                            </TableHeaderColumn>
                            <TableHeaderColumn
                                dataField="name"
                            > simple attribute name
                            </TableHeaderColumn>
                            <TableHeaderColumn
                                dataField="type"
                                dataSort={true}
                                editable={{ type: 'select', options: {values: this.state.types }}}
                            >simple attr type
                            </TableHeaderColumn>
                        </BootstrapTable>
                    </div>);
        }

        return (
            <div className="static-modal">
                <Modal.Dialog>
                    <Modal.Header>
                        <Modal.Title> Create attibutes to map </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {/*<div className={'AttributeTitle'}>Simple Attributes</div>*/}
                        <div>
                            {simpleAttr}
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.handleClickCloseSimpleAttr}>Close</Button>
                        <Button onClick={this.handleClickSaveSimpleAttr} bsStyle="primary">Save changes</Button>
                        <Button onClick={this.handleAddComplexAttr} bsStyle="primary">
                        AddComplexAttr</Button>
                    </Modal.Footer>
                </Modal.Dialog>
            </div>
        );
    }
}