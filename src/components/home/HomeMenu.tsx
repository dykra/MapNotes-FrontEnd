import * as React from 'react';
import Button from 'react-bootstrap/lib/Button';
import { MapData } from '../../types/api/MapData';
import { getAllMaps } from '../../api/MapApi';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';
import { localStorageInfo } from '../../constants';

export interface HomeMenutProps {
    location: any;
}

export interface HomeMenuState {
    maps: MapData[];
}

export class HomeMenu extends React.Component<HomeMenutProps, HomeMenuState> {

    constructor(props: HomeMenutProps) {
        super(props);
        this.state = {
            maps: [],
        };
    }

    componentWillMount() {
        getAllMaps(maps => this.setState( { maps }));
    }

    ifOpenStartMenu() {
        try {
            let a = this.props.location.state.isStartMenu;
            console.log(a);
        } catch (e) {
            return true;
        }
        return false;
    }

    static canUseLocalStorage() {
        let isNode = typeof module !== 'undefined';
        if( !isNode ) {
            return true;
        }
        return false;
    }

    getLastMapUsed() {
        if (HomeMenu.canUseLocalStorage() && this.ifOpenStartMenu()) {
            let mapId = localStorage.getItem(localStorageInfo);

            if (mapId) {
                let parserMapID = JSON.parse(mapId);
                if (this.isMapInCurrentState(parserMapID)) {
                    return parserMapID;
                }
            }
        }
        return null;
    }

    isMapInCurrentState(mapID: any) {
        return mapID in this.state.maps;
    }

    renderMapsLinks() {
        let lastMapID = this.getLastMapUsed();
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
