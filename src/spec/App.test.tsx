import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from '../components/App';
import MapMenu from '../components/MapMenu';
import Map from '../components/MapComponent';
import Groups from '../components/GroupsComponent';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});

it('open mapMap', () => {
    const div = document.createElement('div');
    ReactDOM.render( <MapMenu />, div);
});

it('create new map', () => {
    const div = document.createElement('div');
    ReactDOM.render( <Map  mapId={1}/>, div);

});

it('groups', () => {
    const div = document.createElement('div');
    ReactDOM.render( <Groups mapId={1}/>, div);

});
