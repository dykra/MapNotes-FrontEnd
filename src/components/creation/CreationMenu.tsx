import * as React from 'react';
import MapAttr from './MapAttribute';
import { MapData } from '../../types/api/MapData';
import { PinData } from '../../types/api/PinData';
import { getAllMaps, putMap } from '../../api/MapApi';
import ComplexAttribute from './ComplexAttribiute';

// todo Generalnie ten komponent robił za dużo, rozbiłęm go ale nie zdażyłem go przeanalizować moim zdaniem
// nalezało by w nim trzymać tylko atrybuty i ostateczny sumbit ustawień
// a dododatkowo używać twóch komponetów(jeden dla typów prostych, drugi dla typów złożonych) w który edytujemy
// i tylko końcowe atrybuty przesyłąmy tutaj
// ponad to trzeba zmienić nazwy typo Modal bo nic nie mówi i wywalić consol logi(używać ich tylko do debugowania)

// interface CreationMenuProps {
//
// }

interface CreationMenuState {
    inputValue: String;
    markers: any;
    inputs: any;
    isNewMapClicked: boolean;
    isOpen: boolean;
    todos: any;
    isSubmit: boolean;
    openMap: boolean;
    mapId: any;
    complexAttrBox: boolean;
    complexAttr: Array<ComplexAttribute>;
}

export class CreationMenu extends React.Component <any, CreationMenuState> {

    constructor(props: any) {
        super(props);
        this.state = {
            inputValue : '',
            inputs : [{name: '', type: ''}],
            isNewMapClicked : false,
            isOpen : false,
            todos: [],
            markers : '',
            isSubmit : false,
            openMap : false,
            mapId : 0,
            complexAttrBox: false,
            complexAttr: []
        };

        this.handleChange = this.handleChange.bind(this);

        this.openMapButtonClicked = this.openMapButtonClicked.bind(this);
        this.handleNewInput = this.handleNewInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.myCallback = this.myCallback.bind(this);
        this.myCallbackAllMaps = this.myCallbackAllMaps.bind(this);
        this.renderComplexAttr = this.renderComplexAttr.bind(this);
        this.handleAddComplexAttr = this.handleAddComplexAttr.bind(this);
        this.handleBackToSimpleAttr = this.handleBackToSimpleAttr.bind(this);
        this.handleSaveComplexAttr = this.handleSaveComplexAttr.bind(this);
    }

    handleChange (evt: any, index: any, fieldName: any) {
        this.state.inputs[index][fieldName] = evt.target.value;
        this.forceUpdate();
    }

    toggleModal() {
        this.setState({
            isOpen: !this.state.isOpen,
            isNewMapClicked: !this.state.isNewMapClicked
        });
    }

    handleNewInput() {
        console.log('new input!!');
        this.setState({inputs: this.state.inputs.concat({name: '', type: ''})});
    }

    openMapButtonClicked () {
        getAllMaps(this.myCallbackAllMaps);

    }

    handleSubmit(evt: any) {
        evt.preventDefault();
        console.log('handle submit');

        const newTodos = this.state.inputs.map((input: any) => {
            return {
                name: input.name,
                type: input.type
            };
        });
        console.log('new todos', newTodos);

        let mydata = newTodos;

        this.setState({
            todos: this.state.todos.concat(newTodos), inputs: [{name: '', type: ''}], isSubmit: true
        });

        this.setState({
            todos: [], inputs: [{name: '', type: ''}], isSubmit: true
        });

        const pin: PinData[] = [];

        const map: MapData = {
            data: {attributes: mydata},
            id: 0,
            pins: pin
        };
        putMap(map, this.myCallback);

        this.toggleModal();
    }

    public myCallback(map: MapData): void {
        let path = '/map/' + map.id;
        return this.props.history.push(path);
    }

    public myCallbackAllMaps(maps: MapData[]): void {
        console.log(maps);
        let mapSize = maps.length - 1;

        this.setState({
            mapId: maps[mapSize].id,
        });

        console.log(this.state.markers);

        this.setState({openMap: true });
    }

    renderMapAttribute() {
        return(
            <MapAttr
                handleChange={this.handleChange}
                inputValue={this.state.inputValue}
                handleNewInput={this.handleNewInput}
                inputs={this.state.inputs}
                handleSubmit={this.handleSubmit}
                mapId={this.state.mapId}
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
            simpleAttr={this.state.inputs}
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
