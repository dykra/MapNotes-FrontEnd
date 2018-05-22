import * as React from 'react';
import Map from './MapComponent';
import MyModal from './Modal';
import { Button } from 'react-bootstrap';
import ComplexAttribute from './ComplexAttribiute';

interface MapMenuState {
    inputValue: String;
    inputs: any;
    isNewMapClicked: boolean;
    isOpen: boolean;
    todos: any;
    isSubmit: boolean;
    openMap: boolean;
    complexAttrBox: boolean;
    complexAttr: Array<ComplexAttribute>;
}

class MapMenu extends React.Component <{}, MapMenuState> {

    constructor(props: any) {
        super(props);
        this.state = {
            inputValue : '',
            inputs : [{name: '', type: ''}],
            isNewMapClicked : false,
            isOpen : false,
            todos: [],
            isSubmit : false,
            openMap : false,
            complexAttrBox: false,
            complexAttr: []
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.buttonClicked = this.buttonClicked.bind(this);
        this.openMapButtonClicked = this.openMapButtonClicked.bind(this);
        this.handleNewInput = this.handleNewInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.renderComplexAttr = this.renderComplexAttr.bind(this);
        this.handleAddComplexAttr = this.handleAddComplexAttr.bind(this);
        this.handleBackToSimpleAttr = this.handleBackToSimpleAttr.bind(this);
        this.handleSaveComplexAttr = this.handleSaveComplexAttr.bind(this);
    }

    handleChange (evt: any, index: any, fieldName: any) {
        this.state.inputs[index][fieldName] = evt.target.value;
        this.forceUpdate();
    }

    handleClick (index: any) {
        console.log('button clicked', index);
        console.log(this.state.todos[index]);
    }

    buttonClicked () {
        console.log('My button was clicked');
        console.log(this.state);
        this.setState({ isNewMapClicked: true });
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
        console.log('open map button clicked!!');
        this.setState({openMap : true});
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
        // let t: any;

        this.setState({
            todos :  this.state.todos.concat(newTodos), inputs: [{name: '', type: ''}], isSubmit: true
        });

        console.log('after setting state', this.state);
        let json = JSON.stringify(this.state.todos);
        console.log('checking json', json);
        this.setState({
            todos : [], inputs: [{name: '', type: ''}], isSubmit: true
        });

        this.toggleModal();
    }

    renderMainMenu() {
        console.log('printing my array in main menu!', this.state.todos);
        return (
            <div className="MapMenu">
            <Button className="NewMapButton" bsSize="large" bsStyle="primary" onClick={this.buttonClicked} >
                Create new map
            </Button>
            <div>
                <Button className="OpenMapButton" bsSize="small" bsStyle="primary" onClick={this.openMapButtonClicked} >
                        Open map
                </Button>
            </div>

        </div>);
    }

    renderModal() {
        return(
            <MyModal
                handleChange={this.handleChange}
                inputValue={this.state.inputValue}
                handleNewInput={this.handleNewInput}
                inputs={this.state.inputs}
                handleSubmit={this.handleSubmit}
                closeClick={() => this.toggleModal()}
                handleAddComplexAttr={this.handleAddComplexAttr}

            />
        );
    }

    handleAddComplexAttr() {
        console.log('handle complex attr clicked ');
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
        console.log('handle rendering back to simple attr');
        this.setState({
            isNewMapClicked: true,
            complexAttrBox: false
        });
        this.renderModal();
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

    renderMap() {
        return(
            <div className="App">
                <Map/>
            </div>
        );
    }

    render() {
        let returnFunction;

        if ( !this.state.isNewMapClicked && !this.state.isOpen && !this.state.openMap ) {
            returnFunction = this.renderMainMenu();
        } else if (this.state.complexAttrBox) {
            returnFunction = this.renderComplexAttr();
        } else if ( this.state.isNewMapClicked ) {
            returnFunction = this.renderModal();
        } else if ( this.state.openMap ) {
            returnFunction = this.renderMap();
        } else {
            returnFunction = this.renderMainMenu();
        }
        return returnFunction;
    }
}

export default MapMenu;