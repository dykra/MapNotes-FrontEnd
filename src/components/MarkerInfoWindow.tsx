import * as React from 'react';
import { Marker, InfoWindow } from 'react-google-maps';
import Note from './Note';
import { Component } from 'react';

export default class MarkerInfoWindow extends Component<any, any> {

    constructor(props: any) {
        super(props);
        const json = require('./data.json');
        this.state = {
            isOpen: false,
            isNewMarker: false,
            isNoteAdded: false,
            inputs : json,
            todos: [],
            isSubmit : false,
            isDetailOpen: false
        };
        this.handleNewInput = this.handleNewInput.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    handleToggleDetailOpen() {
        this.setState({isDetailOpen: true});
    }

    handleClicks(id: any) {
        console.log(id);
        this.handleToggleDetailOpen();
    }

    handleToggleOpen() {
        this.setState({isOpen: true});
    }

    handleMouseOver(id: any) {
        console.log(id);
        if (!this.state.isDetailOpen) {
            this.handleToggleOpen();
        }

    }

    handleAddNote(markerState: any) {
        console.log('handle with set');
        this.setState({isNewMarker: markerState});
    }

    handleNotes() {
        this.setState({isNoteAdded: !this.state.isNoteAdded});
    }

    handleChange(evt: any, index: any, fieldName: any) {

        this.state.inputs[index][fieldName] = evt.target.value;
        this.forceUpdate();
    }

    handleToggleClose() {
        this.setState({isOpen: false});
    }

    handleMouseOut(id: any) {
        console.log(id);
        this.handleToggleClose();
    }

    handleNewInput() {

        this.setState({inputs: this.state.inputs.concat({name: '', type: ''})});
    }

    handleSubmit(evt: any) {
        evt.preventDefault();

        const newTodos = this.state.inputs.map((input: any) => {
            return {
                name: input.name,
                value: input.value
            };
        });

        const t = this.state.todos;
        t.push(newTodos);

        this.setState({
            todos : t, inputs: [{name: '', type: ''}], isSubmit: true
        });

        let json = JSON.stringify(this.state.todos);
        console.log('checking json', json);

        this.setState({
            todos : [], inputs: [{name: '', type: ''}], isSubmit: true
        });
        // this.handleNotes();
        this.handleAddNote(false);
        console.log('stan:' + this.state.isOpen + this.state.isNewMarker + this.state.isNoteAdded);

    }

    renderMap() {
        return(
            <Marker
                key={this.props.index}
                position={{
                lat: this.props.lat,
                lng: this.props.lng
            }}
                label={this.props.index.toString()}
                onClick={() => {
                    if (this.props.isNewMarker && !this.state.isNoteAdded ) {
                        this.handleAddNote(this.props.isNewMarker);
                        this.handleNotes();
                        console.log('isAdded' + this.state.isNoteAdded);
                    } else {
                        this.handleClicks(this.props.index);
                    }

                }}
                onMouseOver={
                        () => this.handleMouseOver(this.props.index)
                    }
                onMouseOut={
                        () => this.handleMouseOut(this.props.index)
                    }

            >

                {
                    this.state.isOpen &&

                    <InfoWindow >
                        <div>
                            <p>Atrybuty domyślne</p>
                            <p>Obrazek</p>
                        </div>
                    </InfoWindow>
                }

                {
                    this.state.isDetailOpen &&
                    <InfoWindow onCloseClick={() => this.setState({isDetailOpen: false})}>
                        <div>
                            <p>Atrybuty domyślne</p>
                            <p>Reszta atrubutów</p>
                            <p>fghjng</p>

                        </div>
                    </InfoWindow>
                }
            </Marker>
        );
    }

    renderModal() {
        console.log('renderModal');
        return (
            <Note
                handleNewInput={this.handleNewInput}
                handleChange={this.handleChange}
                handleSubmit={this.handleSubmit}
                inputValue={this.state.inputValue}
                inputs={this.state.inputs}
                closeClick={() => {
                    console.log('closing');
                    this.handleNotes();
                    this.handleAddNote(false);
                    this.props.closePin();
                }}
            />
    );
    }

    render() {

            if (this.state.isNewMarker === true) {
                console.log('jestem');
                return(

                    this.renderModal()
                );
            } else {
                console.log(this.state.isNoteAdded);

                return(
                    this.renderMap()
                );
            }

    }

}
