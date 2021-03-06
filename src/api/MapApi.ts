import axios from 'axios';
import { MapData } from '../types/api/MapData';
import { API_BASE_URL } from '../constants';
import { PinData } from '../types/api/PinData';

const MAP_URL = API_BASE_URL + '/map';

export function getAllMaps(cb: (maps: MapData[]) => void, er?: (error: any) => void) {
    axios.get(MAP_URL)
        .then(function (response: any) {
            cb(response.data);
        })
        .catch(function (error: any) {
            if (er) {
                er(error);
            } else {
                console.log(error);
            }
        });
}

export function getMapById(id: number, cb: (map: MapData) => void, er?: (error: any) => void) {
    axios.get(MAP_URL + '/' + id)
        .then(function (response: any) {
            cb(response.data);
        })
        .catch(function (error: any) {
            if (er) {
                er(error);
            } else {
                console.log(error);
            }
        });
}

export function deleteMapById(id: number, cb: () => void, er?: (error: any) => void) {
    axios.delete(MAP_URL + '/' + id)
        .then(function () {
            cb();
        })
        .catch(function (error: any) {
            if (er) {
                er(error);
            } else {
                console.log(error);
            }
        });
}

export function putMap(map: MapData, cb: (map: MapData) => void, er?: (error: any) => void) {
    axios.put(MAP_URL, map)
        .then(function (response: any) {
            cb(response.data);
        })
        .catch(function (error: any) {
            if (er) {
                er(error);
            } else {
                console.log(error);
            }
        });
}

export function addPin(id: number, pin: PinData, cb: (pin: PinData) => void, er?: (error: any) => void) {
    axios.put(MAP_URL + '/' + id + '/pin', pin)
        .then(function (response: any) {
            cb(response.data);
        })
        .catch(function (error: any) {
            if (er) {
                er(error);
            } else {
                console.log(error);
            }
        });
}
