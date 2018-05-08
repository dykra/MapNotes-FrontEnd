import * as React from 'react';
import Map from './MapComponent.js';
import MyModal from "./Modal";
import {Button} from "react-bootstrap";


class MapMenu extends React.Component {

    state = {
        inputValue : "",
        inputs : [{name: '', type: ''}],
        isNewMapClicked : false,
        isOpen : false,
        todos: [],
        isSubmit : false,
        openMap : false

    };


    handleChange = (evt, index, field_name) => {
        this.state.inputs[index][field_name] = evt.target.value
        this.forceUpdate()
    };


    handleClick = (index) => {
        console.log("button clicked", index)
        console.log(this.state.todos[index])
    };

    buttonClicked = () => {
        console.log("My button was clicked")
        console.log(this.state)
        this.setState({ isNewMapClicked: true });
    }

    toggleModal = () => {
        this.setState({
            isOpen: !this.state.isOpen,
            isNewMapClicked: !this.state.isNewMapClicked
        });
    };

    handleNewInput = () => {
        console.log('new input!!')
        this.setState({inputs: this.state.inputs.concat({name: '', type: ''})})
    };

    openMapButtonClicked = () => {
        console.log('open map button clicked!!')
        this.setState({openMap : true})
    };

    handleSubmit = (evt) => {
        evt.preventDefault();
        console.log('handle submit');

        const newTodos = this.state.inputs.map(input=> {
            return {
                name: input.name,
                type: input.type
            }
        });


        const t = this.state.todos;
        t.push(newTodos)

        this.setState({
            todos : t, inputs: [{name: '', type: ''}], isSubmit: true
        });


        //console.log('print state after concat', todos)

        //this.setState({
        //    todos: this.state.todos.concat(newTodos), inputs: [{name: '', type: ''}], isSubmited: true
        //});

        console.log('after setting state', this.state)


        let json = JSON.stringify(this.state.todos);
        console.log('checking json',json)


        this.setState({
            todos :[], inputs: [{name: '', type: ''}], isSubmit: true
        });

        this.toggleModal()
    };





    renderMainMenu(){
        console.log('printing my array in main menu!',this.state.todos)
        return (
            <div className="MapMenu">
                <Button className="NewMapButton" bsSize="large" bsStyle="primary" onClick={this.buttonClicked} block>
                    Create new map
                </Button>
                <div>
                    <Button className ="Open map button" bsize ="small" bsStyle="primary" onClick={this.openMapButtonClicked}>
                        Open map
                    </Button>
                </div>

            </div>
        );
    }

    renderModal(){
        return(
            <MyModal
                handleChange={this.handleChange}
                inputValue={this.state.inputValue}
                handleNewInput={this.handleNewInput}
                inputs = {this.state.inputs}
                handleSubmit={this.handleSubmit}
                closeClick={() => this.toggleModal()}

            />
        )
    }

    renderMap(){
        return(
            <div className="App">
                <Map/>
            </div>
        )
    }

    render() {

        if(this.state.isNewMapClicked === false && this.state.isOpen === false && this.state.openMap === false) {
            return(
                this.renderMainMenu()
            )
        }else if(this.state.isNewMapClicked === true){
            return(

                this.renderModal()
            )
        }else if(this.state.openMap === true){
            return(
                this.renderMap()
            )
        }else{
            return(
                this.renderMainMenu()
            )
        }
    }
}

export default MapMenu;