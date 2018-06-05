import * as React from 'react';
import Button from 'react-bootstrap/lib/Button';
import { MapData } from '../../types/api/MapData';
import { getAllMaps } from '../../api/MapApi';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';
import { localStorageInfo } from '../../constants';

export interface HomeMenuState {
    maps: MapData[];
}

export class HomeMenu extends React.Component<{}, HomeMenuState> {

    constructor(props: {}) {
        super(props);
        this.state = {
            maps: []
        };
    }

    componentWillMount() {
        getAllMaps(maps => this.setState( { maps }));
    }

    getLastMapUsed() {
        let mapId = localStorage.getItem(localStorageInfo);
        console.log(mapId);
        if (mapId) {
            if (this.isMapInCurrentState(mapId)) {
                return mapId;
            }
        }
        return null;
    }

    isMapInCurrentState(mapID: any) {
        return mapID in this.state.maps;
    }

    renderMapsLinks() {
        //TODO null is returned
        let lastMapID = this.getLastMapUsed();
        console.log(lastMapID);
        if (lastMapID) {
            return(
                <Redirect to={'/map/' + lastMapID}/>
            );
        } else {
            return(
                <ul>
                    {this.state.maps.map(map => {
                        const id = map.id;
                        const link = `/map/${map.id}`;
                        return (
                            <li key={id}>
                                <Link to={link}>
                                    {id}
                                </Link>
                            </li>);
                        }
                    )}
                </ul>
            );
        }
    }

    render() {
        return (
            <div className="HomeMenu">
                <Link to="/create">
                    <Button
                        className="NewMapButton"
                        bsSize="large"
                        bsStyle="primary"
                    >
                        Create new map
                    </Button>
                </Link>
                <h2>Maps</h2>
                {this.renderMapsLinks()}
            </div>
        );
    }
}
