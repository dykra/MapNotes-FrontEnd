import LatLng = google.maps.LatLng;

export interface MarkerData {
    position: LatLng;
    isWindowOpened: boolean;
    groupName: string;
    attributes: any;
}