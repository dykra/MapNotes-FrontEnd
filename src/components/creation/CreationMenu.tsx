import * as React from 'react';
import MapAttr from './MapAttribute';
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
        this.getSimpleAttr = this.getSimpleAttr.bind(this);
        this.isArrayContains = this.isArrayContains.bind(this);
    }

    toggleModal() {
        this.setState({
            isOpen: !this.state.isOpen,
            isNewMapClicked: !this.state.isNewMapClicked
        });
    }

    deleteEmptyInputs(inputs: BasicAttr[]) {
        console.log(inputs);
        let temp: BasicAttr[];
        temp = [];
        for ( let i = 0; i < inputs.length; i++) {
            console.log('ENTER' + inputs[i].name + inputs[i].type + i);
            if (inputs[i].name === '' || inputs[i].type === '') {
                console.log('eloeoel');
                inputs.splice(i, 1);

            } else {
                console.log('input' + i + inputs[i].name + inputs[i].type);
                temp.push(inputs[i]);
            }
        }
        return temp;
    }

    handleSubmit(evt: any, inputs: BasicAttr[]) {
        evt.preventDefault();
        const pin: PinData[] = [];

        const map: MapData = {
            data: {attributes: this.deleteEmptyInputs(inputs),  complexAttributes: this.state.complexAttr},
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
