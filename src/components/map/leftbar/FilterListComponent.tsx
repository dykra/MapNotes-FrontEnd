import React from 'react';
import { Button } from 'react-bootstrap';
import { PinData } from '../../../types/api/PinData';
import '../../../styles/map/GroupsStyle.css';
import { getPinById } from '../../../api/PinApi';
import { PinAttr } from '../../../types/creation/PinAttr';

export interface FilterListComponentProps {
    visiblePins: PinData[];
    changePins: (pins: PinData[]) => void;
}

export interface FilterListComponentState {
    pinIdPrinted: any;
    buttonClicked: boolean;
    attributes: PinAttr[];
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
        }
    }

    getPinCallback(pin: PinData) {
        this.setState({attributes: pin.data.attributes});
    }

    renderNote(id: any) {
        if (this.state.buttonClicked && id === this.state.pinIdPrinted) {
            getPinById(this.state.pinIdPrinted, this.getPinCallback);
            return this.state.attributes.map(e =>
                (
                    <div key={e.name}>
                        <b>
                            {e.name}
                        </b> {e.value}
                    </div>
                )
            );
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