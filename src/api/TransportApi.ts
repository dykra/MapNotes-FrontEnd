import axios from 'axios';
import { GOOGLE_KEY_TRANSPORT, GOOGLE_TRANSPORT_URL } from '../constants';
import { TransportData } from '../types/TransportData';

export function getTransportData(transportData: TransportData, cb: (event: any) => void) {
    axios({
        method: 'GET',
        url: GOOGLE_TRANSPORT_URL + 'origin=' + transportData.origin + '&destination=' +
        transportData.destination + '&key=' + GOOGLE_KEY_TRANSPORT,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
        }
    })
        .then(function (response: any) {
            cb(response.data);
        })
        .catch(function (error: any) {
            console.log(error);
        });
}