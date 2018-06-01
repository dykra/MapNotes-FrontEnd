import React from 'react';
import { Button } from 'react-bootstrap';
import TransportComponent from './TransportComponent';
import GroupsComponent from './GroupsComponent';

import FilterComponent from './FilterComponent';
import { PinData } from '../types/PinData';
import { Filter } from '../../../types/filter/Filter';

interface LeftBarState {
    visibleLeftBar: boolean;
    mapIdState: any;
}

interface LeftBarComponentProps {
    filter: (filter: Filter) => void;
    removeFilter: () => void;
    onRef: any;
    showRoadBetweenMarkers: any;
    markers: any;
    mapId: any;
    shownMarkers: PinData[];
}

export default class LeftBarComponent extends React.Component<LeftBarComponentProps, LeftBarState> {

    references: {transportComponent: any; } =
        {transportComponent: null};

    constructor(props: LeftBarComponentProps) {
        super(props);
        this.showLeftBar = this.showLeftBar.bind(this);
        this.hideLeftBar = this.hideLeftBar.bind(this);
        this.showRoadBetweenMarkers = this.showRoadBetweenMarkers.bind(this);
        this.state = {
            visibleLeftBar: false,
            mapIdState: this.props.mapId,
        };
    }

    componentDidMount() {
        this.props.onRef(this);
    }

    componentWillUnmount() {
        this.props.onRef(null);
    }

    showLeftBar(event: any) {
        this.setState(
            {
                visibleLeftBar: true,
            });
    }

    hideLeftBar(event: any) {
        this.setState({
            visibleLeftBar: false
        });
    }

    updateTransportComponentWithStartDestionation(index: any) {
        this.references.transportComponent.onChangeDestinationInput(index);
    }

    showRoadBetweenMarkers(result: any) {
        this.props.showRoadBetweenMarkers(result);
    }

    render() {
       let leftBar;
       if (this.state.visibleLeftBar) {
           leftBar = (
               <div className={'OpenedLeftBar'}>
                   <div>
                       <GroupsComponent mapId={this.state.mapIdState}/>
                       <Button
                           className={'CloseLeftBarButton'}
                           onClick={this.hideLeftBar}
                       >hide BAR
                       </Button>
                   </div>
                   <TransportComponent
                       onRef={(ref: any) => (this.references.transportComponent = ref)}
                       showRoadBetweenMarkers={this.showRoadBetweenMarkers}
                       markers={this.props.markers}
                   />
                   <FilterComponent filter={this.props.filter} removeFilter={this.props.removeFilter}/>
               </div>
            );
        } else {
            leftBar = (
                <div className={'ClosedLeftBar'}>
                    <button
                        className={'OpenLeftBarButton'}
                        onClick={this.showLeftBar}
                    > open BAR
                    </button>
                </div>
            );
        }
        return (
            <div>
                {leftBar}
            </div>);
    }
}