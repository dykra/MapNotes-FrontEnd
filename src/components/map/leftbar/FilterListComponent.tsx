import React from 'react';
import { Button } from 'react-bootstrap';
import { PinData } from '../../../types/api/PinData';
import '../../../styles/map/GroupsStyle.css';
import { getPinById } from '../../../api/PinApi';
import { AttributeInfo } from '../../../types/creation/AttributeInfo';

export interface FilterListComponentProps {
    visiblePins: PinData[];
    changePins: (pins: PinData[]) => void;
    animatedId: number;
    showAnimation: (id: any) => void;
}

export interface FilterListComponentState {
    pinIdPrinted: any;
    buttonClicked: boolean;
    attributes: AttributeInfo [];
}

export class FilterListComponent extends React.Component<FilterListComponentProps, FilterListComponentState> {
    constructor(props: FilterListComponentProps) {
        super(props);

        this.state = {
            pinIdPrinted: 0, // TODO - co tu wpisac??
            buttonClicked: false,
            attributes: [],
        };
        this.getPinCallback = this.getPinCallback.bind(this);
    }

    handleClick(id: any) {
        if (!this.state.buttonClicked) {
            this.setState({buttonClicked: true});
            this.setState({pinIdPrinted: id});
        } else {
            this.setState({buttonClicked: false});
            this.setState({pinIdPrinted: -1});
            this.props.showAnimation(-1);
        }
    }

    getPinCallback(pin: PinData) {
        this.setState({attributes: pin.data.attributes});
        this.props.showAnimation(pin.id);
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
                {this.props.visiblePins.map((pins, i) => {
                        const id = pins.id;
                        return (
                            <li key={id}>
                                <Button onClick={() => this.handleClick(id)}>
                                    Pin {i}
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
            </div>);
    }
}