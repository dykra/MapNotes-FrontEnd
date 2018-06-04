import * as React from 'react';
import { MapData } from '../../types/api/MapData';
import { PinData } from '../../types/api/PinData';
import { putMap } from '../../api/MapApi';
import ComplexAttribute from './ComplexAttribiute';
import { BasicAttr } from '../../types/creation/BasicAttr';
import { ComplexAttrType } from '../../types/creation/ComplexAttrType';

interface CreationMenuState {

    isNewMapClicked: boolean;
    isOpen: boolean;
    complexAttrBox: boolean;
    complexAttr: Array<ComplexAttrType>;
    simpleAttr:  BasicAttr[];
}

export class CreationMenu extends React.Component <any, CreationMenuState> {

    constructor(props: any) {
        super(props);
        this.state = {
            isNewMapClicked : false,
            isOpen : false,
            complexAttrBox: false,
            complexAttr: [],
            simpleAttr:  []
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.myCallback = this.myCallback.bind(this);
        this.renderComplexAttr = this.renderComplexAttr.bind(this);
        this.renderMapAttribute = this.renderMapAttribute.bind(this);
        this.handleAddComplexAttr = this.handleAddComplexAttr.bind(this);
        this.handleBackToSimpleAttr = this.handleBackToSimpleAttr.bind(this);
        this.handleSaveComplexAttr = this.handleSaveComplexAttr.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.closeSimpleAttr = this.closeSimpleAttr.bind(this);
        this.handleSaveSimpleAttr = this.handleSaveSimpleAttr.bind(this);
    }

    toggleModal() {
        this.setState({
            isOpen: !this.state.isOpen,
            isNewMapClicked: !this.state.isNewMapClicked
        });
    }

    closeSimpleAttr() {
        this.toggleModal();
        return this.props.history.push('/');
    }

    handleSaveSimpleAttr(basicAttributes: Array<BasicAttr>) {
        this.setState({
            simpleAttr: basicAttributes
        });
        this.handleSubmit();
        this.toggleModal();
    }

    handleSubmit() {
    handleSubmit(evt: any) {
    getAttrList(value: string) {
        value = value.split(' ').join('');
        const args = value.split(/\[|\]/ );
        return args.filter(i => !_.includes(OPERATORS, i) && i !== '');
    }

    getOperatorList(value: string) {
        value = value.split(' ').join('');
        const args = value.split(/\[|\]/);
        return args.filter(i => _.includes(OPERATORS, i));
    }

    prepareComplexAttr(complexAttributes: Array<ComplexAttrType>) {
        const complexAttrMap: Map<string, FormulaLists> = new Map();
        complexAttributes.map(i => complexAttrMap.set(
            i.name,
            {
                'attrList': this.getAttrList(i.value),
                'opList': this.getOperatorList(i.value)

            }
        ));
        return complexAttrMap;
    }

    handleSubmit(evt: any, inputs: BasicAttr[]) {
        evt.preventDefault();
        const pin: PinData[] = [];

        const map: MapData = {
            data: {
                attributes: this.deleteEmptyInputs(inputs),
                complexAttributes: this.prepareComplexAttr(this.state.complexAttr)
            } ,
            id: 0,
            pins: pin
        };
        putMap(map, this.myCallback);
    }

    public myCallback(map: MapData): void {
        let path = '/map/' + map.id;
        return this.props.history.push(path);
    }

    handleAddComplexAttr(simpleAttr: Array<BasicAttr>) {
        this.toggleModal();
        this.setState({
            simpleAttr: simpleAttr,
            complexAttrBox: true
        });
    }

    handleSaveComplexAttr(attr: Array<ComplexAttrType>) {
        this.setState({
            complexAttr: attr,
            complexAttrBox: false
        });
    }

    handleBackToSimpleAttr() {
        this.setState({
            isNewMapClicked: true,
            complexAttrBox: false
        });
    }

    renderComplexAttr() {
        return (
        <ComplexAttribute
            simpleAttr={this.state.simpleAttr}
            complexAttr={this.state.complexAttr}
            handleBackToSimpleAttr={this.handleBackToSimpleAttr}
            handleSaveComplexAttr={this.handleSaveComplexAttr}
        />
        );
    }

    renderMapAttribute() {
        return(
            <SimpleAttribute
                simpleAttr={this.state.simpleAttr}
                complexAttr={this.state.complexAttr}
                handleSubmit={this.handleSubmit}
                handleAddComplexAttr={this.handleAddComplexAttr}
                closeSimpleAttr={this.closeSimpleAttr}
                saveSimpleAttr={this.handleSaveSimpleAttr}
            />
        );
    }

    render() {
        let returnFunction;
        if (this.state.complexAttrBox) {
            returnFunction = this.renderComplexAttr();
        } else {
            returnFunction = this.renderMapAttribute();
        }
        return returnFunction;
    }

}
