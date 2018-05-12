import React from 'react';
import {Button, Modal} from 'react-bootstrap';
import * as input from "react-bootstrap";
import {Marker, InfoWindow} from "react-google-maps";



export default class AddNewAttributed extends React.Component {


    render(){

        return (

            <InfoWindow >
                <div>
                    <p>Atrybuty domyślne</p>
                    <p>Obrazek</p>
                </div>
            </InfoWindow>
        );
    }
}

{/*<form onSubmit={ this.onSubmit }>*/}
{/*<label> Name:*/}
{/*<input type="text" { ...linked.name.props } />*/}
{/*</label>*/}

{/*<label> Email:*/}
{/*<input type="text" { ...linked.email.props } />*/}
{/*</label>*/}

{/*<label> Is active:*/}
{/*<input type="checkbox" { ...linked.isActive.props } />*/}
{/*</label>*/}

{/*<button type="submit">Add User</button>*/}
{/*</form>*/}

{/*<label>*/}
{/*Cat*/}
{/*<input type="radio" value="cat" name="pet" />*/}
{/*</label>*/}