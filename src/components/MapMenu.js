import * as React from 'react';
import Map from './MapComponent.js';
import List from './List';
import MyModal from "./Modal";
import {Button} from "react-bootstrap";


class MapMenu extends React.Component {

    state = {
        inputValue : "",
        inputs : [{name: '', type: ''}],
        isNewMapClicked : false,
        isOpen : false,
        todos: [
            { name : 'Kolor drzwi', type : 'color'},
            { name : 'size' , type : 'm2'}
        ]
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

    handleSubmit = (evt) => {
        evt.preventDefault();

        const newTodos = this.state.inputs.map(input=> {
            return {
                name: input.name,
                type: input.type
            }
        });


        this.setState({todos: this.state.todos.concat(newTodos), inputs: [{name: '', type: ''}]})

        this.toggleModal()

        let json = JSON.serialize(this.state.todos);
        fetch("urL")

    };


    renderMainMenu(){
        return (
            <div className="MapMenu">
                <Button className="NewMapButton" bsSize="large" bsStyle="primary" onClick={this.buttonClicked} block>
                    Create new map
                </Button>

                <List
                    handleClick ={this.handleClick}
                    todos={this.state.todos}
                />
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
                handleSubmit ={this.handleSubmit}
                closeClick={() => this.toggleModal()}
            />
        )
    }

    render() {

            if(this.state.isNewMapClicked === false && this.state.isOpen === false){
                return(
                    this.renderMainMenu()
                )
            }else if(this.state.isNewMapClicked === true){
                return(
                    this.renderModal()
                )
            }else{
                return(
                    this.renderMainMenu()
                )
            }
    }
}

export default MapMenu;