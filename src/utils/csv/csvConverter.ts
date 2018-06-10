import { MapData } from '../../types/api/MapData';
import { PinData } from '../../types/api/PinData';

function getPinsKeys(pins: PinData[]) {
    const keys = new Set();
    pins.forEach(pin => {
        pin.data.attributes.forEach(attribute => {
            keys.add(attribute.name);
        });
    });
    return Array.from(keys);
}

function generateCSVHeader(keys: string[]) {
    return `id,${keys.join(',')}\r\n` ;
}

function generateCSVPinRow(pin: PinData, keys: string[]) {
    const attributes = pin.data.attributes;
    let result = '';
    result += pin.id || '';
    result += ',';
    result += keys.map(key => {
        const index = attributes.findIndex(attr => attr.name === key);
        if (index !== -1) {
            return attributes[index].value;
        }
        return '';
    }).join(',');
    result += '\r\n';
    return result;
}

function mapToCsv(pins: PinData[]) {
    let result = '';
    const keys = getPinsKeys(pins);
    result += generateCSVHeader(keys);
    pins.forEach(pin => {
        result += generateCSVPinRow(pin, keys);
    });
    return result;
}

function dowlnoadFile(data: string, filename: string) {
    const encodedData = encodeURI(data);
    const link = document.createElement('a');
    link.setAttribute('href', 'data:text/csv;charset=utf-8,' + encodedData);
    link.setAttribute('download', filename);
    link.click();
}

export function exportToCSV (map: MapData) {
    const data = mapToCsv(map.pins);
    const filename = 'export.csv';
    dowlnoadFile(data, filename);
}