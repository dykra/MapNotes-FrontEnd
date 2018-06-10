import React from 'react';
import { Button } from 'react-bootstrap';
import { PinData } from '../../../types/api/PinData';
import '../../../styles/map/GroupsStyle.css';
import { getPinById } from '../../../api/PinApi';
import { AttributeInfo } from '../../../types/creation/AttributeInfo';

export interface FilterListComponentProps {
    visiblePins: PinData[];
}

export interface FilterListComponentState {
    pinIdPrinted: any;
    buttonClicked: boolean;
    attributes: AttributeInfo[];
}

export class FilterListComponent extends React.Component<FilterListComponentProps, FilterListComponentState> {
    constructor(props: FilterListComponentProps) {
        super(props);

        this.state = {
            pinIdPrinted: 0,
            buttonClicked: false,
            attributes: [],
        };
        this.getPinCallback = this.getPinCallback.bind(this);
    }

    handleClick(id: any) {
        if (!this.state.buttonClicked) {
            this.setState({pinIdPrinted: id});
            this.setState({buttonClicked: true});
        } else {
            this.setState({buttonClicked: false});
            // this.setState({pinIdPrinted: -1});
        }
    }

    getPinCallback(pin: PinData) {
        this.setState({attributes: pin.data.attributes});
    }

    renderNote(id: any) {
        if (this.state.buttonClicked && id === this.state.pinIdPrinted) {
            getPinById(this.state.pinIdPrinted, this.getPinCallback);
            console.log(this.state.attributes);
            return this.state.attributes.map(attribute => (
                <div key={attribute.name}>
                    <b>{attribute.name} </b> {attribute.value}
                </div>
            ));
        }
        return null;
    }

    renderList() {
        return (
            <ul className="pins">
                {this.props.visiblePins.map((pin) => {
                        const id = pin.id;
                        return (
                            <li key={id}>
                                <Button onClick={() => this.handleClick(id)}>
                                    Pin {id}
                                </Button>
                                {this.renderNote(id)}
                            </li>
                        );
                    }
                )}
            </ul>
        );
    }

    render() {
        return (
            <div className="filterList">
                {this.renderList()}
            </div>
        );
    }
}