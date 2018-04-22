import React, {Component} from 'react';
import {Marker, InfoWindow} from "react-google-maps";

export default class InfoWindowMap extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isOpen: false
        }

    }

    handleToggleOpen = () => {

        this.setState({isOpen: true});
    };

    handleClicks = (id) => {
        console.log(id);
        this.handleToggleOpen();
    };


    render() {

        return (

            <Marker key={this.props.index} position={{
                lat: this.props.lat,
                lng: this.props.lng
            }} label={this.props.index.toString()}
                    onClick={() => this.handleClicks(this.props.index)}
            >

                {
                    this.state.isOpen &&
                    <InfoWindow onCloseClick={() => this.setState({isOpen: false})}>
                        <div>
                            <span>Example Text</span>
                        </div>
                    </InfoWindow>
                }
            </Marker>
        )
    }
}
