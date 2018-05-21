import MapMenu from './MapMenu';
import * as React from 'react';
import '../styles/App.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends React.Component<any, any> {

    render() {
        return (
            <div className="App">
                <MapMenu/>
            </div>
        );
    }
}
export default App;