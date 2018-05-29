import * as React from 'react';
import '../../styles/App.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { RouteComponentProps } from 'react-router';
import { MapData } from '../../types/api/MapData';
import { getMapById } from '../../api/MapApi';
import { LeftBarComponent } from './leftbar/LeftBarComponent';
import { MapContainer } from './MapComponent';
import { PinData } from '../../types/api/PinData';
import { Filter } from '../../types/filter/Filter';

// todo przenieść cześc logiki z MapComponentu

export interface MapMenuProps {
    id: number;
}

export interface MapMenuState {
    map?: MapData;
    filterPin?: PinData[];
    directions: any;
}

export class MapMenu extends React.Component<RouteComponentProps<MapMenuProps>, MapMenuState> {

    constructor(props: RouteComponentProps<MapMenuProps>) {
        super(props);

        this.state = {
            directions : null
        };

        this.filter = this.filter.bind(this);
        this.changePins = this.changePins.bind(this);
        this.showRoadBetweenMarkers = this.showRoadBetweenMarkers.bind(this);
        this.removeFilter = this.removeFilter.bind(this);
    }

    componentWillMount() {
        getMapById(this.props.match.params.id, map => this.setState({ map }));
    }

    filter(filter: Filter) {
        console.log(filter);
        if (this.state.map) {
            this.setState({
                filterPin: this.state.map.pins.filter((marker) => filter.doFilter(marker))
            });
        }
    }

    changePins(pins: PinData[]) {
        // todo
    }

    addPin() {
        // todo
    }

    showRoadBetweenMarkers(result: any) {
        this.setState({
            directions: result,
        });
    }

    removeFilter() {
        this.setState({filterPin: undefined});
    }

    render() {

        if (this.state.map) {
            const visiblePins = this.state.filterPin || this.state.map.pins;
            return (
                <div style={{height: '100%'}} >
                    <LeftBarComponent
                        filter={this.filter}
                        removeFilter={this.removeFilter}
                        showRoadBetweenMarkers={this.showRoadBetweenMarkers}
                        visiblePins={visiblePins}
                        changePins={this.changePins}
                    />
                    <MapContainer
                        map={this.state.map}
                        visiblePins={visiblePins}
                        addPin={this.addPin}
                        changePins={this.changePins}
                        directions={this.state.directions}
                    />
                </div>
            );
        }
        return null;
    }
}
