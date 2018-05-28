import * as React from 'react';
import '../styles/App.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { CreationMenu } from './creation/CreationMenu';
import { MapMenu } from './map/MapMenu';
import { HomeMenu } from './home/HomeMenu';
import MapComponent from './map/MapComponent';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

class App extends React.Component<any, any> {
    render() {
        return (
            <Router>

                <div className="container">
                    <Switch>
                    <Route exact={true} path="/" component={HomeMenu} />
                    <Route path="/menu/" component={MapMenu} />
                    <Route path="/create" component={CreationMenu}/>
                    <Route path="/map/:id" component={MapComponent}/>
                </Switch>

                </div>
            </Router>
        );
    }

}
export default App;
