import React from 'react';
import { Button } from 'react-bootstrap';
import * as ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar';
import { PinData } from '../../../types/api/PinData';
import '../../../styles/map/leftbar/GroupsComponent.css';

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
                <div className="ChooseGroup">
                    <div className="ColorButtons">
                        <ButtonToolbar>
                            <Button bsClass="pinkButton" onClick={() => this.handleColor('pink')}>Pink</Button>
                            <Button bsClass="greenButton" onClick={() => this.handleColor('green')}>Green</Button>
                            <Button bsClass="yellowButton" onClick={() => this.handleColor('yellow')}>Yellow</Button>
                            <Button bsClass="blueButton" onClick={() => this.handleColor('blue')}>Blue</Button>
                        </ButtonToolbar>
                    </div>
                    <div className="HideContent">
                        <Button bsClass="hideButton" onClick={this.hideColors}>Hide</Button>
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