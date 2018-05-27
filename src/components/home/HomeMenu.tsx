import * as React from 'react';
import * as Button from 'react-bootstrap/lib/Button';
import { MenuType } from '../../types/menu/MenuType';

// todo dodać obsługe wybóru mapy z listy

export interface HomeMenuProps {
    changeMenu: (menu: MenuType) => void;
}

export interface HomeMenuState {

}

export class HomeMenu extends React.Component<HomeMenuProps, HomeMenuState> {

    constructor(props: HomeMenuProps) {
        super(props);
    }

    render() {
        return (
            <div className="HomeMenu">
                <Button
                    className="NewMapButton"
                    bsSize="large"
                    bsStyle="primary"
                    onClick={() => this.props.changeMenu(MenuType.creation)}
                >
                    Create new map
                </Button>
                <Button
                    className="OpenMapButton"
                    bsSize="small"
                    bsStyle="primary"
                    onClick={() => this.props.changeMenu(MenuType.map)}
                >
                    Open map
                </Button>
            </div>
        );
    }
}