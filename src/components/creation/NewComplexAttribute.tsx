import * as React from 'react';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import * as Button from 'react-bootstrap/lib/Button';
import * as Modal from 'react-bootstrap/lib/Modal';
import * as FormGroup from 'react-bootstrap/lib/FormGroup';
import * as Col from 'react-bootstrap/lib/Col';
import * as FormControl from 'react-bootstrap/lib/FormControl';
import { ComplexAttrType } from '../../types/creation/ComplexAttrType';
import _ from 'lodash';

interface NewComplexAttributeState {
    newComplexAttrName: string;
    newComplexAttrValue: string;
    operators: Array<string>;
    simpleAttrAvailableNames: Array<string>;
}

export default class NewComplexAttribute extends React.Component<any, NewComplexAttributeState> {

    constructor(props: any) {
        super(props);
        this.state = {
            newComplexAttrName: '',
            newComplexAttrValue: '',
            operators: ['+', '-', '*', '/'],
            simpleAttrAvailableNames: this.props.simpleAttrAvailableNames,
        };
        this.createListOfButtonsWithSimpleAttr = this.createListOfButtonsWithSimpleAttr.bind(this);
        this.createListOfButtonsWithOperands = this.createListOfButtonsWithOperands.bind(this);
        this.onChangeAttributeNameInput = this.onChangeAttributeNameInput.bind(this);
        this.onChangeAttributeValueInput = this.onChangeAttributeValueInput.bind(this);
        this.onChangeAttributeValueInputForButtons = this.onChangeAttributeValueInputForButtons.bind(this);
        this.onChangeAttributeValueInputOperatorsForButtons =
            this.onChangeAttributeValueInputOperatorsForButtons.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.isProperValueInput = this.isProperValueInput.bind(this);
        this.checkIfAttributeType = this.checkIfAttributeType.bind(this);
        this.checkIfOperator = this.checkIfOperator.bind(this);
        this.isNewAttrNameUsed = this.isNewAttrNameUsed.bind(this);
    }

    isProperValueInput() {
        let operatorPlace: boolean = false;
        let inputString: string = this.state.newComplexAttrValue.split(' ').join('');

        if (inputString.length === 0 ) {
            return false;
        }

        for (let i = 0; i < inputString.length - 1; i++ ) {

            console.log(inputString[i]);
            if (inputString[i] === '[' && !operatorPlace) {
                let newAttr = '';
                i++;

                if (inputString[i] === ']') {
                    return false;
                }

                while (inputString[i] !== ']' && i <= inputString.length) {
                    newAttr = newAttr + inputString[i];
                    console.log(newAttr);
                    i++;
                }

                if (inputString[i] !== ']' && inputString.length === i) {
                    console.log('last value is not ]');
                    return false;
                }

                console.log('whole attr');
                console.log(newAttr);
                operatorPlace = true;
                if (!this.checkIfAttributeType(newAttr.split(' ').join(''))) {
                    console.log('symbol is not attr type');
                    return false;
                }
            } else if (operatorPlace) {
                console.log('operator place');
                operatorPlace = false;
                while (inputString[i] === ' ') {
                    i++;
                }

                if (!this.checkIfOperator(inputString[i])) {
                    console.log('symbol is not operator' + inputString[i]);
                    return false;
                }
            } else {
                return false;
            }
            if (inputString[inputString.length - 1] !== ']') {
                console.log('not finishing on ]');
                return false;
            }
        }
        if (!operatorPlace) {
            console.log('last symbol operator');
            return false;
        }
        return true;
    }

    checkIfAttributeType(newAttr: string) {
        return (_.includes(this.state.simpleAttrAvailableNames, newAttr) || !isNaN(Number(newAttr)));
    }

    checkIfOperator(newAttr: string) {
        return _.includes(this.state.operators, newAttr);
    }

    onChangeAttributeNameInput(event: any) {
        this.setState({
            newComplexAttrName: event.target.value
        });
    }

    onChangeAttributeValueInput(event: any) {
        this.setState({
            newComplexAttrValue: event.target.value
        });
    }

    onChangeAttributeValueInputForButtons(event: any) {
        this.setState({
            newComplexAttrValue: this.state.newComplexAttrValue + '[ ' + event.target.value + ' ]'
        });
    }
    onChangeAttributeValueInputOperatorsForButtons(event: any) {
        this.setState({
            newComplexAttrValue: this.state.newComplexAttrValue + ' ' + event.target.value + ' '
        });
    }

    createListOfButtonsWithSimpleAttr() {
        let simpleAttButtons = [];
        for (let i = 0; i < this.props.simpleAttr.length; i++) {
            if (this.props.simpleAttr[i].type === 'pln' || this.props.simpleAttr[i].type === 'm^2'
                || this.props.simpleAttr[i].type === 'number') {
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
                    onClick={this.onChangeAttributeValueInputOperatorsForButtons}
                > {this.state.operators[i]}
                </Button>
            ));
        }
        return operatorButtons;
    }

    handleClose() {
        this.setState({
            newComplexAttrName: '',
            newComplexAttrValue: '',
        });
        console.log('close ');
        this.props.handleCloseAddNewAttrBox();
    }

    isNewAttrNameUsed() {
        let simpleNames: Array<string>  = _.map(this.props.simpleAttr, i => i.name);
        let complexNames: Array<string>  = _.map(this.props.complexAttributes, i => i.name);

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
            this.props.handleClickSaveOnComplexAttrButton(complexAttr);
            console.log('save');
            this.handleClose();
        }
    }

    render() {
        return (
            <div>
                <Modal.Dialog>
                    <Modal.Header>
                        <Modal.Title>Add new complex attribute</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <div className={'InfoBoxAddNewAttr'}>
                            Complex Attributes should have the following pattern:
                            <p>[basic-attr]/[number] operator [basic-attr]/[number]</p>
                        </div>
                        <FormGroup className={'complexAttributeModalBody'}>
                            <Col sm={10}> Attribute name
                                <FormControl
                                    placeholder="attribute name"
                                    onChange={this.onChangeAttributeNameInput}
                                />
                            </Col>
                            <Col sm={10}> Attribute value
                                <FormControl
                                    placeholder="[basic-attr]/[number] operator [basic-attr]/[number]"
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
            </div>
        );
    }

}