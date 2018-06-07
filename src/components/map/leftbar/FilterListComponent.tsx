import React from 'react';
import { Button } from 'react-bootstrap';
import { PinData } from '../../../types/api/PinData';
import '../../../styles/map/GroupsStyle.css';

export interface FilterListComponentProps {
    visiblePins: PinData[];
    changePins: (pins: PinData[]) => void;
}

export interface FilterListComponentState {
    pins: String[];
}

export class FilterListComponent extends React.Component<FilterListComponentProps , FilterListComponentState> {
    constructor(props: FilterListComponentProps ) {
        super(props);

        this.state = {
            pins: ['pin1', 'pin2', 'pin3'],
        };

    }

    handleClick(id: Number) {
        console.log('button was clicked' + id);

    }

    renderList() {
        return(
            <ul>
                {this.state.pins.map((pins, i) => {
                        const id = i;
                        return (
                            <li key={id}>
                                <Button onClick={() => this.handleClick(i)}>
                                    Pin {id}
                                </Button>
                            </li>);
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