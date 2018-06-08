// import { PinAttr } from '../creation/PinAttr';
// import { empty } from '@typed/hashmap/lib.es2015/HashMap/empty';

export interface MarkerData {
    position:  google.maps.LatLngLiteral;
    isWindowOpened: boolean;
    groupName: string;
    attributes: {};
}
