import React from 'react';
import { Button } from 'react-bootstrap';
import * as ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar';
import { PinData } from '../../../types/api/PinData';
import '../../../styles/map/GroupsStyle.css';

export interface GroupsComponentProps {
    visiblePins: PinData[];
    changePins: (pins: PinData[]) => void;
}

export interface GroupsComponentState {
    visibleColors: boolean;
    visibleNewGroup: boolean;
}

export class GroupsComponent extends React.Component<GroupsComponentProps , GroupsComponentState> {
    constructor(props: GroupsComponentProps ) {
        super(props);

        this.state = {
            visibleColors: false,
            visibleNewGroup: true,
        };

        this.showColors = this.showColors.bind(this);
        this.hideColors = this.hideColors.bind(this);
        this.handleColor = this.handleColor.bind(this);
    }

    componentDidMount() {
        this.setState({visibleNewGroup: true});
    }

    showColors() {
            this.setState({
                visibleColors: true,
                visibleNewGroup: false,
            });

    }

    hideColors() {
        this.setState({
            visibleColors: false,
            visibleNewGroup: true,
        });
    }

    handleColor(color: string) {
        this.props.visiblePins.forEach(pin => pin.data.groupName = color);
        this.props.changePins(this.props.visiblePins);
    }

    renderColorButtons() {
        if (this.state.visibleColors) {
            return (
                <div className="OpenedColors">
                    <Button onClick={this.hideColors}>Hide</Button>
                    <ButtonToolbar>
                        <Button bsClass="pinkButton" onClick={() => this.handleColor('pink')}>Pink</Button>
                        <Button bsClass="greenButton" onClick={() => this.handleColor('green')}>Green</Button>
                        <Button bsClass="yellowButton" onClick={() => this.handleColor('yellow')}>Yellow</Button>
                        <Button bsClass="blueButton" onClick={() => this.handleColor('blue')}>Blue</Button>
                    </ButtonToolbar>
                </div>
            );
        }
        return null;
    }

    render() {
        if (this.state.visibleNewGroup) {
            return (
                <div className="groups">
                    <Button onClick={this.showColors}>New group</Button>
                </div>
            );
        }
        return(
            <div>
                {this.renderColorButtons()}
            </div>
        );

    }
}
