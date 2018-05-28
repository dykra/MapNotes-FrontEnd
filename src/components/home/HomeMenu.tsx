import * as React from 'react';
import * as Button from 'react-bootstrap/lib/Button';
import { MenuType } from '../../types/menu/MenuType';
import { MapData } from '../../types/api/MapData';
import { getAllMaps } from '../../api/MapApi';
import { Redirect, Route } from 'react-router-dom';

// todo dodać obsługe wybóru mapy z listy

export interface HomeMenuProps {
    changeMenu: (menu: MenuType) => void;
}

export interface HomeMenuState {
    mapsList: MapData[];

}

export class HomeMenu extends React.Component<HomeMenuProps, HomeMenuState> {

    constructor(props: HomeMenuProps) {
        super(props);
        this.state = {
            mapsList: []

        };
        this.handleOpenMap = this.handleOpenMap.bind(this);
    }

    handleOpenMap() {
        return <Redirect from="/" to="/create"/>;
    }

    render() {
        return (
            <div className="HomeMenu">
                <Route
                    render={({history}) => {
                    return (
                        <Button
                            className="NewMapButton"
                            bsSize="large"
                            bsStyle="primary"

                            onClick={() => history.push('/create')}
                        >
                            Create new map
                        </Button>
                    );
                }}
                />
            <h2>Maps</h2>
            {getAllMaps(function (maps: MapData[]) {
                console.log(maps);
                maps.map(function (id: any) {
                    console.log(id);
                    return (
                        <Button key={id}>
                            {id.toString()}
                        </Button>);
                });
            })

            }
        </div>
        );
    }
}