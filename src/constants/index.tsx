// tslint:disable:max-line-length
export const GOOGLE_MAP_KEY = process.env.REACT_APP_GOOGLE_MAP_KEY;
export const GOOGLE_MAP_URL = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAP_KEY}&v=3.exp&libraries=geometry,drawing,places`;
export const API_BASE_URL = 'https://map-notes-backend.herokuapp.com';
export const BASE_ICON_URL = 'https://maps.google.com/mapfiles/ms/icons/';
export const TYPES = [ 'm^2', 'pln', 'yes/no', 'text', 'number', 'other' ];
export const localStorageInfo = 'mapID';
