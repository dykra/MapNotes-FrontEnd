import * as React from 'react';
import Map from './MapComponent';
import MyModal from './Modal';
import { Button } from 'react-bootstrap';

class MapMenu extends React.Component <any, any> {

    constructor(props: any) {
        super(props);
        this.state = {
            inputValue : '',
            inputs : [{name: '', type: ''}],
            isNewMapClicked : false,
            isOpen : false,
            todos: [],
            isSubmit : false,
            openMap : false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.buttonClicked = this.buttonClicked.bind(this);
        this.openMapButtonClicked = this.openMapButtonClicked.bind(this);
        this.handleNewInput = this.handleNewInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

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
        let t: any;
        t = this.state.todos;
        t.push(newTodos);

        this.setState({
            todos : t, inputs: [{name: '', type: ''}], isSubmit: true
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

        if ( !this.state.isNewMapClicked && !this.state.isOpen && !this.state.openMap ) {
            return(
                this.renderMainMenu()
            );
        } else if ( this.state.isNewMapClicked ) {
            return(

                this.renderModal()
            );
        } else if ( this.state.openMap ) {
            return(
                this.renderMap()
            );
        } else {
            return(
                this.renderMainMenu()
            );
        }
    }
}

export default MapMenu;