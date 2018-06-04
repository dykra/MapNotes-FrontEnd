import { PinAttr } from '../creation/PinAttr';

export interface MarkerData {
    position:  google.maps.LatLngLiteral;
    isWindowOpened: boolean;
    groupName: string;
    attributes: PinAttr[];
}
