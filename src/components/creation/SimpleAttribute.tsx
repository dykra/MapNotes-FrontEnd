import * as React from 'react';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import * as Button from 'react-bootstrap/lib/Button';
import { SimpleAttrType } from '../../types/creation/SimpleAttrType';
import * as Modal from 'react-bootstrap/lib/Modal';
import _ from 'lodash';
import { ComplexAttrType } from '../../types/creation/ComplexAttrType';
import { BasicAttrType } from '../../types/BasicAttrType';
import { TYPES } from '../../constants/index';

interface SimpleAttributeState {
    simpleAttributes: Array<SimpleAttrType>;
    complexAttributes: Array<ComplexAttrType>;
}

export default class SimpleAttribute extends React.Component<any, SimpleAttributeState> {

    counter = 0;
    getSimpleAttr(simpleAttr: Array<BasicAttrType>) {
        let simpleAttrWithIndex: Array<SimpleAttrType> = [];
        if (simpleAttr.length > 0 ) {
            simpleAttrWithIndex = simpleAttr.map( (attr) => {
                this.counter++;
                return {
                    'id': this.counter,
                    'name': attr.name,
                    'type': attr.type
                };
            });
        }
        [1, 2, 3, 4].map( i => {
            this.counter++;
                simpleAttrWithIndex.push({
                    'id': this.counter,
                    'name': '',
                    'type': ''
                });
            });

    return simpleAttrWithIndex;
    }

    constructor(props: any) {
        super(props);

        this.state = {
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
        this.props.closeSimpleAttr();
    }

    prepareBasicAttr() {
        const simpleAttr: Array<SimpleAttrType> = this.state.simpleAttributes.filter(
            (attr) => attr.name !== '' && attr.type !== '');
        return simpleAttr.map((attr) => {
            return {
                'name': attr.name,
                'type': attr.type
            };
        });
    }

    handleClickSaveSimpleAttr() {
        this.props.saveSimpleAttr(this.prepareBasicAttr());
    }

    handleAddComplexAttr() {
        this.props.handleAddComplexAttr(this.prepareBasicAttr());
    }

    handleDeleteRow(rows: any) {
        alert('The rows are deleted: \n');
        const newSimpleAttributes: Array<SimpleAttrType> =
            this.state.simpleAttributes.filter((attr) => !_.includes(rows,  attr.id));
        this.setState({
            simpleAttributes: newSimpleAttributes
        });
    }

    handleClickAddNewSimpleAttr() {
        this.counter += 1;
        let newSimpleAttr: SimpleAttrType = {
            'id': this.counter,
            'name': '',
            'type': ''
        };
        this.setState({
            simpleAttributes: [...this.state.simpleAttributes, newSimpleAttr]
        });
    }

    isNewAttrNameUsed(newName: string) {
        const simpleNames: Array<string>  = this.state.simpleAttributes.map( i => i.name);
        const complexNames: Array<string>  = this.state.complexAttributes.map(i => i.name);

        return (_.includes(simpleNames, newName) ||
            _.includes(complexNames, newName));
    }

    onBeforeSaveCell(row: any, cellName: any, cellValue: any) {

        const newSimpleAttr: SimpleAttrType = this.state.simpleAttributes.filter((attr) => attr.id === row.id)[0];
        if ( cellName === 'name') {
            if (this.isNewAttrNameUsed(cellValue)) {
                alert ('name must be unique! ');
                return false;
            }
            newSimpleAttr.name = cellValue;
        } else if ( cellName === 'type' ) {
            newSimpleAttr.type = cellValue;
        }
        const index = _.findIndex(this.state.simpleAttributes, (attr) => attr.id === row.id);
        this.state.simpleAttributes[index] = newSimpleAttr;
        return true;
    }

    render() {

        const options = {
            onDeleteRow: this.handleDeleteRow,
        };

        let simpleAttr;
        if (this.state.simpleAttributes.length === 0) {
            simpleAttr = <div/>;
        } else {
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
                    ><TableHeaderColumn
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
                            editable={{ type: 'select', options: {values: TYPES }}}
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
