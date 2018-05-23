import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from '../components/App';
import MapMenu from "../components/MapMenu";

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});

it('create map', () => {
    const div = document.createElement('div');
    ReactDOM.render( <MapMenu />, div);
});