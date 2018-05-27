import * as React from 'react';
import { Marker, InfoWindow } from 'react-google-maps';
import Note from './Note';
import { Component } from 'react';

// todo Generalnie tutaj trzeba dodać obsługe wyświetalania atrybutów jak i ich edycji
// Sam komponent powinien używać klasy PinData i na podstawie jej się generować.
// W przypadku edycji powinien nie zapisywać zmiany w swoim stanie
// Tylko gotowego PinData przesyłać wyżej aby tam było to dodane do mapy(ewentualnie wysłane
// na serwer) i wtedy tamten komponent prze renderuje ten na nowo z nowymi propsami.

interface MarkerInfoWindowState {
    isOpen: boolean;
    isNewMarker: boolean;
    isNoteAdded: boolean;
    inputs: any;
    todos: String[];
    isSubmit: boolean;
    isDetailOpen: boolean;
    newAttributes: any;

}
export default class MarkerInfoWindow extends Component<any, MarkerInfoWindowState> {

    constructor(props: any) {
        super(props);
        const json = require('../../../constants/data.json');
        this.state = {
            isOpen: false,
            isNewMarker: false,
            isNoteAdded: false,
            inputs : json,
            todos: [],
            isSubmit : false,
            isDetailOpen: false,
            newAttributes: []
        };
        this.handleNewInput = this.handleNewInput.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleAddingAttribute = this.handleAddingAttribute.bind(this);
        this.deleteAttribute = this.deleteAttribute.bind(this);

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

    deleteAttribute(input: any, index: any) {

        while (this.state.newAttributes.indexOf(input) !== -1) {
            this.state.newAttributes.splice(this.state.newAttributes.indexOf(input), 1);
        }
        this.forceUpdate();

    }

    handleRightClick(id: any) {
        // console.log('show route for ' + id);
        // console.log(this.props.lat);
        // console.log(this.props.lng);

        this.props.showTransportComponent(this.props.lat, this.props.lng, this.props.index);

    }

    handleAddNote(markerState: any) {
        this.setState({isNewMarker: markerState});
    }

    handleNotes() {
        this.setState({isNoteAdded: !this.state.isNoteAdded});
    }

    handleChange(evt: any, index: any, fieldName: any) {

        this.state.inputs[index][fieldName] = evt.target.value;
        this.forceUpdate();
    }

    handleChangeName(evt: any, index: any, fieldName: any) {
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
        this.handleAddNote(false);
    }

    handleNewMarker() {
        if (this.props.isNewMarker && !this.state.isNoteAdded ) {
            this.handleAddNote(this.props.isNewMarker);
            this.handleNotes();
        } else {
            this.handleClicks(this.props.index);
        }
    }

    handleAddingAttribute(n: String, t: String, isDefault: boolean) {
        if (isDefault) {
            if (this.state.inputs.length !== 0) {
                this.setState({inputs: this.state.inputs.concat({name: n, type: t})});
            } else {
                this.setState({inputs: this.state.inputs.push({name: n, type: t})});
            }

        } else {
            if (this.state.inputs.length !== 0) {
                this.setState({newAttributes: this.state.newAttributes.concat({name: n, type: t})});
            } else {
                this.setState({newAttributes: this.state.newAttributes.push({name: n, type: t})});
            }
        }

    }

    renderMap() {
        var baseURL = 'http://maps.google.com/mapfiles/ms/icons/';
        var newUrl = baseURL + this.props.groupName + '.png';
        return(
            <Marker
                key={this.props.index}
                position={{
                lat: this.props.lat,
                lng: this.props.lng
            }}
                icon={newUrl}
                label={this.props.index.toString()}
                onClick={
                    () => this.handleNewMarker()
                }

                onMouseOver={
                        () => this.handleMouseOver(this.props.index)
                    }
                onMouseOut={
                        () => this.handleMouseOut(this.props.index)
                    }
                onRightClick={() => this.handleRightClick(this.props.index)}
            >
                {
                    this.handleSmallNote()
                }
                {
                    this.handleExtendNote()
                }

            </Marker>
        );
    }

    renderModal() {
        return (
            <Note
                handleNewInput={this.handleNewInput}
                handleChange={this.handleChange}
                handleSubmit={this.handleSubmit}
                handleChangeName={this.handleChangeName}
                inputs={this.state.inputs}
                newAttrs={this.state.newAttributes}
                deleteAttribute={this.deleteAttribute}
                saveAttribute={this.handleAddingAttribute}
                closeClick={() => {
                    this.handleNotes();
                    this.handleAddNote(false);
                    this.props.closePin();
                }}
            />
    );
    }

    render() {
        let returnFun;
        if (this.state.isNewMarker) {
            returnFun = this.renderModal();

        } else {

            returnFun = this.renderMap();

        }
        return returnFun;

    }

    handleSmallNote() {
           return(
               this.state.isOpen &&
               (
                   <InfoWindow >
                   <div>
                       <p>Atrybuty domyślne</p>
                       <p>Obrazek</p>
                   </div>
               </InfoWindow>
               )
    ) ;
    }

    handleExtendNote() {
        return(
            this.state.isDetailOpen && (
                <InfoWindow onCloseClick={() => this.setState({isDetailOpen: false})}>
                <div>
                    <p>Atrybuty domyślne</p>
                    <p>Reszta atrubutów</p>

                </div>
            </InfoWindow>)
        );
    }
}
