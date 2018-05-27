import * as React from 'react';
import '../styles/App.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { MenuType } from '../types/menu/MenuType';
import { CreationMenu } from './creation/CreationMenu';
import { MapMenu } from './map/MapMenu';
import { HomeMenu } from './home/HomeMenu';

interface AppState {
    menu: MenuType;
}

class App extends React.Component<{}, AppState> {

    constructor(props: {}) {
        super(props);
        this.changeMenu = this.changeMenu.bind(this);
        this.state = {
            menu: MenuType.home,
        };
    }

    changeMenu(menu: MenuType) {
        this.setState({
            menu
        });
    }

    renderMenu() {
        switch (this.state.menu) {
            case MenuType.creation:
                return <CreationMenu/>;
            case MenuType.map:
                return <MapMenu/>;
            case MenuType.home:
            default:
                return <HomeMenu changeMenu={this.changeMenu}/>;
        }
    }

    render() {
        return (
            <div className="App">
                {this.renderMenu()}
            </div>
        );
    }
}
export default App;
