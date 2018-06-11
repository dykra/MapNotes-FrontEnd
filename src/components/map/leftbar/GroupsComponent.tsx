import React from 'react';
import { Button } from 'react-bootstrap';
import { PinData } from '../../../types/api/PinData';
import '../../../styles/map/leftbar/GroupsComponent.css';
import { addStyle } from 'react-bootstrap/lib/utils/bootstrapUtils';

export interface GroupsComponentProps {
    visiblePins: PinData[];
    changePins: (pins: PinData[]) => void;
}

export interface GroupsComponentState {
    visibleColors: boolean;
}

export class GroupsComponent extends React.Component<GroupsComponentProps , GroupsComponentState> {

    constructor(props: GroupsComponentProps ) {
        super(props);

        this.state = {
            visibleColors: false,
        };

        this.showColors = this.showColors.bind(this);
        this.hideColors = this.hideColors.bind(this);
        this.handleColor = this.handleColor.bind(this);

        addStyle(Button, 'pink');
        addStyle(Button, 'green');
        addStyle(Button, 'yellow');
        addStyle(Button, 'blue');
    }

    showColors() {
        this.setState({
            visibleColors: true,
        });
    }

    hideColors() {
        this.setState({
            visibleColors: false,
        });
    }

    handleColor(color: string) {
        this.props.visiblePins.forEach(pin => {
            pin.data.groupName = color;
            }
        );
        this.props.changePins(this.props.visiblePins);
    }

    renderButtons() {
        if (this.state.visibleColors) {
                return (
                    <div>
                        <div className="ColorButtons">
                                <Button bsStyle="pink" onClick={() => this.handleColor('pink')}>Pink</Button>
                                <Button bsStyle="green" onClick={() => this.handleColor('green')}>Green</Button>
                                <Button bsStyle="yellow" onClick={() => this.handleColor('yellow')}>Yellow</Button>
                                <Button bsStyle="blue" onClick={() => this.handleColor('blue')}>Blue</Button>
                        </div>
                        <div className="Hide">
                            <Button onClick={this.hideColors}>Hide</Button>
                        </div>
                    </div>
                );
        }
        return (
            <Button onClick={this.showColors}>New group</Button>
        );
    }

    render() {
        return (
            <div className="GroupsContent">
                {this.renderButtons()}
            </div>);
    }
}