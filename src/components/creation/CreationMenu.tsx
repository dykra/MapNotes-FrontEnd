import * as React from 'react';
import MapAttr from './MapAttribute';
import { MapData } from '../../types/api/MapData';
import { PinData } from '../../types/api/PinData';
import { putMap } from '../../api/MapApi';
import ComplexAttribute from './ComplexAttribiute';
import { BasicAttr } from '../../types/creation/BasicAttr';

interface CreationMenuState {

    isNewMapClicked: boolean;
    isOpen: boolean;
    complexAttrBox: boolean;
    complexAttr: Array<ComplexAttribute>;
    simpleAtr:  BasicAttr[];
}

export class CreationMenu extends React.Component <any, CreationMenuState> {

    constructor(props: any) {
        super(props);
        this.state = {
            isNewMapClicked : false,
            isOpen : false,
            complexAttrBox: false,
            complexAttr: [],
            simpleAtr:  []
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.myCallback = this.myCallback.bind(this);
        this.renderComplexAttr = this.renderComplexAttr.bind(this);
        this.handleAddComplexAttr = this.handleAddComplexAttr.bind(this);
        this.handleBackToSimpleAttr = this.handleBackToSimpleAttr.bind(this);
        this.handleSaveComplexAttr = this.handleSaveComplexAttr.bind(this);
    }

    toggleModal() {
        this.setState({
            isOpen: !this.state.isOpen,
            isNewMapClicked: !this.state.isNewMapClicked
        });
    }

    handleSubmit(evt: any, basicAttr:  BasicAttr[]) {
        evt.preventDefault();
        const pin: PinData[] = [];
        this.setState((prevState: any) => ({
            simpleAtr: [...prevState.simpleAtr, basicAttr]
        }));
        // this.setState({simpleAtr: basicAttr});
        this.forceUpdate();
        console.log('basic', basicAttr);

        const map: MapData = {
            data: {attributes: basicAttr},
            id: 0,
            pins: pin
        };
        putMap(map, this.myCallback);
        console.log('log state', this.state.simpleAtr.length);

        this.toggleModal();
    }

    public myCallback(map: MapData): void {
        let path = '/map/' + map.id;
        return this.props.history.push(path);
    }

    renderMapAttribute() {
        return(
            <MapAttr
                handleSubmit={this.handleSubmit}
                handleAddComplexAttr={this.handleAddComplexAttr}
            />
        );
    }

    handleAddComplexAttr() {
        this.toggleModal();
        this.setState({
            complexAttrBox: true
        });
    }

    handleSaveComplexAttr(complexAt: Array<ComplexAttribute>) {
        this.setState({
            complexAttr: complexAt,
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
            simpleAttr={this.state.simpleAtr}
            handleBackToSimpleAttr={this.handleBackToSimpleAttr}
            handleSaveComplexAttr={this.handleSaveComplexAttr}
        />
        );
    }

    render() {
        let returnFunction;
        if (this.state.complexAttrBox) {
            console.log('attr', this.state.simpleAtr);
            returnFunction = this.renderComplexAttr();
        } else {
            returnFunction = this.renderMapAttribute();
        }
        return returnFunction;
    }

}
