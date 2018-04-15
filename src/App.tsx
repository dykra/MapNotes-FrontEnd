import * as React from 'react';
import './styles/App.css';
import Map from './components/Map';

class App extends React.Component {

    render() {
        return (
            <div className="App">
                <Map/>
            </div>
        );
    }
}

export default App;
