import * as React from 'react';
import '../../styles/App.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import 'bootstrap/dist/css/bootstrap.min.css';

// todo przenieść cześc logiki z MapComponentu

export interface MapMenuProps {

}

export interface MapMenuState {

}

export class MapMenu extends React.Component<MapMenuProps, MapMenuState> {

    constructor(props: MapMenuProps) {
        super(props);
    }

    render() {
        return (
            <div>MapMenu</div>
        );
    }
}
