import * as React from 'react';
import MapAttr from './MapAttribute';
import { MapData } from '../../types/api/MapData';
import { PinData } from '../../types/api/PinData';
import ComplexAttribute from './ComplexAttribiute';
import { BasicAttr } from '../../types/creation/BasicAttr';
import { ComplexAttrType } from '../../types/creation/ComplexAttrType';
import { FormulaLists } from '../../types/creation/FormulaLists';
import _ from 'lodash';
import { OPERATORS } from '../../constants/index';
import { putMap } from '../../api/MapApi';

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
        this.getSimpleAttr = this.getSimpleAttr.bind(this);
        this.isArrayContains = this.isArrayContains.bind(this);
        this.getOperatorList = this.getOperatorList.bind(this);
        this.prepareComplexAttr = this.prepareComplexAttr.bind(this);
    }

    toggleModal() {
        this.setState({
            isOpen: !this.state.isOpen,
            isNewMapClicked: !this.state.isNewMapClicked
        });
    }
    deleteEmptyInputs(inputs: BasicAttr[]) {
        return inputs.filter((elem) => {
            if (elem.name !== '' && elem.type !== '') {
                return elem;
            }
            return;
        });
    }

    getAttrList(value: string) {
        value = value.split(' ').join('');
        console.log(value);
        let args = value.split(/\[|\]/ );
        return args.filter(i => !_.includes(OPERATORS, i) && i !== '');
    }

    getOperatorList(value: string) {
        value = value.split(' ').join('');
        let args = value.split(/\[|\]/);
        return args.filter(i => _.includes(OPERATORS, i));
    }

    prepareComplexAttr(complexAttributes: Array<ComplexAttrType>) {
        let complexAttrMap: Map<string, FormulaLists> = new Map();
        complexAttributes.map(i => complexAttrMap.set(
            i.name,
            {
                'attrList': this.getAttrList(i.value),
                'opList': this.getOperatorList(i.value)

            }
        ));
        console.log(complexAttrMap);
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

    renderMapAttribute() {
        return(
            <MapAttr
                simpleAttr={this.state.simpleAttr}
                handleSubmit={this.handleSubmit}
                handleAddComplexAttr={this.handleAddComplexAttr}

            />
        );
    }

    isArrayContains(name: String) {
        for ( let i = 0; i < this.state.simpleAttr.length; i++) {
            if (this.state.simpleAttr[i].name === name) {
                return true;
            }
                }
                return false;
    }

    getSimpleAttr(simpleAttr: BasicAttr[]) {
        let temp: BasicAttr[];
        temp = [];
        for (let i = 0; i < simpleAttr.length; i++) {
            if (simpleAttr[i].name !== '' && !this.isArrayContains(simpleAttr[i].name) ) {
                temp.push(simpleAttr[i]);
            }
        }
        return temp;
    }

    handleAddComplexAttr(simpleAttr: BasicAttr[]) {

        this.toggleModal();
        this.setState({
            simpleAttr: this.state.simpleAttr.concat(this.getSimpleAttr(simpleAttr)),
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
