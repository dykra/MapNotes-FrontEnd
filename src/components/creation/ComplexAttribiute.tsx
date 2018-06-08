import * as React from 'react';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import * as Button from 'react-bootstrap/lib/Button';
import * as Modal from 'react-bootstrap/lib/Modal';
import { ComplexAttrType } from '../../types/creation/ComplexAttrType';
import _ from 'lodash';
import * as ModalBody from 'react-bootstrap/lib/ModalBody';
import NewComplexAttribute from './NewComplexAttribute';

interface ComplexAttributeState {
    showAddNewComplexAttr: boolean;
    complexAttributes: Array<ComplexAttrType>;
    newComplexAttrName: string;
    newComplexAttrValue: string;
    simpleAttrAvailableNames: Array<string>;
}

export default class ComplexAttribute extends React.Component<any, ComplexAttributeState> {

    private static getSimpleAttributesAvailableNames(simpleAttr: Array<any>) {
        let a: Array<string> = [];
        for (let i  = 0; i < simpleAttr.length; i++) {
            if (simpleAttr[i].type === 'pln' || simpleAttr[i].type === 'm^2' || simpleAttr[i] === 'number') {
                a = a.concat(simpleAttr[i].name);
            }
        }
        return a;
    }

    constructor(props: any) {
        super(props);
        this.state = {
            complexAttributes: this.props.complexAttr,
            showAddNewComplexAttr: false,
            newComplexAttrName: '',
            newComplexAttrValue: '',
            simpleAttrAvailableNames: ComplexAttribute.getSimpleAttributesAvailableNames(this.props.simpleAttr),
        };
        this.handleClickAddNewComplexAttr = this.handleClickAddNewComplexAttr.bind(this);
        this.handleDeleteRow = this.handleDeleteRow.bind(this);
        this.handleClickOnSaveAllComplexAttrButton = this.handleClickOnSaveAllComplexAttrButton.bind(this);
        this.handleClickSaveOnComplexAttrButton = this.handleClickSaveOnComplexAttrButton.bind(this);
        this.handleCloseAddNewAttrBox = this.handleCloseAddNewAttrBox.bind(this);
    }

    handleClickAddNewComplexAttr() {
        if (this.state.simpleAttrAvailableNames.length === 0) {
            alert('There is no basic attributes from which you can make complex attributes!' +
                'Try to create basic attr with type pln, m^2 or number. ');
        } else {
            this.setState({
                showAddNewComplexAttr: true
            });
        }
    }

    handleDeleteRow(rows: any) {
        alert('The rows are deleted:\n');
        let newComplexAttributes: Array<ComplexAttrType> =
            _.filter(this.state.complexAttributes, (attr) => !_.includes(rows,  attr.name));
        this.setState({
            complexAttributes: newComplexAttributes
        });
    }

    handleClickSaveOnComplexAttrButton(complexAttr: ComplexAttrType) {
        this.setState({
            complexAttributes: this.state.complexAttributes.concat(complexAttr)
        });
    }

    handleClickOnSaveAllComplexAttrButton() {
        this.props.handleSaveComplexAttr(this.state.complexAttributes);
    }

    handleCloseAddNewAttrBox() {
        this.setState({
            showAddNewComplexAttr: false,
        });
    }

    render() {
        const options = {
            onDeleteRow: this.handleDeleteRow
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
                <NewComplexAttribute
                    handleClickSaveOnComplexAttrButton={this.handleClickSaveOnComplexAttrButton}
                    handleCloseAddNewAttrBox={this.handleCloseAddNewAttrBox}
                    simpleAttrAvailableNames={this.state.simpleAttrAvailableNames}
                    complexAttributes={this.state.complexAttributes}
                    simpleAttr={this.props.simpleAttr}
                />);

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
                    <div className={'ComplexAttrTable'}>
                        <div className={'NewButton'}>
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
                            selectRow={{mode: 'checkbox'}}
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
                                bsSize="small"
                                onClick={this.props.handleBackToSimpleAttr}
                            >Back to simple attributes
                            </Button>
                            <Button
                                bsSize="small"
                                onClick={this.handleClickOnSaveAllComplexAttrButton}
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
