import React from 'react';
import { Button, ListGroup, ListGroupItem } from 'react-bootstrap';
import { PinData } from '../../../types/api/PinData';
import '../../../styles/map/leftbar/GroupsComponent.css';

export interface FilterListComponentProps {
    visiblePins: PinData[];
}

export interface FilterListComponentState {
    pinIdPrinted: any;
    buttonClicked: boolean;
}

export class FilterListComponent extends React.Component<FilterListComponentProps, FilterListComponentState> {
    constructor(props: FilterListComponentProps) {
        super(props);

        this.state = {
            pinIdPrinted: undefined,
            buttonClicked: false,
        };
    }

    handleClick(id: any) {
        if (!this.state.buttonClicked || this.state.pinIdPrinted !== id) {
            this.setState({pinIdPrinted: id, buttonClicked: true});
        } else {
            this.setState({buttonClicked: false});
        }
    }

    renderNote(pin: PinData) {
        if (this.state.buttonClicked && pin.id === this.state.pinIdPrinted) {
            return pin.data.attributes.map(attribute => (
                <div key={attribute.name}>
                    <b>{attribute.name} </b> {attribute.value}
                </div>
            ));
        }
        return null;
    }

    renderList() {
        return (
            this.props.visiblePins.map((pin, i) => {
                const id = pin.id;
                return (
                    <ListGroup key={id}>
                        <ListGroupItem>
                        <Button onClick={() => this.handleClick(id)}>
                            Pin {id}
                        </Button>
                        {this.renderNote(pin)}
                        </ListGroupItem>
                    </ListGroup>
                );
            })
        );
    }

    render() {
        return (
            <div className="filterList">
                <ul className="pins">
                    {this.renderList()}
                </ul>
            </div>
        );
    }
}